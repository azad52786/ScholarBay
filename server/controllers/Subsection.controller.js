const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Certificate = require("../models/Certificate");
const User = require("../models/User");
const { cloudinaryImageUploader } = require("../utils/imageUploader");

const CONTENT_TYPES = ["VIDEO", "TEXT_NOTE", "QUIZ_ASSESSMENT"];

const normalizeContentType = (contentType) => {
  if (CONTENT_TYPES.includes(contentType)) {
    return contentType;
  }

  return "VIDEO";
};

const parseQuizData = (quizData) => {
  if (!quizData) {
    return [];
  }

  if (Array.isArray(quizData)) {
    return quizData;
  }

  if (typeof quizData === "string") {
    try {
      const parsedQuiz = JSON.parse(quizData);
      return Array.isArray(parsedQuiz) ? parsedQuiz : [];
    } catch (error) {
      return [];
    }
  }

  return [];
};

const buildSubSectionPayload = (body, videoUpload, existingSubSection = null) => {
  const contentType = normalizeContentType(body.contentType || existingSubSection?.contentType);
  const quizData = parseQuizData(body.quizData);
  const payload = {
    title: body.title,
    hours: body.hours,
    minutes: body.minutes,
    description: body.description,
    contentType,
    markdownContent: body.markdownContent,
    quizData,
    videoMeta: body.videoMeta ? body.videoMeta : existingSubSection?.videoMeta,
  };

  if (contentType === "VIDEO") {
    payload.videoUrl = videoUpload || body.video || existingSubSection?.videoUrl;
    payload.videoMeta = videoUpload
      ? {
        provider: "cloudinary",
        publicId: videoUpload.public_id,
        secureUrl: videoUpload.secure_url,
      }
      : existingSubSection?.videoMeta;
    payload.markdownContent = undefined;
    payload.quizData = [];
  }

  if (contentType === "TEXT_NOTE") {
    payload.videoUrl = undefined;
    payload.quizData = [];
    payload.hours = undefined;
    payload.minutes = undefined;
  }

  if (contentType === "QUIZ_ASSESSMENT") {
    payload.videoUrl = undefined;
    payload.markdownContent = undefined;
    payload.hours = undefined;
    payload.minutes = undefined;
  }

  return payload;
};

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, hours, minutes, description, courseId } =
      req.body;
    const video = req.files?.video;
    const contentType = normalizeContentType(req.body.contentType);
    const quizData = parseQuizData(req.body.quizData);
    if (
      !sectionId ||
      !title ||
      (contentType === "VIDEO" && (!hours || !minutes || !description || !video)) ||
      (contentType === "TEXT_NOTE" && !req.body.markdownContent) ||
      (contentType === "QUIZ_ASSESSMENT" && quizData.length === 0) ||
      !courseId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let uplodedvideo;
    if (contentType === "VIDEO") {
      uplodedvideo = await cloudinaryImageUploader(
        video,
        process.env.FOLDER_NAME
      );
    }

    const newSubsection = await SubSection.create({
      title: title,
      hours: contentType === "VIDEO" ? hours : undefined,
      minutes: contentType === "VIDEO" ? minutes : undefined,
      description: description,
      contentType,
      videoUrl: contentType === "VIDEO" ? uplodedvideo.url : undefined,
      videoMeta:
        contentType === "VIDEO"
          ? {
            provider: "cloudinary",
            publicId: uplodedvideo.public_id,
            secureUrl: uplodedvideo.secure_url,
          }
          : undefined,
      markdownContent:
        contentType === "TEXT_NOTE" ? req.body.markdownContent : undefined,
      quizData: contentType === "QUIZ_ASSESSMENT" ? quizData : [],
    });
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: newSubsection._id,
        },
      },
      { new: true }
    )
      .populate("subSection")
      .exec();
    const updatedCourse = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });
    return res.status(200).json({
      success: true,
      message: "Subsection Created Successfully",
      subSection: newSubsection,
      section: updatedSection,
      updatedCourse,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error while creating Subsection ",
      error: e.message,
    });
  }
};

