const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { cloudinaryImageUploader } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, hours, minutes, description, courseId } =
      req.body;
    const video = req.files.video;
    console.log(video);
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
    const {courseId , title, hours , minutes , description, subSectionId } = req.body;
    const video = req.files?.video;
    // console.log(req.video)
    if (!courseId || !title || !hours || !minutes || !description  || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let uplodedvideo;
    if(video !== undefined){
        uplodedvideo = await cloudinaryImageUploader(
            video,
            process.env.FOLDER_NAME
          );
          uplodedvideo = uplodedvideo.url;
    }else{
        if(!req.body.video){
            return res.status(401).json({
                success: false,
                message: "Video is required",
            })
        }else{
            uplodedvideo = req.body.video  
        }
    }
     
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title: title,
        minutes: minutes, 
        hours : hours , 
        description: description,
        videoUrl: uplodedvideo,
      } , 
      {new : true}
    );
    console.log(updatedSubSection)
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
      updatedCourse
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
    console.log(subSectionId)
    const { courseId } = req.body;
    const deletedSection = await SubSection.findByIdAndDelete(subSectionId);
    const updateSecton = await Section.updateMany(
      { subSection: subSectionId },
      { $pull: { subSection : subSectionId } }
    );
    console.log(updateSecton)
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
      updatedCourse
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error deleting Subsection",
      error: e.message,
    });
  }
};

exports.markedSubSection = async function (req , res) {
    try{
        const {subSectionId} = req.params;
        if(!subSectionId) return res.status(501).json({
          success : false , 
          message : "Please Give All The Fields !!!"
        })
        let subsection = await SubSection.findByIdAndUpdate(subSectionId , {watched : true});
        
        if(!subSectionId) return res.status(401).json({
          success : false , 
          message : "SubSection Not Found!!!"
        })
        
        return res.status(201).json({
          success : true , 
          message : "Successfully Marked" , 
        })
        
    }catch(e){
        return res.status(501).json({
          success : false , 
          error : e , 
          message : "Internal Server Error "
        })
    }
}
