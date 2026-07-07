const mongoose = require("mongoose");
const Certificate = require("../models/Certificate");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSend");
const { generateCertificatePDF } = require("../utils/certificateGenerator");
const ProgressController = require("./Progress.controller");
const path = require("path");
const fs = require("fs");

/**
 * Check certificate eligibility for a student
 * Conditions:
 * 1. Progress must be exactly 100%
 * 2. Certificate must be published by teacher
 */
exports.checkEligibility = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    // Get progress
    const progress = await ProgressController.calculateCourseProgress(
      userId,
      courseId
    );

    // Get course info
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check both conditions
    const isEligible =
      progress.progressPercentage === 100 && course.certificatePublished;

    return res.status(200).json({
      success: true,
      eligible: isEligible,
      progress: progress.progressPercentage,
      certificatePublished: course.certificatePublished,
      reasons: {
        progressComplete: progress.progressPercentage === 100,
        certificatePublished: course.certificatePublished,
      },
    });
  } catch (error) {
    console.error("Error checking eligibility:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Generate certificate for an eligible student
 */
exports.generateCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    // Check eligibility
    const eligibility = await exports.checkEligibilityPrivate(userId, courseId);
    if (!eligibility.eligible) {
      return res.status(403).json({
        success: false,
        message: "You are not eligible to generate certificate",
        reasons: eligibility.reasons,
      });
    }

    // Get student and course info
    const student = await User.findById(userId);
    const course = await Course.findById(courseId).populate("instructor");

    if (!student || !course) {
      return res.status(404).json({
        success: false,
        message: "Student or course not found",
      });
    }

    // Check if certificate already exists
    let certificate = await Certificate.findOne({
      studentId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
    });

    if (!certificate) {
      certificate = new Certificate({
        studentId: new mongoose.Types.ObjectId(userId),
        courseId: new mongoose.Types.ObjectId(courseId),
        studentName: `${student.firstName} ${student.lastName}`,
        courseName: course.courseName,
        instructorName: course.instructor
          ? `${course.instructor.firstName} ${course.instructor.lastName}`
          : "ScholarBay Instructor",
        platformName: "ScholarBay",
        generatedAt: new Date(),
      });

      await certificate.save();
    }

    return res.status(200).json({
      success: true,
      message: "Certificate generated successfully",
      certificate,
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Download certificate as PDF
 */
exports.downloadCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    // Check eligibility
    const eligibility = await exports.checkEligibilityPrivate(userId, courseId);
    if (!eligibility.eligible) {
      return res.status(403).json({
        success: false,
        message: "You are not eligible to download certificate",
        reasons: eligibility.reasons,
      });
    }

    // Get certificate
    let certificate = await Certificate.findOne({
      studentId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
    });

    if (!certificate) {
      // Generate if doesn't exist
      const generated = await exports.generateCertificatePrivate(userId, courseId);
      if (!generated) {
        throw new Error("Failed to generate certificate record");
      }
      certificate = generated;
    }

    // Get logo path
    const logoPath = path.join(
      __dirname,
      "../../",
      "frontend",
      "learning-platfrom",
      "public",
      "Screenshot 2024-11-11 094719.png"
    );

    // Generate PDF
    const pdfBuffer = await generateCertificatePDF(
      {
        studentName: certificate.studentName,
        courseName: certificate.courseName,
        instructorName: certificate.instructorName,
        certificateId: certificate.certificateId,
        platformName: certificate.platformName,
        generatedAt: certificate.generatedAt,
      },
      fs.existsSync(logoPath) ? logoPath : null
    );

    // Send PDF as response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Certificate_${certificate.studentName.replace(
        /\s+/g,
        "_"
      )}_${Date.now()}.pdf"`
    );

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error downloading certificate:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Email certificate to student
 */
exports.emailCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    // Check eligibility
    const eligibility = await exports.checkEligibilityPrivate(userId, courseId);
    if (!eligibility.eligible) {
      return res.status(403).json({
        success: false,
        message: "You are not eligible to receive certificate",
        reasons: eligibility.reasons,
      });
    }

    // Get certificate
    let certificate = await Certificate.findOne({
      studentId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
    });

    if (!certificate) {
      const generated = await exports.generateCertificatePrivate(userId, courseId);
      if (!generated) {
        throw new Error("Failed to generate certificate record");
      }
      certificate = generated;
    }

    // Get student email
    const student = await User.findById(userId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Generate PDF
    const logoPath = path.join(
      __dirname,
      "../../",
      "frontend",
      "learning-platfrom",
      "public",
      "Screenshot 2024-11-11 094719.png"
    );

    const pdfBuffer = await generateCertificatePDF(
      {
        studentName: certificate.studentName,
        courseName: certificate.courseName,
        instructorName: certificate.instructorName,
        certificateId: certificate.certificateId,
        platformName: certificate.platformName,
        generatedAt: certificate.generatedAt,
      },
      fs.existsSync(logoPath) ? logoPath : null
    );

    // Email template
    const emailBody = `
      <p>Congratulations!</p>
      <p>You have successfully completed the course.</p>
      <p>Your completion certificate is attached to this email.</p>
      <p>Thank you for learning with us.</p>
    `;

    // Send email with attachment
    await mailSender(
      student.email,
      "Congratulations! Your Course Completion Certificate",
      emailBody,
      pdfBuffer,
      `Certificate_${certificate.studentName.replace(/\s+/g, "_")}.pdf`
    );

    return res.status(200).json({
      success: true,
      message: "Certificate emailed successfully",
    });
  } catch (error) {
    console.error("Error emailing certificate:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Get student's certificate (if eligible)
 */
exports.getStudentCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    // Check eligibility
    const eligibility = await exports.checkEligibilityPrivate(userId, courseId);

    // Get certificate if exists
    const certificate = await Certificate.findOne({
      studentId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
    });

    return res.status(200).json({
      success: true,
      eligible: eligibility.eligible,
      certificate: certificate || null,
    });
  } catch (error) {
    console.error("Error getting certificate:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ============= PRIVATE HELPER FUNCTIONS =============

/**
 * Check eligibility (private helper)
 */
exports.checkEligibilityPrivate = async (userId, courseId) => {
  try {
    const progress = await ProgressController.calculateCourseProgress(
      userId,
      courseId
    );
    const course = await Course.findById(courseId);

    return {
      eligible:
        progress.progressPercentage === 100 && course.certificatePublished,
      reasons: {
        progressComplete: progress.progressPercentage === 100,
        certificatePublished: course.certificatePublished,
      },
    };
  } catch (error) {
    return {
      eligible: false,
      reasons: {
        progressComplete: false,
        certificatePublished: false,
      },
    };
  }
};

/**
 * Generate certificate (private helper)
 */
exports.generateCertificatePrivate = async (userId, courseId) => {
  try {
    const student = await User.findById(userId);
    const course = await Course.findById(courseId).populate("instructor");

    const certificate = new Certificate({
      studentId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
      studentName: student ? `${student.firstName} ${student.lastName}` : "ScholarBay Student",
      courseName: course ? course.courseName : "ScholarBay Course",
      instructorName: (course && course.instructor)
        ? `${course.instructor.firstName} ${course.instructor.lastName}`
        : "ScholarBay Instructor",
      platformName: "ScholarBay",
      generatedAt: new Date(),
    });

    return await certificate.save();
  } catch (error) {
    console.error("Error in private generate certificate:", error);
    return null;
  }
};

