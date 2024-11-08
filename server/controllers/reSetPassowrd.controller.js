const User = require("../models/User");
const mailSender = require("../utils/mailSend");
const bcrypt = require('bcryptjs');
exports.sendResetPasswordLink = async(req , res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        const token = crypto.randomUUID().toString();
        const url = `http://localhost:3000/UpdatePassword/${token}`
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 5 * 60 * 1000;
        await user.save();

        await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )
        return res.status(200).json({
            success: true,
            message: "Reset Password Link Sent"
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            message: "Error occurred while Updating Password",
            error: e.message
        })
    }
}

exports.resetPassword = async(req , res) => {
    try{
        const { password  , confirmPassword  , token } = req.body;
        if(!password || !confirmPassword){
            return res.json({
                success: false,
                message: "Password and Confirm Password are required"
            })
        }
        if(password !== confirmPassword){
            return res.json({
                success: false,
                message: "Password and Confirm Password Does not Match",
            });
        }
        const user = await User.findOne({resetPasswordToken: token});
        if(!user){
            return res.json({
                success: false,
                message: "Token is Invalid",
            });
        }
        if(user.resetPasswordExpires < Date.now()){
            res.status(403).json({
                success: false,
                message: `Token is Expired, Please Regenerate Your Token`,
            })
        }

        const hashPassword = await bcrypt.hash(password , 10);
        user.password =  hashPassword;
        user.resetPasswordToken = "";
        user.resetPasswordExpires = "";
        await user.save();
        res.json({
            success: true,
            message: `Password Reset Successful`,
        })
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Error occurred while Updating Password",
            error: e.message
        })
    }
}