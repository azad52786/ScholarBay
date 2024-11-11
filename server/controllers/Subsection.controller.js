const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { cloudinaryImageUploader } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, hours, minutes, description, courseId } =
      req.body;
    const video = req.files.video;
    if (
      !sectionId ||
      !title ||
      !hours ||
      !minutes ||
      !description ||
      !video ||
      !courseId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const uplodedvideo = await cloudinaryImageUploader(
      video,
      process.env.FOLDER_NAME
    );
    const newSubsection = await SubSection.create({
      title: title,
      hours: hours,
      minutes: minutes,
      description: description,
      videoUrl: uplodedvideo.url,
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
    if (
      !courseId ||
      !title ||
      !hours ||
      !minutes ||
      !description ||
      !subSectionId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let uplodedvideo;
    if (video !== undefined) {
      uplodedvideo = await cloudinaryImageUploader(
        video,
        process.env.FOLDER_NAME
      );
      uplodedvideo = uplodedvideo.url;
    } else {
      if (!req.body.video) {
        return res.status(401).json({
          success: false,
          message: "Video is required",
        });
      } else {
        uplodedvideo = req.body.video;
      }
    }

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title: title,
        minutes: minutes,
        hours: hours,
        description: description,
        videoUrl: uplodedvideo,
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
      return res.status(501).json({
        success: false,
        message: "Please Give All The Fields !!!",
      });
    let subsection = await SubSection.findByIdAndUpdate(subSectionId, {
      watched: true,
    });

    if (!subSectionId)
      return res.status(401).json({
        success: false,
        message: "SubSection Not Found!!!",
      });

    let userObjectId = new mongoose.Types.ObjectId(userId);
    let courseObjectId = new mongoose.Types.ObjectId(courseId);

    let course = await Course.findById(courseId);

    if (course.studentsEnrolled.includes(userObjectId)) {
      let updatedProgress = await CourseProgress.findOneAndUpdate(
        { userId : userObjectId , courseId : courseObjectId},
        {
          $push: {
            completedVideos: new mongoose.Types.ObjectId(subSectionId),
          },
        },
        {
          new: true,
        }
      );
      if (updatedProgress) {
    res.status(200).json({
      success: true,
      message: "Video marked as completed successfully.",
      data: updatedProgress.completedVideos,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Progress record not found for the given user and course.",
    });
  }
    } else {
      return res.status(401).json({
        success: false,
        message: "You are not Enrolled in this Course",
      });
    }
  } catch (e) {
    return res.status(501).json({
      success: false,
      error: e.message,
      message: "Internal Server Error ",
    });
  }
};


exports.getwatchedSubSection = async (req , res) => {
  try{
    let userId = req.user.id;
    let { courseId } = req.query;
    console.log(userId , courseId);
    if(!userId || !courseId){
      return res.status(501).json({
        success: false,
        message: "Please Give All The Fields!!",
      });
    }
    let courseObjectId = new mongoose.Types.ObjectId(courseId);
    let userObjectId = new mongoose.Types.ObjectId(userId);
    
    let progress = await CourseProgress.findOne({ courseId: courseObjectId , userId: userObjectId });
    if(!progress){
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
    
  }catch(e){
    console.log(e);
    return res.status(501).json({
      success : false , 
      error : e.message , 
      message : "Internal Server Error "
    })
  }
}