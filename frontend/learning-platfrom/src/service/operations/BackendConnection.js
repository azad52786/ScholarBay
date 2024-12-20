import toast from "react-hot-toast";
import { setLoader, setToken } from "../../Store/Slices/AuthSlice";
import { AUTH_API, COURSE_API, INSTRUCTOR_DASHBOARD_API, PROFILE_API, SEND_MAIL } from "../Api";
import Apiconnection from "../Apiconnection";
import { setUser } from "../../Store/Slices/ProfileSlice";
import { deleteCookie } from "../../utils/helperfunction";

export const getResetPasswordToken = (email, setSendEmail) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    try {
      let responce = await Apiconnection("POST", AUTH_API.SEND_RESET_TOKEN, {
        email,
      });
      if (!responce.data.success) {
        throw new Error(responce.data.message);
      }
      toast.success("A reset password link has been sent to your mailbox.");
      setSendEmail(true);
    } catch (error) {
      if(!error.response){
        toast.error("Network error");
        dispatch(setLoader(false));
        return;
      }
      dispatch(setLoader(false));
      toast.error(error.response?.data?.message);
      console.log(error);
    }
    dispatch(setLoader(false));
  };
};

export const resetPassword = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    try {
      let responce = await Apiconnection("POST", AUTH_API.RESET_PASSWORD, {
        ...formData,
      });
      if (!responce.data.success) {
        throw new Error("Error while Passowrd-Reset");
      }
      toast.success("Your Password is reset Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      if(!error.response){
        toast.error("Network Error");
        return;
      }
      toast.error(
        "Unable to reset Password Try Again from Reset Password Page"
      );
    }
    dispatch(setLoader(false));
  };
};

export const sendOtp = (email, navigate) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    try {

      const responce = await Apiconnection("POST", AUTH_API.SEND_OTP, {
        email,
      });
      if (!responce.data.success) {
        toast.error(responce.data.message);
        throw new Error("OTP send failed !! please try again");
      }
      toast.success("Check Your Email For OTP");
      navigate("/verify-email");
    } catch (e) {
      console.error(e);
      if(!e.response){
        toast.error("Network Error");
        return;
      }
      toast.error(e.response?.data?.message);
    }
    dispatch(setLoader(false));
  };
};

export const signUp = (otp, signUpData, navigate) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const responce = await Apiconnection("POST", AUTH_API.SIGN_UP, {
        ...signUpData,
        otp,
      });
      if (!responce.data.success) {
        // toast.error("SignUp Faied");
        throw new Error(responce?.data?.message);
      }
      toast.success("SignUp successfully done!!");
      navigate("/login");
    } catch (e) {
      console.log(e);
      // if(!e.response){
      //   toast.error("Network Error");
      //   return;
      // }
      toast.error(e.response?.data?.message || e.message || "Unknown error");
    }
    dispatch(setLoader(false));
  };
};

export const login = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const responce = await Apiconnection("POST", AUTH_API.LOG_IN, {
        ...formData,
      });
      if (!responce.data.success) {
        toast.error("Login Faied");
        throw new Error("Login failed try again");
      }
      toast.success("Login successfully done!!");
      const token = responce?.data?.token;

      const main_token = JSON.stringify(token);
      localStorage.setItem("token", main_token);
      dispatch(setToken(token));
      const user = responce?.data?.user;
      const user_token = JSON.stringify(user);
      localStorage.setItem("user", user_token);
      dispatch(setUser(user));
      navigate("/");
    } catch (e) {
      console.log(e);
      if(!e.response){
        toast.error("NetWork Error"); 
      }else toast.error(e.response?.data?.message);
    }
    dispatch(setLoader(false));
  };
};

export const logout = (navigate, setUserPresent) => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    dispatch(setToken(null));
    deleteCookie("token");
    toast.success("Logout successfully done");
    navigate("/login");
  };
};

export const sendMessage = (data) => {
  return async function () {
    try {
      const MailResponse = await Apiconnection(
        "POST",
        SEND_MAIL.CONTACT_US_SEND_MAIL,
        data
      );
      if (MailResponse.data.success) {
        toast.success("Message is successfully sent");
      } else {
        toast.error("Mail Send Failed Please try again!!");
      }
    } catch (e) {
      console.error(e);
      
    }
  };
};

export const updateUserProfile = (formData, token) => {
  return async function (dispatch) {
    const toastId = toast.loading("Updateing Profile Picture...");
    try {
      const responce = await Apiconnection(
        "PUT",
        PROFILE_API.UPDATE_USER_PROFILE,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      // check data for errors
      if (!responce.data.success) {
        throw new Error(responce.data.data.message);
      }
      toast.dismiss(toastId);
      dispatch(setUser(responce.data.data));
      toast.success("Profile picture is updated successfully");
    } catch (e) {
      toast.dismiss(toastId);
      // console.error("error occur");
      console.log("error messase is", e);
      if(!e.response){
        toast.error("Network Error");
        return;
      }
      toast.error(e.response.data.message);
    }
  };
};

export const updateUserAdditionalData = (formData, token) => {
  return async function (dispatch) {
    const toastId = toast.loading("Uploading...");
    try {
      const response = await Apiconnection(
        "PUT",
        PROFILE_API.UPDATE_USER_PROFILE_ADDITIONAL_DATA,
        formData,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.message);
      }
      toast.dismiss(toastId);
      toast.success("Additional Data is successfully updated.");
    } catch (e) {
      toast.dismiss(toastId);
      console.log("error messase is", e);
      if(!e.response){
        toast.error("Network Error");
        return;
      }
      toast.error(e.response.data.message);
    }
  };
};

export const deleteUser = (navigate) => {
  return async function (dispatch) {
    try {
      const response = await Apiconnection("delete", PROFILE_API.DELETE_USER);
      dispatch(logout(navigate));
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("User is successfully deleted");
    } catch (e) {
      console.error(e);
      if(!e.response){
        toast.error("Network Error");
        return;
      }
      if(e.response.status === 420) toast.error(e.response?.data?.message);
    }
  };
};

export const getUserAllCources = async (token) => {
  try {
    const response = await Apiconnection(
      "GET",
      COURSE_API.GET_ALL_USER_ENROLLED_COURSE,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error("SomeThing went wrong while fetching all enroll courses");
    }
    return response.data.courses;
  } catch (e) {
    console.log(e);
  }
};

export const getInstructorDashBoardDetails = async (token) => {
  let toastId = toast.loading("Loading...");
  try {
    let instructor = await Apiconnection('get' , INSTRUCTOR_DASHBOARD_API.GET_INSTRUCTOR_DASHBOARD_DETAILS , null , {
        Authorization : `Bearer ${token}` 
    });
    if(instructor.data?.success){
    toast.dismiss(toastId);
        return instructor.data?.dashBoardDetails ;
    }else{
        throw new Error("Failed to fetch instructor dashboard details ")
    }
  } catch (e) {
    console.log(e);
  }
  toast.dismiss(toastId);
  return [];
};
