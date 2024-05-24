const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { cloudinaryImageUploader } = require("../utils/imageUploader");

exports.createSubSection = async(req, res) => {
    try{
        const {sectionId , title , timeDuration , description} = req.body;
        const video = req.files.video;
        console.log(video)
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const uplodedvideo = await cloudinaryImageUploader(video , process.env.FOLDER_NAME);
        const newSubsection = await SubSection.create(
            {
                title : title,
                timeDuration : timeDuration,
                description : description,
                videoUrl : uplodedvideo.url
            }
        )
        const updatedSection = await Section.findByIdAndUpdate(
            {_id : sectionId} , 
            {
                $push : {
                    "subSection" : newSubsection._id , 
                }
            } , 
            {new : true}
        ).populate("subSection").exec();

        return res.status(200).json({
            success: true,
            message: "Subsection Created Successfully",
            subSection: newSubsection , 
            section : updatedSection 
        })
    }catch(e){
        res.status(500).json({
            success: false,
            message : "Error while creating Subsection " , 
            error: e.message,
        })
    }
}

exports.updateSubsection = async function(req, res) {
    try{
        const { title , timeDuration , description , subSectionId} = req.body; 
        const video = req.files.videoFile;
        if(!title || !timeDuration || !description || !video || !subSectionId){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const uplodedvideo = await cloudinaryImageUploader(video , process.env.FOLDER_NAME);
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            {_id : subSectionId} , 
            {
                title : title,
                timeDuration : timeDuration,
                description : description,
                videoUrl : uplodedvideo.url
            }
        )
        return res.status(200).json({
          success: true,
          message: "SubSection Updated Successfully",
          updatedSubSection
        })
      }catch(e){
        res.status(500).json({
          success: false,
          message: "Error updating subsection",
          error: e.message,
        })
    }
}


exports.deleteSubsection = async function(req, res) {
    try {
        const {subSectionId} = req.params;
        const deletedSection = await Section.findByIdAndDelete(subSectionId);
        const updateSecton = await Section.updateMany(
          {"subSection" : subSectionId} , 
          {$pull : {"subSection" : subSectionId}}
        )
        res.status(200).send({
          success: true,
          message: "SubSection Deleted Successfully"
        })
      }catch(e){
       res.status(500).json({
          success: false,
          message: "Error deleting Subsection",
          error: e.message,
        })
    }
}