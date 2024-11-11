const express = require('express');
const { auth, isInstructor, isAdmin, isStudent, isDemo } = require('../middlewares/auth.middleware');
const { createCourse , getAllCourse, showAllCourse, getAllCourseDetails, getCreatedCourseDetails, updateCourseDetails, changeMode, getEntireCourseDetails, buy, getEnrolledCourse, getAllInstructorCourse} = require('../controllers/Course.controller');
const { createSection, updateSection, deleteSection } = require('../controllers/section.controller');
const { updateSubsection, deleteSubsection, createSubSection, markedSubSection, getwatchedSubSection } = require('../controllers/Subsection.controller');
const { createTag, showAllTags, tagsPageDetails } = require('../controllers/tags.controller');
const { createRatingAndReview, getAvarageRating, getAllRatingAndReviews } = require('../controllers/RatingAndReview.controller');
const router = express.Router();


// ************************************************************************************************
//                                         Course                                                  
// ************************************************************************************************

router.post('/createCourse' , auth , isDemo , isInstructor , createCourse);
// http://localhost:4000/api/v1/course/createCourse
router.post('/updateCourse' , auth , isDemo , isInstructor , updateCourseDetails)
router.post('/changeMode' , auth , isDemo , isInstructor , changeMode);
router.post('/addSection' , auth , isDemo , isInstructor , createSection);
// http://localhost:4000/api/v1/course/addSection
router.post('/getcreateCourseDetails' , auth , isInstructor , getCreatedCourseDetails);
// http://localhost:4000/api/v1/course/getcreateCourseDetails
router.post('/updateSection' , auth ,isDemo , isInstructor , updateSection);
// http://localhost:4000/api/v1/course/updateSection
// Delete a Section
router.delete("/deleteSection/:sectionId", auth , isDemo , isInstructor, deleteSection)
// http://localhost:4000/api/v1/course/deleteSection
// Edit Sub Section
router.post("/updateSubSection", auth , isDemo , isInstructor, updateSubsection)
// http://localhost:4000/api/v1/course/updateSubSection
// Delete Sub Section
router.delete("/deleteSubSection/:subSectionId", auth , isDemo , isInstructor, deleteSubsection)
// http://localhost:4000/api/v1/course/deleteSubSection
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isDemo , isInstructor, createSubSection)
// http://localhost:4000/api/v1/course/addSubSection
// Get all Registered Courses
router.get("/getAllCourses", showAllCourse)
// http://localhost:4000/api/v1/course/getAllCourses
// Get Details for a Specific Courses
router.post("/getCourseDetails", getEntireCourseDetails);
// http://localhost:4000/api/v1/course/getCourseDetails
// router.post("")
router.get('/getErolledCourse' , auth , isStudent , getEnrolledCourse);
router.put('/markWatched/:subSectionId' , auth , isDemo , isStudent , markedSubSection)
router.get('/getCourseProgress' , auth , isStudent , getwatchedSubSection);
// http://localhost:4000/api/v1/course/getCourseProgress
router.get('/getInstructorCourses' , auth , isInstructor , getAllInstructorCourse);

// http://localhost:4000/api/v1/course/getInstructorCourses

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createTag", auth , isDemo , isAdmin, createTag)
// http://localhost:4000/api/v1/course/createTag
router.get("/showAllTags", showAllTags)
// http://localhost:4000/api/v1/course/showAllTags
router.post("/getCategoryPageDetails", tagsPageDetails)
// http://localhost:4000/api/v1/course/getCategoryPageDetails

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth , isDemo , isStudent, createRatingAndReview)
// http://localhost:4000/api/v1/course/createRating
router.get("/getAverageRating", getAvarageRating)
// http://localhost:4000/api/v1/course/getAverageRating
router.get("/getReviews", getAllRatingAndReviews)
// http://localhost:4000/api/v1/course/getReviews







// route for testing purposes
// router.post('/buy', buy);

module.exports = router;