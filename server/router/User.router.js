const express = require('express');
const { login, signUp, sendOtp, changePassword } = require('../controllers/Auth.controller');
const { auth, isDemo } = require('../middlewares/auth.middleware');
const { sendResetPasswordLink, resetPassword } = require('../controllers/reSetPassowrd.controller');
const router = express.Router();


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)
// http://localhost:4000/api/v1/auth/login
// Route for user signup
router.post("/signup", signUp)
// http://localhost:4000/api/v1/auth/signup

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp)
// http://localhost:4000/api/v1/auth/sendotp

// Route for Changing the password
router.post("/changepassword", auth , isDemo  , changePassword)
// http://localhost:4000/api/v1/auth/changepassword
// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", sendResetPasswordLink)
// http://localhost:4000/api/v1/auth/reset-password-token
// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)
// http://localhost:4000/api/v1/auth/reset-password



module.exports = router;