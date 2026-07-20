const nodemailer = require("nodemailer");

const mailSender = async (email, title, body, attachmentBuffer = null, attachmentName = null) => {
    let transporter = nodemailer.createTransport({
        host : process.env.MAIL_HOST, 
        port: parseInt(process.env.MAIL_PORT),
        auth : {
            user : process.env.MAIL_USER,
            pass :  process.env.MAIL_PASS,
        }
    })

    try{
        const mailOptions = {
            from : "kaji Azad Ali",
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        };

        // Add attachment if provided
        if (attachmentBuffer && attachmentName) {
            mailOptions.attachments = [
                {
                    filename: attachmentName,
                    content: attachmentBuffer,
                    contentType: 'application/pdf'
                }
            ];
        }

        let message = await transporter.sendMail(mailOptions);
        return message;
    }catch(e){
        console.log(e.message);
        throw e;
    }
}

module.exports = mailSender;
