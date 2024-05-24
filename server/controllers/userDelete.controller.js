const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.deleteUser = async function(req , res){
    try{
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }
        await Course.updateMany(
            { "studentsEnrolled": user_id },
            { $pull: { "studentsEnrolled": user_id } }
        );
        const userDetails = await User.findById(user_id);
        const userAddtionalDetails = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(userAddtionalDetails);
        await User.findByIdAndDelete(user_id);
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        });
    }catch(e){
        res.status(404).json(
            {
                success: false,
                message: "Error while deleting user" , 
                error: e.message,
            }
        )
    }
}