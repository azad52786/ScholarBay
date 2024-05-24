const { instance }  = require('../config/razorpay');
const { courseEnrollmentEmail } = require('../mails/courseEnrollmentEmail');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSend');

exports.createOrder = async (req, res) => {
    try {
        const { courseId } = req.body;
        if(!courseId){
            return  res.status(404).send({
                success: false,
                message: "courseId is required"
            })
        }
        const user_id = req.user.id;
        
        let course;
        try{
            course = await Course.findById(courseId);
            if(!course){
                return  res.status(404).send({
                    success: false,
                    message: "Course Not Found"
                })
            }
            const uuid = new mongoose.Types.ObjectId(user_id);
            
            if(course.studentsEnrolled.includes(uuid)){
                return res.status(401).send({
                    success : false , 
                    message : "user already exists in this course(Already enrolled)"
                })
            }
        }catch(e){
            console.log(e);
            return res.status(404).send({
                success: false,
                message: e.message, 
            })
        }
        const amount = course.price;
        const currency = "INR";
        const option = {
            amount: amount * 100,
            currency: currency,
            receipt: Math.round(Date.now()).toString(),
            notes : {
                courseId : courseId , 
                user_id  : user_id
            }
        }
        
        try{    
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
        }catch(e){
            res.status(404).send({
                success: false,
                error: e.message, 
                message : "Error creating order"
            })
        }
        
        return res.status(200).send({
            success: true,
            message: "Order Created Successfully",
            courseName : course.courseName, 
            courseDescription : course.courseDescription , 
            thumbnailUrl : course.thumbnail , 
            amount : paymentResponse.amount , 
            currency : paymentResponse.currency , 
            order_id : paymentResponse.id
            
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


exports.verifySignature = async (req, res) => {
    try{
        const webhooksecret = "123456";
        const signature = req.headers["x-razorpay-signature"];
        const shasum = crypto.createHmac('sha256', webhooksecret); // Creating a HMAC digest using SHA-256 algorithm and webhookSecret
        shasum.update(JSON.stringify(req.body)); // Updating the HMAC digest with the request body
        const digest = shasum.digest('hex'); // Calculating the HMAC digest and converting it to hexadecimal string
        
        if(signature === digest){
            // two signatures are matched 
            console.log("payment is authenticated");
            const {courseId , user_id} = req.body.payload.payment.entity.notes;
            
            try{
                const courseEnrollment = await Course.findByIdAndUpdate(
                    {_id : courseId} , 
                    {
                        $push : {"studentsEnrolled" : user_id}
                    } , 
                    {new : true}
                );
                if(!courseEnrollment){
                    return res.status(404).send({
                        success: false,
                        message: "Course Not Found"
                    })
                }
                console.log(courseEnrollment);
                
                const userEnrollment = await User.findByIdAndUpdate(
                    {_id : user_id} , 
                    {
                        $push : {coursesEnrolled : courseId}
                    } , 
                    {new : true}
                )
                console.log(userEnrollment);
                
                const mailBody = courseEnrollmentEmail(courseEnrollment.courseName, userEnrollment.firstName);
                
                const emailResponse = await mailSender(userEnrollment.email, 
                                                        "Congratulations bro you are successfully enrolled in the course", 
                                                         mailBody);
                console.log(emailResponse);
                
                return res.status(200).send({
                    success: true,
                    message: " signature varified and Payment Successful"
                })
                
            }catch(e){
                return res.status(500).send({
                    success: false,
                    message: e.message
                })
            }
        }else{
            return res.status(401).send({
                success: false,
                message: "signature not matched"
            })
        }
    }catch(e){
        return res.status(500).send({
            success: false,
            message: e.message
        })
    }
}