const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require("../utils/mailSend");

exports.sendOtp = async(req , res) => {
    try{
        const {email} = req.body;
        const userExists = await User.findOne({email: email});
        if(userExists){
            return res.json({
                success: false,
                message: "User Already Exists"
            })
        }

        // generate otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const result = await OTP.findOne({otp});
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp : otp});
        }
        const newOTP = new OTP({
            otp: otp,
            email: email
        });
        const newotp = await newOTP.save();
        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp: newotp.otp
        })

    }catch(e){
        console.error(e);
        res.status(500).json({
            success: false,
            message : "Something went wrong Please try again",
            error: e.message
        })
    }
}

exports.signUp = async (req , res) => {
    try{
        const { firstName, lastname, email, password , confirmPassword , accountType , otp} = req.body;

        if(!firstName || !lastname || !email || !password || !accountType || !confirmPassword || !otp){
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`
            })
        }

        const userExists = await User.findOne({email: email});
        if(userExists){
            return res.json({
                success: false,
                message: "User Already Exists"
            })
        }

        if(password != confirmPassword){
            return res.json({
                success: false,
                message: "Password and Confirm Password Does not Match"
            })
        } 

        const currOtp = await OTP.findOne({email: email}).sort({createdAt: -1}).limit(1);
        if(!currOtp){
            return res.status(400).json({
                success: false,
                message: "OTP Not Found"
            })
        }
        if(otp !== currOtp.otp){
            return res.status(400).json({
                success: false,
                message: "The OTP is not matching"
            })
        }

        const hashPassword = await bcrypt.hash(password , 10);

        const profile = await Profile.create({
            gender : null , 
            dateOfBirth : null , 
            about : null, 
            contactNumber : null , 
        })


        const user = await User.create({
            firstName: firstName,
            lastName: lastname,
            email: email,
            password:  hashPassword,
            accountType: accountType,
            additionalDetails: profile._id,
            approved: false,
            verified: false,
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}&seed=${lastname}`
        })

        res.status(200).json({
            success: true,
            message: "User Created Successfully"

        })
       
    }catch(e){
        res.status(500).json({
            success: false,
            message: e.message, 
        })
    }
}

exports.login = async (req , res) => {
    try{    
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`
            })
        }
        const user = await User.findOne({email: email}).populate("additionalDetails");
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }

        //password matching
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                accountType: user.accountType, 
                email : user.email,
                id : user._id
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "48h"
            })
            user.token = token;
            user.password = undefined;
            const option = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true ,
                secure : process.env.NODE_ENV === "production" , 
                // sameSite : "None",
            }
            res.cookie("token", token , option);
            res.status(200).json({
                success: true,
                message: "User Login Success",
                user: user , 
                token : token
            })
        }
    }catch(e){
        res.status(500).json({
            success: false,
            error : e.message,
            message: "Error occurred while logging in" 
        })
    }
}


exports.changePassword = async function(req, res){
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }
        const {oldPassword , newPassword ,  confirmNewPassword} = req.body;
        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`
            });
        }
    
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: "New Password and Confirm New Password Does not Match"
            });
        }

        const isMatch = bcrypt.compare(newPassword, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Old Password Does not Match"
            });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password =  hashPassword;
        await user.save()
        try{
            await mailSender(user.email , "Password Changed", passwordUpdated(user.email , user.firstName))
        }catch(e){
            res.status(400).json({
                success: false,
                error: e.message , 
                message : "Error occurred while mail sending email"
            })
        }
        
        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully"
        });
    } catch(e){
        res.status(500).json({
            success: false,
            error: e.message , 
            message : "Error occure while changing password"
        });
    }
};
