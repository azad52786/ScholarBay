import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { Ri24HoursLine } from "react-icons/ri";
import { Link , useNavigate } from "react-router-dom";
import BackToLogin from '../component/common/BackToLogin';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../service/operations/BackendConnection';
import ButtonSpinner from '../component/common/ButtonSpinner';
import toast from "react-hot-toast"



const VerifyEmail = () => {
    const [otp , setOtp] = useState('');
    const { signUpData } = useSelector((store) => store.SignUpData)
    const { loader } = useSelector((store) => store.Auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signUpHandeler = () => {
      dispatch(signUp(otp , signUpData ,  navigate))
    }
    const reSendSignUpHandeler = () => {
      if(otp.length === 0) {
        toast.success("OTP is successfully resend")
        return ;
      }
      dispatch(signUp(otp , signUpData ,  navigate));
      toast.success("OTP is successfully resend")
    }
  return  (
        <div className=" w-full bg-richblack-900 text-richblack-5 min-h-screen flex items-center justify-center font-inter">
          <div className=" w-[25%] mx-auto flex flex-col items-start gap-3">
            <div className=" font-bold text-3xl text-richblack-5">Verify Email</div>
            <div className=" text-richblack-300  leading-6 text-[18px]">A verification code has been sent to you. Enter the code below</div>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) =>  (<div className=' w-full flex flex-row gap-4'>
                  <input   {...props}  className='mx-5 text-lg bg-richblack-800 text-richblack-5 h-[3em]'/>
                </div>)
            }
            />
          
           <button className=" mt-8 w-full bg-yellow-50 p-3 text-richblack-900 rounded-lg text-center" 
            onClick={signUpHandeler}
           >
            {
              loader && <ButtonSpinner/>
            }
            {
              !loader && "Submit"
            }
             
            </button>
          <div className=' flex flex-row w-full justify-between items-center mt-4'>
          <BackToLogin/>
            <Link to='/verify-email' className=' flex flex-row gap-2 text-caribbeangreen-200 font-inter'
              onClick={ reSendSignUpHandeler}
            > <span><Ri24HoursLine className=' mt-1' /></span> <span>Resend it</span></Link>
          </div>
          </div>
        </div>
  )
}

export default VerifyEmail