exports.updateSubsection = async function (req, res) {
  try {
    const { courseId, title, hours, minutes, description, subSectionId } =
      req.body;
    const video = req.files?.video;
    const contentType = normalizeContentType(req.body.contentType);
    const quizData = parseQuizData(req.body.quizData);
    if (
      !courseId ||
      !title ||
      (contentType === "VIDEO" && (!hours || !minutes || !description)) ||
      (contentType === "TEXT_NOTE" && !req.body.markdownContent) ||
      (contentType === "QUIZ_ASSESSMENT" && quizData.length === 0) ||
      !subSectionId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let uplodedvideo;
    if (contentType === "VIDEO") {
      if (video !== undefined) {
        uplodedvideo = await cloudinaryImageUploader(
          video,
          process.env.FOLDER_NAME
        );
        uplodedvideo = uplodedvideo.url;
      } else if (req.body.video) {
        uplodedvideo = req.body.video;
      }
    }

    const existingSubSection = await SubSection.findById(subSectionId);
    if (!existingSubSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    const payload = buildSubSectionPayload(
      req.body,
      uplodedvideo,
      existingSubSection
    );

    const UNSET_BY_TYPE = {
      VIDEO: ["markdownContent", "quizData"],
      TEXT_NOTE: ["videoUrl", "videoMeta", "quizData", "hours", "minutes"],
      QUIZ_ASSESSMENT: ["videoUrl", "videoMeta", "markdownContent", "hours", "minutes"],
    };

    // Filter out any field already present in $set (payload)
    // MongoDB throws a conflict error if the same path appears in both $set and $unset
    const fieldsToUnset = (UNSET_BY_TYPE[payload.contentType] || [])
      .filter((field) => !(field in payload))
      .reduce((acc, field) => ({ ...acc, [field]: "" }), {});

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        $set: payload,
        ...(Object.keys(fieldsToUnset).length > 0 ? { $unset: fieldsToUnset } : {}),
      },
      { new: true }
    );
    const updatedCourse = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "SubSection Updated Successfully",
      updatedSubSection,
      updatedCourse,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error updating subsection",
      error: e.message,
    });
  }
};

exports.deleteSubsection = async function (req, res) {
  try {
    const { subSectionId } = req.params;
    const { courseId } = req.body;
    const deletedSection = await SubSection.findByIdAndDelete(subSectionId);
    const updateSecton = await Section.updateMany(
      { subSection: subSectionId },
      { $pull: { subSection: subSectionId } }
    );
    const updatedCourse = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });
    return res.status(200).send({
      success: true,
      message: "SubSection Deleted Successfully",
      updatedCourse,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error deleting Subsection",
      error: e.message,
    });
  }
};

exports.markedSubSection = async function (req, res) {
  try {
    let userId = req.user.id;
    const { subSectionId } = req.params;
    const { courseId } = req.query;
    
    if (!subSectionId || !userId || !courseId)
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });

    let userObjectId = new mongoose.Types.ObjectId(userId);
    let courseObjectId = new mongoose.Types.ObjectId(courseId);

    // Verify course exists
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Verify student is enrolled
    if (!course.studentsEnrolled.includes(userObjectId)) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // Update SubSection watched status
    let subsection = await SubSection.findByIdAndUpdate(subSectionId, {
      watched: true,
    });

    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Use the new LessonCompletion model for tracking
    const LessonCompletion = require("../models/LessonCompletion");
    const lessonCompletion = await LessonCompletion.findOneAndUpdate(
      {
        studentId: userObjectId,
        courseId: courseObjectId,
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

    // For backward compatibility, also update CourseProgress
    const CourseProgress = require("../models/CourseProgress");
    await CourseProgress.findOneAndUpdate(
      { userId: userObjectId, courseId: courseObjectId },
      {
        $addToSet: {
          completedVideos: new mongoose.Types.ObjectId(subSectionId),
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Lesson marked as completed successfully.",
      data: lessonCompletion,
    });
  } catch (e) {
    console.error("Error in markedSubSection:", e);
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.getwatchedSubSection = async (req, res) => {
  try {
    let userId = req.user.id;
    let { courseId } = req.query;
    console.log(userId, courseId);
    if (!userId || !courseId) {
      return res.status(501).json({
        success: false,
        message: "Please Give All The Fields!!",
      });
    }
    let courseObjectId = new mongoose.Types.ObjectId(courseId);
    let userObjectId = new mongoose.Types.ObjectId(userId);

    let progress = await CourseProgress.findOne({ courseId: courseObjectId, userId: userObjectId });
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress record not found for the given user and course.",
      });
    }
    res.status(200).json({
      success: true,
      message: "This is your progress record",
      data: progress.completedVideos,
    });

  } catch (e) {
    console.log(e);
    return res.status(501).json({
      success: false,
      error: e.message,
      message: "Internal Server Error "
    })
  }
}
