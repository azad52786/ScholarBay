const mongoose = require("mongoose");
const LessonCompletion = require("../models/LessonCompletion");
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

/**
 * Mark a lesson as completed for a student
 */
exports.markLessonComplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, subSectionId } = req.body;

    // Validate inputs
    if (!courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "courseId and subSectionId are required",
      });
    }

    // Verify student is enrolled in the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    if (!course.studentsEnrolled.includes(userObjectId)) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // Verify subsection exists and belongs to this course
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // Check if lesson belongs to course
    const section = await Section.findOne({
      _id: { $in: course.courseContent },
      subSection: subSectionId,
    });

    if (!section) {
      return res.status(403).json({
        success: false,
        message: "This lesson does not belong to the course",
      });
    }

    // Update or create lesson completion record
    const lessonCompletion = await LessonCompletion.findOneAndUpdate(
      {
        studentId: userObjectId,
        courseId: new mongoose.Types.ObjectId(courseId),
        subSectionId: new mongoose.Types.ObjectId(subSectionId),
      },
      {
        completed: true,
        completedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
      }
    );

    // Update SubSection watched status
    await SubSection.findByIdAndUpdate(subSectionId, { watched: true });

    // Calculate current progress
    const progress = await exports.calculateCourseProgress(userId, courseId);

    return res.status(200).json({
      success: true,
      message: "Lesson marked as completed successfully",
      lessonCompletion,
      progress,
    });
  } catch (error) {
    console.error("Error marking lesson complete:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Calculate course progress for a student
 * Formula: (completed lessons / total lessons) × 100
 */
exports.calculateCourseProgress = async (userId, courseId) => {
  try {
    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });

    if (!course) {
      throw new Error("Course not found");
    }

    // Calculate total lessons
    let totalLessons = 0;
    course.courseContent.forEach((section) => {
      if (section.subSection && Array.isArray(section.subSection)) {
        totalLessons += section.subSection.length;
      }
    });

    // Get completed lessons count
    const completedCount = await LessonCompletion.countDocuments({
      studentId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
      completed: true,
    });

    // Calculate progress percentage
    const progressPercentage = totalLessons > 0 
      ? Math.round((completedCount / totalLessons) * 100) 
      : 0;

    return {
      totalLessons,
      completedLessons: completedCount,
      progressPercentage,
      isComplete: progressPercentage === 100 && totalLessons > 0,
    };
  } catch (error) {
    console.error("Error calculating progress:", error);
    return {
      totalLessons: 0,
      completedLessons: 0,
      progressPercentage: 0,
      isComplete: false,
    };
  }
};

/**
 * Get student's course progress
 */
exports.getStudentCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    // Verify student is enrolled
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    if (!course.studentsEnrolled.includes(userObjectId)) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // Get progress
    const progress = await exports.calculateCourseProgress(userId, courseId);

    // Get completed lessons details
    const completedLessons = await LessonCompletion.find({
      studentId: userObjectId,
      courseId: new mongoose.Types.ObjectId(courseId),
      completed: true,
    });

    return res.status(200).json({
      success: true,
      data: {
        ...progress,
        completedLessonsIds: completedLessons.map((l) => l.subSectionId),
        certificatePublished: course.certificatePublished,
      },
    });
  } catch (error) {
    console.error("Error getting progress:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Get list of completed lessons for a course
 */
exports.getCompletedLessons = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    const completedLessons = await LessonCompletion.find({
      studentId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
      completed: true,
    }).select("subSectionId completedAt");

    return res.status(200).json({
      success: true,
      data: completedLessons,
    });
  } catch (error) {
    console.error("Error getting completed lessons:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Mark a lesson as incomplete (for editing/re-taking)
 */
exports.markLessonIncomplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, subSectionId } = req.body;

    if (!courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "courseId and subSectionId are required",
      });
    }

    // Verify enrollment
    const course = await Course.findById(courseId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    if (!course || !course.studentsEnrolled.includes(userObjectId)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to perform this action",
      });
    }

    // Delete lesson completion record
    const result = await LessonCompletion.findOneAndDelete({
      studentId: userObjectId,
      courseId: new mongoose.Types.ObjectId(courseId),
      subSectionId: new mongoose.Types.ObjectId(subSectionId),
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Completion record not found",
      });
    }

    // Calculate updated progress
    const progress = await exports.calculateCourseProgress(userId, courseId);

    return res.status(200).json({
      success: true,
      message: "Lesson marked as incomplete",
      progress,
    });
  } catch (error) {
    console.error("Error marking lesson incomplete:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
