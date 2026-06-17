const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware');
const { emailCertificate, createOrGetCertificate } = require('../controllers/Certificate.controller');

router.post('/:id/email', auth, emailCertificate);
router.post('/create', auth, createOrGetCertificate);

module.exports = router;
