const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    let transporter = nodemailer.createTransport({
        host : process.env.MAIL_HOST, 
        auth : {
            user : process.env.MAIL_USER,
            pass :  process.env.MAIL_PASS,
        }
    })

    try{
        let message = await transporter.sendMail({
            from : "kaji Azad Ali",
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        })
        return message;
    }catch(e){
        console.log(e.message);
    }
}

module.exports = mailSender;
