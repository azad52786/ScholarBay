# Progress Tracking & Certificate System - Implementation Guide

## Summary of Changes

This document outlines all modifications made to implement the student progress tracking and certificate management system.

---

## Backend Changes

### 1. New Models Created

#### 1.1 LessonCompletion Model
**File:** `server/models/LessonCompletion.js`

Tracks user-specific lesson completion with timestamps.

**Schema:**
- `studentId` (ObjectId, ref: User) - Student who completed the lesson
- `courseId` (ObjectId, ref: Course) - Course the lesson belongs to
- `subSectionId` (ObjectId, ref: SubSection) - The lesson/subsection
- `completed` (Boolean) - Whether lesson is marked complete
- `completedAt` (Date) - When the lesson was completed

**Indexes:**
- Compound index on `studentId` + `courseId` for fast lookups
- Unique compound index on `studentId` + `subSectionId` + `courseId`

---

### 2. Model Updates

#### 2.1 Course Model (`server/models/Course.js`)
**Added Fields:**
- `certificatePublished` (Boolean, default: false) - Whether teacher has published certificate
- `publishedAt` (Date, default: null) - When certificate was published

#### 2.2 Certificate Model (`server/models/Certificate.js`)
**Field Renames:**
- `uniqueCertificateId` → `certificateId`
- `issuedAt` → `generatedAt`

**Added Field:**
- `pdfUrl` (String, optional) - URL to stored PDF certificate

**New Indexes:**
- Unique compound index on `studentId` + `courseId`
- Index on `certificateId` for quick lookups

---

### 3. New Controllers

#### 3.1 Progress Controller
**File:** `server/controllers/Progress.controller.js`

**Functions:**
- `markLessonComplete(req, res)` - Mark a lesson as completed
- `markLessonIncomplete(req, res)` - Unmark a completed lesson
- `getStudentCourseProgress(req, res)` - Get student's progress percentage
- `getCompletedLessons(req, res)` - Get list of completed lessons
- `calculateCourseProgress(userId, courseId)` - Calculate progress (helper)

**Key Logic:**
```
Progress = (Completed Lessons / Total Lessons) × 100
```
- Progress is calculated from actual LessonCompletion records
- No random values used
- Supports fractional progress

---

#### 3.2 Updated Certificate Controller
**File:** `server/controllers/Certificate.controller.js`

**New Functions:**
- `checkEligibility(req, res)` - Check if student can download certificate
- `generateCertificate(req, res)` - Create certificate record
- `downloadCertificate(req, res)` - Generate and download PDF
- `emailCertificate(req, res)` - Email PDF to student
- `getStudentCertificate(req, res)` - Get certificate info
- `checkEligibilityPrivate(userId, courseId)` - Private helper
- `generateCertificatePrivate(userId, courseId)` - Private helper

**Eligibility Logic:**
```
Eligible = (Progress === 100%) AND (CertificatePublished === true)
```

---

#### 3.3 Updated Course Controller
**File:** `server/controllers/Course.controller.js`

**New Functions:**
- `publishCertificate(req, res)` - Teacher publishes certificate
- `unpublishCertificate(req, res)` - Teacher unpublishes certificate
- `getCertificatePublishStatus(req, res)` - Check publish status

---

### 4. Updated Subsection Controller
**File:** `server/controllers/Subsection.controller.js`

**Changes to `markedSubSection()` function:**
- Removed auto-certificate generation logic
- Uses new LessonCompletion model for tracking
- Maintains backward compatibility with CourseProgress model
- No more random progress values
- Proper error handling with correct status codes

---

### 5. Utility Services

#### 5.1 Certificate PDF Generator
**File:** `server/utils/certificateGenerator.js`

**Functions:**
- `generateCertificatePDF(certificateData, logoPath)` - Generate PDF buffer
- `generateAndSaveCertificatePDF(certificateData, outputPath, logoPath)` - Save to file

**Features:**
- Professional certificate design with borders
- Embedded company logo (if available)
- Dynamic text insertion (student name, course, instructor)
- Beautiful typography and colors
- Suitable for printing

---

#### 5.2 Updated Mail Sender
**File:** `server/utils/mailSend.js`

**Changes:**
- Added support for file attachments
- New parameters: `attachmentBuffer`, `attachmentName`
- Automatically sets `contentType` to PDF
- Backward compatible with existing calls

