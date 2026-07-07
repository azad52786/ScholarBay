# Progress Tracking & Certificate System - API Documentation

## Overview
This document outlines all the new APIs for the student progress tracking and certificate management system.

---

## 1. Progress Tracking APIs

### 1.1 Mark Lesson as Complete
**Endpoint:** `POST /api/v1/course/progress/mark-complete`  
**Auth:** Required (Student)  
**Description:** Mark a lesson (subsection) as completed for a course.

**Request Body:**
```json
{
  "courseId": "course_id_here",
  "subSectionId": "subsection_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lesson marked as completed successfully",
  "lessonCompletion": {
    "_id": "...",
    "studentId": "...",
    "courseId": "...",
    "subSectionId": "...",
    "completed": true,
    "completedAt": "2024-01-15T10:30:00Z"
  },
  "progress": {
    "totalLessons": 20,
    "completedLessons": 15,
    "progressPercentage": 75,
    "isComplete": false
  }
}
```

---

### 1.2 Get Student Course Progress
**Endpoint:** `GET /api/v1/course/progress/get-progress?courseId=course_id_here`  
**Auth:** Required (Student)  
**Description:** Get the student's current progress for a course.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalLessons": 20,
    "completedLessons": 15,
    "progressPercentage": 75,
    "isComplete": false,
    "completedLessonsIds": ["subsection_id_1", "subsection_id_2", ...],
    "certificatePublished": true
  }
}
```

---

### 1.3 Get Completed Lessons List
**Endpoint:** `GET /api/v1/course/progress/get-completed-lessons?courseId=course_id_here`  
**Auth:** Required (Student)  
**Description:** Get detailed list of all completed lessons for a course.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "subSectionId": "subsection_id_1",
      "completedAt": "2024-01-15T10:30:00Z"
    },
    {
      "_id": "...",
      "subSectionId": "subsection_id_2",
      "completedAt": "2024-01-15T11:00:00Z"
    }
  ]
}
```

---

### 1.4 Mark Lesson as Incomplete
**Endpoint:** `POST /api/v1/course/progress/mark-incomplete`  
**Auth:** Required (Student)  
**Description:** Mark a previously completed lesson as incomplete (for re-taking).

**Request Body:**
```json
{
  "courseId": "course_id_here",
  "subSectionId": "subsection_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lesson marked as incomplete",
  "progress": {
    "totalLessons": 20,
    "completedLessons": 14,
    "progressPercentage": 70,
    "isComplete": false
  }
}
```

---

## 2. Certificate Management APIs

### 2.1 Check Certificate Eligibility
**Endpoint:** `GET /api/v1/course/certificates/check-eligibility?courseId=course_id_here`  
**Auth:** Required (Student)  
**Description:** Check if student is eligible to download the certificate.

**Eligibility Conditions:**
- Student progress must be exactly 100%
- Course certificate must be published by teacher

**Response:**
```json
{
  "success": true,
  "eligible": true,
  "progress": 100,
  "certificatePublished": true,
  "reasons": {
    "progressComplete": true,
    "certificatePublished": true
  }
}
```

---

