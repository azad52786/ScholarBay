const express = require('express');
const router = express.Router();
const { auth, isStudent } = require('../middlewares/auth.middleware');
const {
  markLessonComplete,
  markLessonIncomplete,
  getStudentCourseProgress,
  getCompletedLessons,
} = require('../controllers/Progress.controller');

// Student routes
router.post('/mark-complete', auth, isStudent, markLessonComplete);
router.post('/mark-incomplete', auth, isStudent, markLessonIncomplete);
router.get('/get-progress', auth, isStudent, getStudentCourseProgress);
router.get('/get-completed-lessons', auth, isStudent, getCompletedLessons);

module.exports = router;