**Updated Signature:**
```javascript
mailSender(email, title, body, attachmentBuffer, attachmentName)
```

---

### 6. New Routers

#### 6.1 Progress Router
**File:** `server/router/Progress.router.js`

**Routes:**
- `POST /mark-complete` - Mark lesson as complete
- `POST /mark-incomplete` - Mark lesson as incomplete
- `GET /get-progress` - Get course progress
- `GET /get-completed-lessons` - Get completed lessons list

**Auth:** All routes require student authentication

---

#### 6.2 Updated Certificate Router
**File:** `server/router/Certificate.router.js`

**Updated Routes:**
- `GET /check-eligibility` - Check eligibility
- `GET /get-certificate` - Get certificate
- `POST /generate` - Generate certificate
- `GET /download` - Download PDF
- `POST /send-email` - Email certificate

**Auth:** All routes require student authentication

---

### 7. Updated Course Router
**File:** `server/router/Course.router.js`

**New Routes:**
- `POST /publishCertificate` - Publish certificate (teacher)
- `POST /unpublishCertificate` - Unpublish certificate (teacher)
- `GET /getCertificateStatus` - Get publish status (public)
- `GET /progress/*` - Forwards to progress router
- `GET /certificates/*` - Forwards to certificate router

---

### 8. Package Dependencies

**File:** `server/package.json`

**Added:**
```json
"pdfkit": "^0.13.0"
```

---

## How It Works

### Student Progress Tracking Flow

1. **Student enrolls in course**
   - `studentsEnrolled` array updated in Course model

2. **Student views lesson**
   - Lesson content displayed from SubSection

3. **Student completes lesson**
   - POST to `/mark-complete` with `courseId` and `subSectionId`
   - LessonCompletion record created with `completed: true` and `completedAt` timestamp
   - SubSection `watched` flag updated
   - Progress automatically calculated

4. **Frontend displays progress**
   - GET `/get-progress` returns:
     - Total lessons
     - Completed lessons
     - Progress percentage
     - Is complete (100%?)
   - Progress bar updates in real-time

5. **Student logs out**
   - Completion data persists in database
   - Progress visible when student logs back in

---

### Certificate Generation Flow

1. **Teacher uploads course**
   - Course created with `certificatePublished: false`

2. **Teacher completes course uploads**
   - Teacher clicks "Publish Certificate"
   - POST to `/publishCertificate` with `courseId`
   - `certificatePublished` set to `true`
   - `publishedAt` timestamp recorded

3. **Student reaches 100% progress**
   - Completes all lessons in course
   - Progress calculation shows 100%

4. **Student downloads certificate**
   - GET `/certificates/check-eligibility` checks:
     - Is progress === 100%?
     - Is `certificatePublished === true`?
   - If eligible:
     - GET `/certificates/download` generates PDF
     - PDFKit creates professional certificate
     - Browser downloads PDF file
   - If not eligible:
     - Shows appropriate error message

5. **Student emails certificate**
   - POST `/certificates/send-email` with `courseId`
   - Certificate generated if needed
   - PDF buffer created
   - Email sent with PDF attachment via Nodemailer

---

## Data Flow Diagram

```
Student enrolls in course
         ↓
    Views lessons
         ↓
    Marks lesson complete
         ↓
    LessonCompletion record created
         ↓
    Progress calculated (Completed/Total × 100)
         ↓
    Progress reaches 100%?
         ↓
    YES: Teacher must publish certificate
         ↓
    Course.certificatePublished = true
         ↓
    Student can now download certificate
         ↓
    PDF generated → Downloaded + Emailed
```

---

## API Integration Examples

### Frontend - Mark Lesson Complete
```javascript
const markComplete = async (courseId, subSectionId) => {
  const response = await fetch('/api/v1/course/progress/mark-complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ courseId, subSectionId })
  });
  const data = await response.json();
  return data.progress; // { totalLessons, completedLessons, progressPercentage }
};
```

### Frontend - Check Certificate Eligibility
```javascript
const checkEligibility = async (courseId) => {
  const response = await fetch(
    `/api/v1/course/certificates/check-eligibility?courseId=${courseId}`,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
  const data = await response.json();
  return {
    eligible: data.eligible,
    reasons: data.reasons // { progressComplete, certificatePublished }
  };
};
```

