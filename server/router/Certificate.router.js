const express = require('express');
const router = express.Router();
const { auth, isStudent } = require('../middlewares/auth.middleware');
const {
  checkEligibility,
  generateCertificate,
  downloadCertificate,
  emailCertificate,
  getStudentCertificate,
} = require('../controllers/Certificate.controller');

// Student routes
router.get('/check-eligibility', auth, isStudent, checkEligibility);
router.get('/get-certificate', auth, isStudent, getStudentCertificate);
router.post('/generate', auth, isStudent, generateCertificate);
router.get('/download', auth, isStudent, downloadCertificate);
router.post('/send-email', auth, isStudent, emailCertificate);

module.exports = router;
