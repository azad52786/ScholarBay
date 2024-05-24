const Profile = require("../models/Profile");
const User = require("../models/User");
const { cloudinaryImageUploader } = require("../utils/imageUploader");

exports.updateProfile = async(req , res) => {
    try{
        const {contactNumber , about="" , dateOfBirth="" , gender} = req.body;
        const user_id = req.user.id;
        if(!contactNumber || !gender || !user_id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        let userDetails = await User.findById(user_id);
        const additionalDetails_id = userDetails.additionalDetails;
        const updatedAdditionalDetails = await Profile.findByIdAndUpdate(
            {_id : additionalDetails_id} , 
            {
                contactNumber : contactNumber,
                about : about,
                dateOfBirth : dateOfBirth,
                gender : gender
            } , 
            {new : true}
        )
        return res.status(200).json(
            {
                success: true,
                message: "Profile Updated Successfully"
            }
        )
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Error while updating profile" , 
            error: e.message,
        })
    }
}


exports.getUserDetails = async function(req, res) {
    try{
        const user_id = req.user.id;
        const userDetails = await User.findById(user_id)
        .populate("additionalDetails")
		.exec();;
        return res.status(200).json({
            success: true,
            message: "User Details Fetched Successfully", 
            userDetails: userDetails
        })
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Error while fetching user details" , 
            error: e.message,
        });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await cloudinaryImageUploader(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.status(200).json({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  