### Frontend - Download Certificate
```javascript
const downloadCertificate = async (courseId) => {
  const response = await fetch(
    `/api/v1/course/certificates/download?courseId=${courseId}`,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Certificate.pdf`;
  link.click();
};
```

---

## Security Considerations

### Access Control
- ✅ Students can only track their own progress
- ✅ Students can only mark their own lessons
- ✅ Students can only download if eligible
- ✅ Teachers can only publish their own courses
- ✅ Middleware validates user role and authorization

### Data Validation
- ✅ courseId and subSectionId validated
- ✅ Enrollment status verified before marking
- ✅ Eligibility checked before certificate generation
- ✅ All database operations use proper error handling

### Business Logic
- ✅ Progress calculated from actual data (no randomization)
- ✅ Certificates only downloadable when 100% + published
- ✅ Email sent only to authenticated student's email
- ✅ Unique certificate IDs prevent forgery

---

## Testing Checklist

### Progress Tracking
- [ ] Mark lesson complete increments progress
- [ ] Progress calculation is accurate
- [ ] Progress persists after logout
- [ ] Mark incomplete decrements progress
- [ ] Cannot mark other students' lessons
- [ ] Cannot exceed 100% progress

### Certificate Publishing
- [ ] Only instructor can publish
- [ ] Publish status saved to database
- [ ] Status visible to all users
- [ ] Can unpublish after publishing
- [ ] Cannot publish another's course

### Certificate Download
- [ ] Cannot download if progress < 100%
- [ ] Cannot download if not published
- [ ] Can download at exactly 100% when published
- [ ] PDF generates with correct data
- [ ] PDF is downloadable in browser

### Certificate Email
- [ ] Email sent only when eligible
- [ ] PDF attached to email
- [ ] Email contains correct course info
- [ ] Email address is correct

---

## Files Modified/Created

### Created Files
- `server/models/LessonCompletion.js`
- `server/controllers/Progress.controller.js`
- `server/router/Progress.router.js`
- `server/utils/certificateGenerator.js`
- `API_DOCUMENTATION.md`
- `IMPLEMENTATION_GUIDE.md` (this file)

### Modified Files
- `server/models/Course.js` (added certificate fields)
- `server/models/Certificate.js` (updated schema)
- `server/controllers/Certificate.controller.js` (major rewrite)
- `server/controllers/Course.controller.js` (added publishing functions)
- `server/controllers/Subsection.controller.js` (updated markedSubSection)
- `server/router/Certificate.router.js` (updated routes)
- `server/router/Course.router.js` (added new routes)
- `server/utils/mailSend.js` (added attachment support)
- `server/package.json` (added pdfkit dependency)

---

## Next Steps

### Installation
1. Run `npm install` in server directory to install pdfkit
2. Ensure logo is placed at: `public/Screenshot 2024-11-11 094719.png`
3. Verify all routes are accessible

### Testing
1. Run the server: `npm run dev`
2. Test endpoints using Postman or similar
3. Verify frontend integration

### Frontend Implementation
- Update student dashboard with progress tracking
- Add complete button for lessons
- Add certificate eligibility display
- Add download/email certificate buttons
- Update teacher dashboard with publish certificate button

---

## Troubleshooting

### Issue: Progress not updating
**Solution:** Ensure LessonCompletion model is imported correctly and student is enrolled in course.

### Issue: Certificate download fails
**Solution:** Check eligibility first, verify logo path, ensure permissions are correct.

### Issue: Email not sending
**Solution:** Verify Nodemailer configuration, check MAIL_HOST, MAIL_USER, MAIL_PASS in .env

### Issue: PDF generation errors
**Solution:** Ensure pdfkit is installed, check file paths, verify Node.js version compatibility.

---

## Performance Considerations

### Database Optimization
- Compound indexes on frequently queried fields
- Minimal document size for LessonCompletion
- Efficient progress calculation query

### API Response Times
- Progress calculation: O(n) where n = number of lessons
- Certificate generation: ~2-3 seconds for PDF
- Email sending: ~5-10 seconds (async)

### Recommendations
- Cache progress calculations if frequently requested
- Use pagination for large lesson lists
- Consider async certificate generation for large batches
- Implement rate limiting on certificate download endpoint

---

## Maintenance Notes

- Regularly monitor certificate generation logs
- Archive old certificates periodically
- Backup LessonCompletion data
- Monitor email delivery logs
- Keep pdfkit library updated

---
