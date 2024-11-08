import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getResetPasswordToken} from '../service/operations/BackendConnection'
import BackToLogin from "../component/common/BackToLogin";
import Spinner  from "../../src/Dashboard/Instructor DashBoard/SpinnerInstructor"

const ForgetPassword = () => {
    const dispatch = useDispatch();
  const [sendEmail, setSendEmail] = useState(false);
  const [email, setEmail] = useState("");
  const { loader } = useSelector((store) => store?.Auth);

  function emailSendHandeler(e){
    e.preventDefault();
    dispatch(getResetPasswordToken(email , setSendEmail));
    console.log(setSendEmail)
  }
  return loader === true ? <div className="bg-richblack-90 h-screen w-screen flex justify-center items-center"><Spinner/></div> : (
    <div className=" w-full bg-richblack-900 text-richblack-5 min-h-screen flex items-center justify-center font-inter">
      <div className=" w-[90%] md:w-[40%] lg:w-[30%] mx-auto flex flex-col items-start gap-3">
        <div className=" font-semibold font-edu-sa md:font-bold text-3xl text-[#98ec4a]">{
          !sendEmail ? "Reset your password" : "Check email"
        }</div>
        <div className=" text-richblack-300  leading-5">{`${
          !sendEmail
            ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            : `We have sent the reset email to ${email}`
        }`}</div>
        <form className=" mt-3 w-full"
            onSubmit={emailSendHandeler}
        >
            {!sendEmail && 
                <label className=" w-full">
                    <p className=" text-richblack-5 ">Email Address <span className=" text-[#EF476F]">*</span></p>
                    <input 
                        type = 'text'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        required
                        value={email}
                        className=" mt-4 w-full h-12 rounded-lg bg-richblack-700 p-2 outline-none border-b-richblack-400 border-b-2"
                    />
                </label> 
            }
            {
                !sendEmail && 
                <button className=" mt-8 w-full bg-yellow-50 p-3 text-richblack-900 rounded-lg text-center" >
                    Reset Password
                </button>
            }
            {
                sendEmail && 
                <button className=" mt-8 w-full bg-yellow-50 p-3 text-richblack-900 rounded-lg text-center" >
                    Resend email
                </button>
            }
        </form>
            <BackToLogin/>
      </div>
    </div>
  );
};

export default ForgetPassword;
