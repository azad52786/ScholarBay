# Frontend Integration Guide - Progress & Certificate System

This guide provides sample React components and integration code for the progress tracking and certificate system.

---

## 1. Student Dashboard Progress Display

### ProgressBar Component
```jsx
// frontend/learning-platform/src/components/ProgressBar.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProgressBar = ({ courseId, studentToken }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProgress();
  }, [courseId]);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/v1/course/progress/get-progress?courseId=${courseId}`,
        {
          headers: {
            'Authorization': `Bearer ${studentToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setProgress(response.data.data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching progress:', err);
      setError(err.response?.data?.message || 'Failed to load progress');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading progress...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!progress) return null;

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Course Progress</span>
          <span className="text-blue-600 font-bold">{progress.progressPercentage}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress.progressPercentage}%` }}
          ></div>
        </div>

        <div className="text-sm text-gray-600 mt-2">
          {progress.completedLessons} of {progress.totalLessons} lessons completed
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchProgress}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Refresh Progress
      </button>

      {progress.progressPercentage === 100 && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded text-green-800">
          ✓ You have completed this course!
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
```

---

## 2. Lesson Complete Button

### LessonCard Component
```jsx
// frontend/learning-platform/src/components/LessonCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LessonCard = ({ 
  lesson, 
  courseId, 
  isCompleted, 
  studentToken, 
  onComplete 
}) => {
  const [marking, setMarking] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  const handleMarkComplete = async () => {
    try {
      setMarking(true);
      const response = await axios.post(
        '/api/v1/course/progress/mark-complete',
        {
          courseId,
          subSectionId: lesson._id
        },
        {
          headers: {
            'Authorization': `Bearer ${studentToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setCompleted(true);
        onComplete?.(response.data.progress);
      }
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      alert(error.response?.data?.message || 'Failed to mark lesson complete');
    } finally {
      setMarking(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{lesson.title}</h3>
          <p className="text-gray-600 text-sm">{lesson.description}</p>
          {lesson.hours && (
            <p className="text-gray-500 text-xs mt-1">
              Duration: {lesson.hours}h {lesson.minutes}m
            </p>
          )}
        </div>
        {completed && (
          <span className="text-green-500 text-2xl">✓</span>
        )}
      </div>

      <button
        onClick={handleMarkComplete}
        disabled={marking || completed}
        className={`px-4 py-2 rounded font-medium transition ${
          completed
            ? 'bg-green-100 text-green-700 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50'
        }`}
      >
        {marking ? 'Marking...' : completed ? 'Completed ✓' : 'Mark as Complete'}
      </button>
    </div>
  );
};

export default LessonCard;
```

---

## 3. Certificate Eligibility & Download

### CertificateSection Component
```jsx
// frontend/learning-platform/src/components/CertificateSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CertificateSection = ({ courseId, studentToken }) => {
  const [eligibility, setEligibility] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [emailing, setEmailing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    checkEligibility();
  }, [courseId]);

  const checkEligibility = async () => {
    try {
      setLoading(true);
      const [eligRes, certRes] = await Promise.all([
        axios.get(
          `/api/v1/course/certificates/check-eligibility?courseId=${courseId}`,
          {
            headers: { 'Authorization': `Bearer ${studentToken}` }
          }
        ),
        axios.get(
          `/api/v1/course/certificates/get-certificate?courseId=${courseId}`,
          {
            headers: { 'Authorization': `Bearer ${studentToken}` }
          }
        )
      ]);

      setEligibility(eligRes.data);
      setCertificate(certRes.data.certificate);
      setError(null);
    } catch (err) {
      console.error('Error checking eligibility:', err);
      setError(err.response?.data?.message || 'Failed to check certificate eligibility');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await axios.get(
        `/api/v1/course/certificates/download?courseId=${courseId}`,
        {
          headers: { 'Authorization': `Bearer ${studentToken}` },
          responseType: 'blob'
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Certificate_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess('Certificate downloaded successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error downloading certificate:', err);
      setError(err.response?.data?.message || 'Failed to download certificate');
    } finally {
      setDownloading(false);
    }
  };

  const handleEmail = async () => {
    try {
      setEmailing(true);
      const response = await axios.post(
        '/api/v1/course/certificates/send-email',
        { courseId },
        {
          headers: { 'Authorization': `Bearer ${studentToken}` }
        }
      );

      setSuccess('Certificate emailed successfully! Check your inbox.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error emailing certificate:', err);
      setError(err.response?.data?.message || 'Failed to email certificate');
    } finally {
      setEmailing(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  const { eligible, reasons } = eligibility || {};
  const canDownload = eligible === true;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Course Certificate</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Eligibility Requirements */}
      <div className="mb-6 p-4 bg-white rounded border">
        <h3 className="font-semibold mb-3">Requirements:</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center font-bold ${
              reasons?.progressComplete 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}>
              {reasons?.progressComplete ? '✓' : '○'}
            </span>
            <span>Complete all course lessons (100% progress)</span>
          </div>
          <div className="flex items-center">
            <span className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center font-bold ${
              reasons?.certificatePublished 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}>
              {reasons?.certificatePublished ? '✓' : '○'}
            </span>
            <span>Teacher must publish the certificate</span>
          </div>
        </div>
      </div>

      {/* Certificate Display */}
      {certificate && (
        <div className="mb-6 p-4 bg-white rounded border">
          <h3 className="font-semibold mb-3">Certificate Information:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Issued to:</span>
              <p className="font-medium">{certificate.studentName}</p>
            </div>
            <div>
              <span className="text-gray-600">Course:</span>
              <p className="font-medium">{certificate.courseName}</p>
            </div>
            <div>
              <span className="text-gray-600">Instructor:</span>
              <p className="font-medium">{certificate.instructorName}</p>
            </div>
            <div>
              <span className="text-gray-600">Certificate ID:</span>
              <p className="font-medium text-xs">{certificate.certificateId}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          disabled={!canDownload || downloading}
          className={`flex-1 px-4 py-3 rounded font-semibold transition ${
            canDownload
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          {downloading ? 'Downloading...' : '📥 Download Certificate'}
        </button>

        <button
          onClick={handleEmail}
          disabled={!canDownload || emailing}
          className={`flex-1 px-4 py-3 rounded font-semibold transition ${
            canDownload
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          {emailing ? 'Emailing...' : '✉️ Email Certificate'}
        </button>
      </div>

      {!canDownload && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded text-sm">
          ⚠️ Certificate is not available yet. {
            !reasons?.progressComplete && 'Complete all lessons. '
          }
          {!reasons?.certificatePublished && 'Waiting for instructor to publish.'}
        </div>
      )}

      <button
        onClick={checkEligibility}
        className="w-full mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        🔄 Refresh Status
      </button>
    </div>
  );
};

export default CertificateSection;
```

---

## 4. Teacher Dashboard - Publish Certificate

### PublishCertificateControl Component
```jsx
// frontend/learning-platform/src/components/PublishCertificateControl.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PublishCertificateControl = ({ courseId, instructorToken }) => {
  const [publishStatus, setPublishStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchStatus();
  }, [courseId]);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/v1/course/getCertificateStatus?courseId=${courseId}`,
        {
          headers: { 'Authorization': `Bearer ${instructorToken}` }
        }
      );

      if (response.data.success) {
        setPublishStatus(response.data.certificatePublished);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching status:', err);
      setError(err.response?.data?.message || 'Failed to fetch certificate status');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setUpdating(true);
      const endpoint = publishStatus ? '/unpublishCertificate' : '/publishCertificate';
      
      const response = await axios.post(
        `/api/v1/course${endpoint}`,
        { courseId },
        {
          headers: { 'Authorization': `Bearer ${instructorToken}` }
        }
      );

      if (response.data.success) {
        setPublishStatus(!publishStatus);
        setSuccess(
          publishStatus 
            ? 'Certificate unpublished. Students can no longer download certificates.'
            : 'Certificate published! Students can now download certificates upon completion.'
        );
        setTimeout(() => setSuccess(null), 4000);
      }
    } catch (err) {
      console.error('Error updating certificate:', err);
      setError(err.response?.data?.message || 'Failed to update certificate');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-blue-200">
      <h2 className="text-xl font-bold mb-4">Certificate Management</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
          {success}
        </div>
      )}

      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Status:</p>
            <p className="text-lg font-bold">
              {publishStatus ? (
                <span className="text-green-600">✓ Published</span>
              ) : (
                <span className="text-orange-600">○ Not Published</span>
              )}
            </p>
          </div>
          <div className="text-4xl">
            {publishStatus ? '📜' : '📋'}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4">
        {publishStatus
          ? 'Students who complete this course can download their certificates.'
          : 'Students will not be able to download certificates until you publish them.'
        }
      </p>

      <button
        onClick={handlePublish}
        disabled={updating}
        className={`w-full px-4 py-3 rounded font-semibold transition ${
          publishStatus
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        } disabled:opacity-50`}
      >
        {updating ? 'Updating...' : publishStatus ? 'Unpublish Certificate' : 'Publish Certificate'}
      </button>

      <button
        onClick={fetchStatus}
        className="w-full mt-3 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        🔄 Refresh Status
      </button>
    </div>
  );
};

export default PublishCertificateControl;
```

---

## 5. Integration in Course Page

### Example Integration in Student Course Page
```jsx
// Usage in StudentCoursePage component
import ProgressBar from './ProgressBar';
import LessonCard from './LessonCard';
import CertificateSection from './CertificateSection';

function StudentCoursePage() {
  const { courseId } = useParams();
  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  const handleLessonComplete = (newProgress) => {
    // Update UI with new progress
    console.log('Progress updated:', newProgress);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{course?.courseName}</h1>

      {/* Progress Section */}
      <div className="mb-8">
        <ProgressBar courseId={courseId} studentToken={token} />
      </div>

      {/* Lessons Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Lessons</h2>
        <div className="grid gap-4">
          {course?.lessons?.map(lesson => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              courseId={courseId}
              isCompleted={completedLessons.includes(lesson._id)}
              studentToken={token}
              onComplete={handleLessonComplete}
            />
          ))}
        </div>
      </div>

      {/* Certificate Section */}
      <div className="mb-8">
        <CertificateSection courseId={courseId} studentToken={token} />
      </div>
    </div>
  );
}
```

---

## 6. Error Handling & Loading States

### Custom Hook for Progress
```jsx
// frontend/learning-platform/src/hooks/useProgress.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useProgress = (courseId, token) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    if (!courseId || !token) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `/api/v1/course/progress/get-progress?courseId=${courseId}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setProgress(response.data.data);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load progress');
      console.error('Progress fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [courseId, token]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progress, loading, error, refetch: fetchProgress };
};

export default useProgress;
```

### Usage
```jsx
const { progress, loading, error, refetch } = useProgress(courseId, token);

if (loading) return <Skeleton />;
if (error) return <ErrorMessage message={error} />;
if (progress) return <ProgressDisplay data={progress} />;
```

---

## 7. Redux Integration (Optional)

### Progress Slice
```javascript
// frontend/learning-platform/src/store/slices/progressSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProgress = createAsyncThunk(
  'progress/fetchProgress',
  async ({ courseId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/course/progress/get-progress?courseId=${courseId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const markLessonComplete = createAsyncThunk(
  'progress/markComplete',
  async ({ courseId, subSectionId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/v1/course/progress/mark-complete',
        { courseId, subSectionId },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      return response.data.progress;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  progress: null,
  loading: false,
  error: null,
  lastUpdated: null
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
        state.lastUpdated = new Date();
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markLessonComplete.fulfilled, (state, action) => {
        state.progress = action.payload;
      });
  }
});

export default progressSlice.reducer;
```

---

## Testing

### Test Certificate Download
```javascript
// Test in Postman or Cypress
test('Student can download certificate when eligible', () => {
  cy.login('student@test.com');
  cy.visit(`/course/${courseId}`);
  
  // Mark all lessons complete
  cy.get('[data-testid="mark-complete-btn"]').each(btn => {
    cy.wrap(btn).click();
  });
  
  // Download certificate
  cy.get('[data-testid="download-cert-btn"]').click();
  cy.readFile('cypress/downloads/Certificate_*.pdf').should('exist');
});
```

---

## Styling with Tailwind

All components use Tailwind CSS classes. Ensure `tailwind.config.js` is properly configured in your frontend project.

---
