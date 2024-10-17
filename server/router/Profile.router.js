const express = require('express');
const { auth, isInstructor } = require('../middlewares/auth.middleware');
const { deleteUser } = require('../controllers/userDelete.controller');
const { updateProfile, getUserDetails, getEnrolledCourses, updateDisplayPicture, instructorDashBoard } = require('../controllers/Profile.controller');
const router = express.Router();


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteUser)
// http://localhost:4000/api/v1/profile/deleteProfile
router.put("/updateProfile", auth, updateProfile)
// http://localhost:4000/api/v1/profile/updateProfile
router.get("/getUserDetails", auth, getUserDetails)
// http://localhost:4000/api/v1/profile/getUserDetails
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// http://localhost:4000/api/v1/profile/getEnrolledCourses
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// http://localhost:4000/api/v1/profile/updateDisplayPicture
router.get('/instructorDashBoardDetails' , auth , isInstructor , instructorDashBoard);
// http://localhost:4000/api/v1/profile/instructorDashBoardDetails


module.exports = router;