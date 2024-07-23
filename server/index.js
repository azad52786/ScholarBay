const express = require("express");
const app = express();
require("dotenv").config();

const { connect } = require("../server/config/database");
const cors = require('cors')
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const courseRoutes = require('../server/router/Course.router');
const paymentRoutes = require('../server/router/Payment.router');
const userRoutes = require('../server/router/User.router');
const profileRoutes = require('../server/router/Profile.router');
const SendMailRouter = require('../server/router/SendMail.router');
const { cloudinaryConnect } = require("./config/cloudinary");


connect();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    // , "credentials" refers to the inclusion of user credentials such as cookies, HTTP authentication, 
    //and client-side SSL certificates when making cross-origin requests.
    credentials: true,
}))

app.use(fileUpload({
    useTempFiles : true , 
    tempFileDir : '/tmp/'  , 
}))

const PORT = process.env.PORT || 4000;

app.use("/api/v1/course/" , courseRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/mail" , SendMailRouter);

app.get('/' , (req , res) => {
    res.json({
        success : true , 
        message : "your surver is running........" 
    })
})

app.listen(PORT ,  () => {
    console.log(`your app is running on port : ${PORT}`)
})

