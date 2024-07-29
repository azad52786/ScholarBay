const express = require('express');
const { auth, isInstructor, isAdmin, isStudent } = require('../middlewares/auth.middleware');
const { createCourse , getAllCourse, showAllCourse, getAllCourseDetails, getCreatedCourseDetails, updateCourseDetails} = require('../controllers/Course.controller');
const { createSection, updateSection, deleteSection } = require('../controllers/section.controller');
const { updateSubsection, deleteSubsection, createSubSection } = require('../controllers/Subsection.controller');
const { createTag, showAllTags, tagsPageDetails } = require('../controllers/tags.controller');
const { createRatingAndReview, getAvarageRating, getAllRatingAndReviews } = require('../controllers/RatingAndReview.controller');
const router = express.Router();


// ************************************************************************************************
//                                         Course                                                  
// ************************************************************************************************

router.post('/createCourse' , auth , isInstructor , createCourse);
// http://localhost:4000/api/v1/course/createCourse
router.post('/updateCourse' , auth , isInstructor , updateCourseDetails)
router.post('/addSection' , auth , isInstructor , createSection);
// http://localhost:4000/api/v1/course/addSection
router.post('/getcreateCourseDetails' , auth , isInstructor , getCreatedCourseDetails);
// http://localhost:4000/api/v1/course/getcreateCourseDetails
router.post('/updateSection' , auth , isInstructor , updateSection);
// http://localhost:4000/api/v1/course/updateSection
// Delete a Section
router.delete("/deleteSection/:sectionId", auth, isInstructor, deleteSection)
// http://localhost:4000/api/v1/course/deleteSection
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubsection)
// http://localhost:4000/api/v1/course/updateSubSection
// Delete Sub Section
router.delete("/deleteSubSection/:subSectionId", auth, isInstructor, deleteSubsection)
// http://localhost:4000/api/v1/course/deleteSubSection
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// http://localhost:4000/api/v1/course/addSubSection
// Get all Registered Courses
router.get("/getAllCourses", showAllCourse)
// http://localhost:4000/api/v1/course/getAllCourses
// Get Details for a Specific Courses
router.post("/getCourseDetails", getAllCourseDetails);
// http://localhost:4000/api/v1/course/getCourseDetails
// router.post("")



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createTag", auth, isAdmin, createTag)
// http://localhost:4000/api/v1/course/createTag
router.get("/showAllTags", showAllTags)
// http://localhost:4000/api/v1/course/showAllTags
router.post("/getCategoryPageDetails", tagsPageDetails)
// http://localhost:4000/api/v1/course/getCategoryPageDetails

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRatingAndReview)
// http://localhost:4000/api/v1/course/createRating
router.get("/getAverageRating", getAvarageRating)
// http://localhost:4000/api/v1/course/getAverageRating
router.get("/getReviews", getAllRatingAndReviews)
// http://localhost:4000/api/v1/course/getReviews

module.exports = router;