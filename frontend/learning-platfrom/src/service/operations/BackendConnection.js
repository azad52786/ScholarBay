import toast from "react-hot-toast"
import { setLoader, setToken } from "../../Store/Slices/AuthSlice"
import { AUTH_API, COURSE_API, PROFILE_API, SEND_MAIL } from "../Api"
import Apiconnection from "../Apiconnection"
import { setUser } from "../../Store/Slices/ProfileSlice"


export const getResetPasswordToken = (email , setSendEmail) => {
    return async (dispatch) => {
        dispatch(setLoader(true))
        try{
            let responce = await Apiconnection("POST" , AUTH_API.SEND_RESET_TOKEN , {email });
            if(!responce.data.success){
                throw new Error("You are not a Registered User");
            }
            console.log(responce);
            dispatch(setSendEmail(true))
        }catch(error){
            toast.error(error.message);
            console.log(error)
        }
        dispatch(setLoader(false))
    }
}

export const resetPassword = (formData , navigate) => {
    return async(dispatch) => {
        dispatch(setLoader(true))
        console.log(formData)
        try{
            let responce = await Apiconnection("POST" , AUTH_API.RESET_PASSWORD , {...formData});
            if(!responce.data.success){
                throw new Error("Error while Passowrd-Reset");
            }
            console.log(responce)
            toast.success("Your Password is reset Successfully")
            navigate("/login")
        }catch(error){
            console.log(error)
            toast.error("Unable to reset Password Try Again from Reset Password Page")
        }
        dispatch(setLoader(false))
    }
}


export const sendOtp = (email , navigate) => {
    return async(dispatch) => {
        dispatch(setLoader(true));
        try{
            console.log(email);
            
            const responce = await Apiconnection("POST" , AUTH_API.SEND_OTP , {email});
            console.log(responce)
            if(!responce.data.success){
                toast.error(responce.data.message)
                throw new Error("OTP send failed !! please try again");
            }
            toast.success("Check Your Email For OTP")
            navigate('/verify-email')
        }catch(e){
            console.error(e)
            toast.error(e.response?.data?.message)
        }
        dispatch(setLoader(false))
    }
}


export const signUp = (otp , signUpData ,  navigate) => {
    return async (dispatch) => {
        console.log("This is : " , signUpData)
        dispatch(setLoader(true))
        try{
            const responce = await Apiconnection("POST" , AUTH_API.SIGN_UP , {...signUpData , otp});
            console.log(responce);
            if(!responce.data.success){
                toast.error("SignUp Faied")
                throw new Error("signup failed try again");
            }
            toast.success("SignUp successfully done!!")
            navigate('/login')
        }catch(e){
            console.log(e)
            toast.error(e.response?.data?.message)
        }
        dispatch(setLoader(false))
    }
}


export const login = (formData , navigate) => {
    return async(dispatch) => {
        dispatch(setLoader(true));
        try{
            const responce = await Apiconnection("POST" , AUTH_API.LOG_IN , {...formData});
            console.log(responce);
            if(!responce.data.success){
                toast.error("Login Faied")
                throw new Error("Login failed try again");
            }
            toast.success("Login successfully done!!");
            const token = responce?.data?.token;
            
            const main_token = JSON.stringify(token);
            localStorage.setItem("token" , main_token);
            dispatch(setToken(token));
            const user = responce?.data?.user
            const user_token = JSON.stringify(user);
            localStorage.setItem('user' , user_token);
            dispatch(setUser(user));
            navigate('/');
        }catch(e){
            console.log(e)
            toast.error(e.response?.data?.message)
        }
        dispatch(setLoader(false));
    }
}

export const logout = (navigate , setUserPresent) => {
    return (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        dispatch(setUser(null));
        dispatch(setToken(null));
        toast.success("Logout successfully done")
        navigate('/login')
    }
}


export const sendMessage = (data) => {
    return async function(){
        try{
            const MailResponse = await Apiconnection("POST", SEND_MAIL.CONTACT_US_SEND_MAIL , data);
            console.log(MailResponse);
            if(MailResponse.data.success){
                toast.success("Message is successfully sent");
            }
            else{
                toast.error(MailResponse.data.message);
            }
        }catch(e){
            console.error(e);
        }
    }
}


export const updateUserProfile = (formData , token) => {
   return async function(dispatch){
        const toastId = toast.loading("Updateing Profile Picture...");
        try{
            const responce = await Apiconnection(
                "PUT" , 
                PROFILE_API.UPDATE_USER_PROFILE , 
                formData , 
                {
                    "Content-Type" : "multipart/form-data" , 
                    "Authorization" : `Bearer ${token}` , 
                }
            );
            console.log("Profile updated responce is :" , responce);
            // check data for errors
            if(!responce.data.success) {
                throw new Error(responce.data.data.message);
            }
            toast.dismiss(toastId);
            dispatch(setUser(responce.data.data));
            toast.success("Profile picture is updated successfully");
        }catch(e){
            toast.dismiss(toastId);
            console.error("error occur")
            console.log("error messase is" , e.message);
            toast.error(e.message);
        }
   }
}

export const updateUserAdditionalData = (formData , token) => {
    return async function(dispatch){
        const toastId = toast.loading("Uploading...");
        try{
            const response = await Apiconnection(
                "PUT" , 
                PROFILE_API.UPDATE_USER_PROFILE_ADDITIONAL_DATA ,
                formData ,
                {
                    "Content-Type" : "application/json" , 
                    "Authorization" : `Bearer ${token}` ,
                } 
            );
            console.log("responce is : ");
            console.log(response);
            if(!response.data.success){
                throw new Error(response.message);
            }
            toast.dismiss(toastId);
            toast.success("Additional Data is successfully updated.");
        }catch(e){
            toast.dismiss(toastId);
            console.log("error messase is" , e);
            toast.error(e.response.data.message);
        }
    }
}

export const deleteUser = (navigate) => {
    return async function (dispatch) {
        try{
            dispatch(logout(navigate));
            const response = await Apiconnection("delete" , PROFILE_API.DELETE_USER);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("User is successfully deleted");
        }catch(e){
            console.error(e);
        }
    }
}


export const getUserAllCources = async (token) => {
    try{
        const response = await Apiconnection(
            "GET" , 
            COURSE_API.GET_ALL_USER_ENROLLED_COURSE , 
            null , 
            {
                "Authorization": `Bearer  + ${token}`
            }
        );
        console.log(response);
        if(!response.data.success) {
            throw new Error("SomeThing went wrong while fetching all enroll courses");
        }
        return response.data.courses;
    }catch(e){
        console.log(e);
    }
}