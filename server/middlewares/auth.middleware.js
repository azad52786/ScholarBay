const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    try{
        // const token = req.headers.token || req.cookies.token;
        // const token = JSON.parse(req.body.token)
        //  req.body.token || req.cookies.token;
        console.log(req.body.token);
        console.log(req.cookie?.token);
        console.log(req.header.Authorization);
        const token = req.body.token || req.cookie.token || req.header.Authorization.replace("Bearer " , "");

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token, authorization denied"
            });
        }
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(e){
        console.log(e);
        res.status(403).json({
            success: false,
            error: e.message, 
            message: "Error occurred while verifying token"
        })
    }
}

exports.isStudent = (req , res , next) => {
    try{
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();
    }catch(e){
        res.status(401).json({
            success: false,
            error : e.message , 
            message: "erorr occurred while checking is Student"
        })
    }
}
exports.isAdmin = (req , res , next) => {
    try{
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Admin only',
            });
        }
        next();
    }catch(e){
        res.status(401).json({
            success: false,
            message: "erorr occurred while checking is Admin"
        })
    }
}
exports.isInstructor = (req , res , next) => {
    try{
        if(req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for isInstructor only',
            });
        }
        next();
    }catch(e){
        res.status(401).json({
            success: false,
            message: "erorr occurred while checking is Instructor"
        })
    }
}