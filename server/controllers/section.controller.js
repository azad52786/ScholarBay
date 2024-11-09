const Course = require("../models/Course");
const Section = require("../models/Section");

exports.createSection = async function(req , res) {
    try{
      const { sectionName , courseId } = req.body;
      if(!sectionName || !courseId){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
      }
      // const isPresent = await Section.findOne({sectionName : sectionName.trim()});
      // if(isPresent){
      //   return res.status(401).json({
      //     success : false  ,
      //     message : "Section is Already Created 🤔"
      //   })
      // }
      const section = await Section.create({
        sectionName : sectionName.trim()
      });
      const updatedCourse = await Course.findByIdAndUpdate(
        {_id : courseId} , 
        {
            $push : {
              "courseContent" : section._id
            }
        } , 
        {new : true}
      ).populate({
        path : "courseContent" , 
        populate : {
          path : "subSection"
        }
      });
      return res.status(200).json({
        success: true,
        message: "section Created Successfully",
        section : section , 
        updatedCourse 
      })
    }catch(e){
        res.status(500).json({
            success: false,
            message: e.message, 
        })
    }
}


exports.updateSection = async(req, res) => {
    try{
      const {newSectionName , sectionId} = req.body; 
      if(!newSectionName || !sectionId){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
      }
      const updateSection = await Section.findByIdAndUpdate(
        {_id : sectionId} , 
        {
          sectionName : newSectionName
        } , 
        {new : true}
      );

      return res.status(200).json({
        success: true,
        message: "Section Updated Successfully",
        updateSection
      })
    }catch(e){
      return res.status(500).json({
        success: false,
        message: "Error updating section",
        error: e.message,
      })
    }
}

exports.deleteSection = async(req, res) => {
    try {
      const { sectionId } = req.params;
      const deletedSection = await Section.findByIdAndDelete(sectionId);
      const updateCourse = await Course.findOneAndUpdate(
        {"courseContent" : { $in : sectionId}} , 
        {$pull : {"courseContent" : sectionId}}  , 
        { new: true } 
      ).populate({
        path : "courseContent" , 
        populate : {
          path : "subSection"
        }
      });
      res.status(200).send({
        success: true,
        message: "Section Deleted Successfully" , 
        updatedCourse : updateCourse
      })
    }catch(e){
     res.status(500).json({
        success: false,
        message: "Error deleting section",
        error: e.message,
      })
    }
}