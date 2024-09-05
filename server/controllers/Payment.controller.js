const { default: mongoose } = require('mongoose');
const { instance }  = require('../config/razorpay');
const { courseEnrollmentEmail } = require('../mails/courseEnrollmentEmail');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSend');
const { createHmac } = require('node:crypto');
const { paymentSuccessEmail } = require('../mails/paymentSuccessEmail');

exports.verifySignature = async(req , res) => {
    try{
        let { razorpay_payment_id , razorpay_order_id , razorpay_signature , courses } = req.body;
        const userId = req.user.id;
        
        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId ){
            return res.status(401).json({
                success : false , 
                message : "Payment Verification All fields required"
            })
        }
        
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        
        let generated_signature = createHmac("sha256" , process.env.RAZORPAY_SECRET).update(body.toString()).digest('hex');
        
        if(generated_signature === razorpay_signature){
            // payment successful lets give him/her course
            await enrollStudents(res , courses , userId);
        }
        return res.status(501).json({
            success : false , 
            message : "Signature not match Verification failed!!!" 
        })
    }catch(e){
        return res.status(401).json({
            success : false , 
            error : e , 
            message : "Verification internal error!!!" 
        })
    }
}

const enrollStudents = async(res , courses , userId) => {
    try{
        if(!courses || courses.length <= 0 || !userId){
            return res.status(401).json({
                success : false , 
                message : "Please Courses Data of Enroll Course or Provide Data for userId"
            })
        }
        
        for(let courseId of courses){
            try{
                let enrollCourse = await Course.findOneAndUpdate(
                    {_id : courseId} , 
                    { $push : {studentsEnrolled : userId}} , 
                    {new : true}
                );
                
                if(!enrollCourse){
                    return res.status(401).json({
                        success : false , 
                        message : "CourseEnrollment Failed!!!!"
                    })
                }
                
                let enrollStudent = await User.findOneAndUpdate(
                    {_id : userId} , 
                    { $push : {courseProgress : courseId}} , 
                    {new : true}
                );
                if(!enrollStudent){
                    return res.status(401).json({
                        success : false , 
                        message : "Student Enrollment Failed!!!!"
                    })
                }
                
                const emailResponce = await mailSender(enrollStudent.email , `Successfully enrolled ${enrollCourse.courseName}` , courseEnrollmentEmail(enrollCourse.courseName , enrollStudent.firstName));
            }catch(e){
                return res.status(401).json({
                    success : false , 
                    error : e , 
                    message : "Enrolled Course Failed!!!!"
                })
            }
            
        }
    }catch(e){
        return res.status(401).json({
            success : false , 
            error : e , 
            message : "Enrolled Course Failed!!!!"
        })
    }
}

exports.createOrder = async (req , res) => {
    try{
        console.log("create order called")
        const userId = req.user.id;
        console.log(req.body)
        const { courses } = req.body;
        console.log("len" , courses)
        if(!courses || courses.length === 0){
            return res.status(501).json({
                success : false , 
                message : "No Courses is Selected!!!" , 
            })
        }
        let totalPrice = 0;
        let uuid = new mongoose.Types.ObjectId(userId)
        for(let course of courses){
            try{
                let courseDetails = await Course.findById(course);
                if(!courseDetails){
                    return  res.status(404).send({
                        success: false,
                        message: "Course Not Found"
                    })
                }
                
                if(courseDetails.studentsEnrolled.includes(uuid)){
                    return res.status(444).json({
                        success : false , 
                        message : "User already Enrolled!!!"
                    })
                }
                totalPrice += courseDetails.price;
            }catch(e){
                return res.status("501").json({
                    success : false , 
                    error : e.message , 
                    message : "Error Occure while validateing the course"
                })
            }   
        }
        let options = {
            "amount": totalPrice * 100,
            "currency": "INR",
            "receipt": Date.now()
        }
        
        try{
            let OrderDetails = await instance.orders.create(options);
            console.log("order" , OrderDetails)
            return res.status(201).json({
                success : true , 
                OrderDetails ,
            })
        }catch(e){
            return res.status(501).json({
                success : false , 
                error : e, 
                message : "Error Occur while createing Order" , 
            })
        }
    }catch(e){
        return res.status(501).json({
            success : false , 
            error : e.message , 
            message : "internal error!!!" , 
        });
    }
}

exports.sendPaymentSuccessEmail = async(req , res) => {
    try{
        const { orderId , paymentId , amount , email } = req.body;
        const userId = req.user.id;
        if(!userId || !orderId || !paymentId || !amount ){
            return res.status(401).json({
                success: false, 
                message: "all fields are required"
            })
        }
        
        const userDetails = await User.findById(userId);
        await mailSender(userDetails.email , "Payment Successful Mailing", paymentSuccessEmail(`${userDetails.firstName + " " + userDetails.lastName }`, amount / 100 , orderId , paymentId));
        
        return res.status(200).json({
            success : true , 
            message : "Payment successful mail send successfully"
        })
        
    }catch(e){
        res.status(501).json({
            success : false , 
            error : e , 
            message : "Payment successful mail send fail" , 
        })
    }
}