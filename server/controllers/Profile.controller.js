const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { cloudinaryImageUploader } = require("../utils/imageUploader");
const bcrypt = require('bcrypt');

exports.updateProfile = async(req , res) => {
    try{
        const {contactNumber , about="" , dateOfBirth="" , gender , password , confirmPassword} = req.body;
        const user_id = req.user.id;
        if(!contactNumber || !gender || !user_id || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if(password !== password) {
           return res.status(400).json({
                success: false,
                message: "Password and Confirm Password Does not Match"
            })
        }
        let userDetails = await User.findById(user_id);
        if(await bcrypt.compare(password , userDetails.password) === true) {
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
        }else{
          return res.status(400).json({
              success: false,
              message: "Password Does not Match"
          })
        }
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
		.exec();
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
  const monthMap = new Map([
    [0, 'January'],
    [1, 'February'],
    [2, 'March'],
    [3, 'April'],
    [4, 'May'],
    [5, 'June'],
    [6, 'July'],
    [7, 'August'],
    [8, 'September'],
    [9, 'October'],
    [10, 'November'],
    [11, 'December']
]);
    try {
      const userId = req.user.id
      const userDetails = await User.findOne(
      {
        _id: userId,
      } , 
      {
        courses : 1 , 
      }
      )
        .populate({
          path : "courses" , 
          populate : [
            {
                path: 'tag',
                model: 'Tag'
            }, 
            {
                path : "courseContent" , 
                model : "Section" , 
                populate : {
                  path : "subSection" , 
                  model : "SubSection"
                }
            }
          ] , 
        })
        .exec();
        // console.log(userDetails)
        
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      const courses = [
        ...userDetails.courses
      ]
      
      
      const myCourses = courses.map((course) => {
        const date = new Date(course.createdAt);
        // if(course.createdAt) console.log(date)
          return {
            ...course.toObject() , 
            createdData : {
              year: date.getFullYear(),
              month: monthMap.get(date.getMonth()),
              date: date.getDate(),
              minute: date.getMinutes(),
              hour: date.getHours()
            }
           
          }
          // course.createdTime = {
            
          // }
          // console.log(course.createdTime)
      })
      
      console.log(myCourses)
      return res.status(200).json({
        success: true,
        courses : myCourses
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
  