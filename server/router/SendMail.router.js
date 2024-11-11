const express = require('express');
const { auth } = require('../middlewares/auth.middleware');
const mailSender = require('../utils/mailSend');
const router = express.Router();

router.post("/sendMailForContactUs" , auth ,  async (req, res) => {
    try{
        const {firstName , message , email , phoneNo , lastName } = req.body;
        if(!firstName || !message || !email || !phoneNo || !lastName){
            return res.status(400).json({
                success: false,
                message: "Please Fill up All the Required Fields"
            })
        }
        
        const SendMailToOwner = await mailSender("kajiazadali76@gmail.com", `Suggestions from ${firstName} ${lastName}` , `${message}`);
        const SendMailToStudent = await mailSender(email, "Successfully sent your contact us message to sholarBay" , "Your mail is successfully sent");
        
        return res.status(200).json({
            success: true,
            message: "Mail Sent Successfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : e.message
        })
    }
});


module.exports = router;