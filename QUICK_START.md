# Quick Start Guide - Progress & Certificate System

## 🚀 Installation (5 minutes)

### 1. Install Dependencies
```bash
cd server
npm install
```

This installs the new PDFKit library required for certificate generation.

### 2. Verify Logo File
Ensure the company logo exists at:
```
public/Screenshot 2024-11-11 094719.png
```

If not present, the system will still work but without the logo on certificates.

### 3. Restart Server
```bash
npm run dev
```

---

## ✅ Verify Installation

### Test Progress Endpoint
```bash
curl -X POST http://localhost:4000/api/v1/course/progress/mark-complete \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "COURSE_ID",
    "subSectionId": "SUBSECTION_ID"
  }'
```

### Test Certificate Endpoint
```bash
curl -X GET 'http://localhost:4000/api/v1/course/certificates/check-eligibility?courseId=COURSE_ID' \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 Database Changes

All changes are automatic! The system will:
- Create LessonCompletion collection on first use
- Add fields to Course collection on first update
- Update Certificate collection schema automatically

**No manual migrations needed!**

---

## 🎯 Testing the Complete Flow

### As a Student:
1. **Enroll in a course** (existing functionality)
2. **Mark lessons complete**
   ```
   POST /api/v1/course/progress/mark-complete
   Body: { courseId, subSectionId }
   ```
3. **Check progress**
   ```
   GET /api/v1/course/progress/get-progress?courseId=COURSE_ID
   ```
4. **See certificate unavailable** (until teacher publishes)

### As a Teacher:
1. **Publish certificate for course**
   ```
   POST /api/v1/course/publishCertificate
   Body: { courseId }
   ```

### As a Student (continued):
1. **Complete all lessons** (100% progress)
2. **Check eligibility**
   ```
   GET /api/v1/course/certificates/check-eligibility?courseId=COURSE_ID
   ```
3. **Download certificate**
   ```
   GET /api/v1/course/certificates/download?courseId=COURSE_ID
   ```
4. **Email certificate**
   ```
   POST /api/v1/course/certificates/send-email
   Body: { courseId }
   ```

---

## 🔌 Frontend Integration (Next Steps)

### 1. Install the Components
Copy from `FRONTEND_INTEGRATION_GUIDE.md`:
- `ProgressBar` component
- `LessonCard` component
- `CertificateSection` component
- `PublishCertificateControl` component

### 2. Add to Pages
```jsx
// Student Course Page
import ProgressBar from './ProgressBar';
import LessonCard from './LessonCard';
import CertificateSection from './CertificateSection';

// Teacher Course Page
import PublishCertificateControl from './PublishCertificateControl';
```

### 3. Configure API Service
Update your API service to use new endpoints:
```javascript
export const markLessonComplete = (courseId, subSectionId, token) =>
  api.post('/course/progress/mark-complete', 
    { courseId, subSectionId },
    { headers: { Authorization: `Bearer ${token}` }}
  );

export const checkCertificateEligibility = (courseId, token) =>
  api.get(`/course/certificates/check-eligibility?courseId=${courseId}`,
    { headers: { Authorization: `Bearer ${token}` }}
  );
```

---

## 📝 API Reference (Quick)

### Progress Endpoints
```
POST   /api/v1/course/progress/mark-complete
POST   /api/v1/course/progress/mark-incomplete
GET    /api/v1/course/progress/get-progress?courseId=ID
GET    /api/v1/course/progress/get-completed-lessons?courseId=ID
```

### Certificate Endpoints
```
GET    /api/v1/course/certificates/check-eligibility?courseId=ID
POST   /api/v1/course/certificates/generate
GET    /api/v1/course/certificates/download?courseId=ID
POST   /api/v1/course/certificates/send-email
GET    /api/v1/course/certificates/get-certificate?courseId=ID
```

### Course Publishing Endpoints
```
POST   /api/v1/course/publishCertificate
POST   /api/v1/course/unpublishCertificate
GET    /api/v1/course/getCertificateStatus?courseId=ID
```

**See `API_DOCUMENTATION.md` for complete details**

---

## 🛠️ Troubleshooting

### "PDFKit not found"
```bash
cd server && npm install pdfkit
```

### "Logo not found"
- Place `Screenshot 2024-11-11 094719.png` in `server/public/`
- Or upload through Cloudinary and update path

### "Certificate not generating"
- Check eligibility first with `/check-eligibility` endpoint
- Ensure progress is exactly 100%
- Verify certificate is published

### "Email not sending"
- Verify `.env` has MAIL_HOST, MAIL_USER, MAIL_PASS
- Check email address is valid
- Review Nodemailer configuration

---

## 📚 Documentation Files

1. **API_DOCUMENTATION.md**
   - Complete API reference
   - All endpoints with examples
   - Error responses
   - Testing with Postman

2. **IMPLEMENTATION_GUIDE.md**
   - Technical details
   - Database schema changes
   - File modifications
   - Architecture overview

3. **FRONTEND_INTEGRATION_GUIDE.md**
   - React component samples
   - Integration examples
   - Custom hooks
   - Testing guides

---

## ✨ What's New

### Models
- `LessonCompletion` - Tracks completion per student/lesson
- `Course` - Added `certificatePublished`, `publishedAt`
- `Certificate` - Improved schema with indexes

### Controllers
- `Progress` - 4 functions for tracking
- `Certificate` - 7 functions for management
- `Course` - 3 functions for publishing

### Routers
- `Progress` - New router for progress endpoints
- `Certificate` - Updated with new endpoints
- `Course` - Updated with publishing routes

### Utilities
- `certificateGenerator.js` - PDF generation
- `mailSend.js` - Enhanced with attachments

---

## 🔒 Security Notes

✓ All endpoints require authentication (except public status check)  
✓ Students can only access their own data  
✓ Teachers can only publish their own courses  
✓ Eligibility verified before certificate operations  
✓ Input validation on all endpoints  

---

## 📊 How It Works (Overview)

```
Student Progress Tracking:
  Lesson viewed → Mark Complete → LessonCompletion record created
  → Progress calculated → Display on dashboard

Certificate Management:
  Teacher publishes → Course.certificatePublished = true
  → Student completes course (100%) → Checks eligibility (100% + published)
  → Downloads PDF → Email sent to student's email
```

---

## 🎓 Example Workflow

**Day 1 - Teacher:**
1. Creates course with 5 lessons
2. Uploads all 5 lessons
3. Publishes certificate

**Day 2 - Student:**
1. Enrolls in course
2. Completes lesson 1 → Progress: 20%
3. Completes lesson 2 → Progress: 40%
4. Completes lesson 3 → Progress: 60%
5. Completes lesson 4 → Progress: 80%
6. Completes lesson 5 → Progress: 100%
7. Downloads certificate
8. Receives email with certificate

---

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review error messages
3. Check server logs
4. Verify database connection
5. Test endpoints with Postman

---

## 🎉 Summary

✅ Backend fully implemented  
✅ All APIs ready to use  
✅ Documentation complete  
✅ Frontend components provided  
✅ Security implemented  
✅ Tested and working  

**Ready to integrate with frontend!**

---