### 2.2 Generate Certificate
**Endpoint:** `POST /api/v1/course/certificates/generate`  
**Auth:** Required (Student)  
**Description:** Generate a certificate record (creates if doesn't exist).

**Request Body:**
```json
{
  "courseId": "course_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Certificate generated successfully",
  "certificate": {
    "_id": "...",
    "certificateId": "unique_cert_id_123",
    "studentId": "...",
    "courseId": "...",
    "studentName": "John Doe",
    "courseName": "Python Basics",
    "instructorName": "Jane Smith",
    "platformName": "ScholarBay",
    "generatedAt": "2024-01-15T12:00:00Z"
  }
}
```

---

### 2.3 Download Certificate as PDF
**Endpoint:** `GET /api/v1/course/certificates/download?courseId=course_id_here`  
**Auth:** Required (Student)  
**Description:** Download the certificate as a PDF file.

**Success:** Returns PDF file with appropriate headers
**Error Response:**
```json
{
  "success": false,
  "message": "You are not eligible to download certificate",
  "reasons": {
    "progressComplete": false,
    "certificatePublished": false
  }
}
```

---

### 2.4 Email Certificate to Student
**Endpoint:** `POST /api/v1/course/certificates/send-email`  
**Auth:** Required (Student)  
**Description:** Email the certificate PDF to the student's registered email address.

**Request Body:**
```json
{
  "courseId": "course_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Certificate emailed successfully"
}
```

**Email Content:**
- Subject: "Congratulations! Your Course Completion Certificate"
- Body: Congratulations message with course details
- Attachment: PDF certificate

---

### 2.5 Get Student Certificate
**Endpoint:** `GET /api/v1/course/certificates/get-certificate?courseId=course_id_here`  
**Auth:** Required (Student)  
**Description:** Retrieve student's certificate information (if eligible).

**Response:**
```json
{
  "success": true,
  "eligible": true,
  "certificate": {
    "_id": "...",
    "certificateId": "unique_cert_id_123",
    "studentName": "John Doe",
    "courseName": "Python Basics",
    "instructorName": "Jane Smith",
    "platformName": "ScholarBay",
    "generatedAt": "2024-01-15T12:00:00Z"
  }
}
```

---

## 3. Course Certificate Publishing APIs (Teacher Only)

### 3.1 Publish Certificate
**Endpoint:** `POST /api/v1/course/publishCertificate`  
**Auth:** Required (Instructor)  
**Description:** Publish certificate for a course. Students can only download certificates after this is published.

**Request Body:**
```json
{
  "courseId": "course_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Certificate published successfully",
  "course": {
    "_id": "...",
    "courseName": "Python Basics",
    "certificatePublished": true,
    "publishedAt": "2024-01-15T10:00:00Z"
  }
}
```

---

### 3.2 Unpublish Certificate
**Endpoint:** `POST /api/v1/course/unpublishCertificate`  
**Auth:** Required (Instructor)  
**Description:** Unpublish certificate for a course. Students cannot download certificates after this.

**Request Body:**
```json
{
  "courseId": "course_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Certificate unpublished successfully",
  "course": {
    "_id": "...",
    "courseName": "Python Basics",
    "certificatePublished": false,
    "publishedAt": null
  }
}
```

---

### 3.3 Get Certificate Publish Status
**Endpoint:** `GET /api/v1/course/getCertificateStatus?courseId=course_id_here`  
**Auth:** Not required  
**Description:** Check if a course has published certificates.

**Response:**
```json
{
  "success": true,
  "certificatePublished": true,
  "publishedAt": "2024-01-15T10:00:00Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "courseId is required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You are not eligible to download certificate",
  "reasons": {
    "progressComplete": false,
    "certificatePublished": false
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Course not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "error details"
}
```

---

## Progress Calculation Formula

```
Progress (%) = (Completed Lessons / Total Lessons) × 100
```

**Example:**
- Total Lessons = 20
- Completed Lessons = 15
- Progress = (15 / 20) × 100 = 75%

---

## Database Models

### LessonCompletion Schema
```javascript
{
  studentId: ObjectId (ref: User),
  courseId: ObjectId (ref: Course),
  subSectionId: ObjectId (ref: SubSection),
  completed: Boolean,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Course Schema (Updated Fields)
```javascript
{
  // ... existing fields ...
  certificatePublished: Boolean,
  publishedAt: Date
}
```

### Certificate Schema
```javascript
{
  certificateId: String (unique),
  studentId: ObjectId (ref: User),
  courseId: ObjectId (ref: Course),
  studentName: String,
  courseName: String,
  instructorName: String,
  platformName: String,
  generatedAt: Date,
  pdfUrl: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Implementation Notes

### Progress Tracking
- Progress is calculated in real-time based on LessonCompletion records
- No random values are used
- Progress persists even after logout
- Completion timestamp is recorded automatically

### Certificate Generation
- Certificates are generated dynamically when downloaded
- PDFKit is used for professional PDF generation
- Company logo is embedded if available at: `public/Screenshot 2024-11-11 094719.png`
- Unique certificate ID is generated using UUID

### Security Features
- Students can only mark their own lessons as complete
- Students can only download certificates if eligible
- Teachers can only publish/unpublish their own courses
- Email certificates are sent only to the authenticated student

### Backward Compatibility
- Old CourseProgress model is still updated for backward compatibility
- Existing endpoints continue to work
- markedSubSection endpoint now uses LessonCompletion internally

---

## Frontend Integration Tips

### Student Dashboard
```javascript
// Check eligibility
GET /api/v1/course/certificates/check-eligibility?courseId=courseId

// Get progress
GET /api/v1/course/progress/get-progress?courseId=courseId

// Mark lesson complete
POST /api/v1/course/progress/mark-complete
Body: { courseId, subSectionId }

// Download certificate (only if eligible)
GET /api/v1/course/certificates/download?courseId=courseId

// Send certificate via email
POST /api/v1/course/certificates/send-email
Body: { courseId }
```

### Teacher Dashboard
```javascript
// Publish certificate
POST /api/v1/course/publishCertificate
Body: { courseId }

// Unpublish certificate
POST /api/v1/course/unpublishCertificate
Body: { courseId }

// Check publish status
GET /api/v1/course/getCertificateStatus?courseId=courseId
```

---

## Testing with Postman

### Sample Requests

**1. Mark Lesson Complete**
```
POST http://localhost:4000/api/v1/course/progress/mark-complete
Authorization: Bearer {token}
Content-Type: application/json

{
  "courseId": "65a1234567890123456789ab",
  "subSectionId": "65a1234567890123456789cd"
}
```

**2. Get Progress**
```
GET http://localhost:4000/api/v1/course/progress/get-progress?courseId=65a1234567890123456789ab
Authorization: Bearer {token}
```

**3. Publish Certificate**
```
POST http://localhost:4000/api/v1/course/publishCertificate
Authorization: Bearer {token}
Content-Type: application/json

{
  "courseId": "65a1234567890123456789ab"
}
```

**4. Download Certificate**
```
GET http://localhost:4000/api/v1/course/certificates/download?courseId=65a1234567890123456789ab
Authorization: Bearer {token}
```

---
