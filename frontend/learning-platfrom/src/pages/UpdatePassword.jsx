import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../service/operations/BackendConnection';
import BackToLogin from '../component/common/BackToLogin';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const { tokenId } = useParams();
    const dispatch = useDispatch()
    const [fromData, setFromData] = useState({
        token: tokenId, 
        password: "", 
        confirmPassword: "", 
    });

    const passwordHandeler = (e) => setFromData((pre) => ({
        ...pre, 
        password: e.target.value, 
    }));

    const confirmPasswordHandeler = (e) => setFromData((pre) => ({
        ...pre, 
        confirmPassword: e.target.value, 
    }));

    const { loader } = useSelector((store) => store?.Auth);
    const setFormDataHandeler = (e) => {
        e.preventDefault();
        console.log(fromData);
        dispatch(resetPassword(fromData, navigate));
    };

    return loader ? <div className="bg-richblack-90 h-screen w-screen flex justify-center items-center">Loading ....</div> : (
        <div className=' w-[30%] min-h-screen mx-auto flex flex-col justify-center gap-4'>
            <div className=" font-bold text-3xl text-richblack-5">Choose new password</div>
            <div className=" text-richblack-300  leading-5">Almost done. Enter your new password and you're all set.</div>
            <form className=" mt-3 w-full flex flex-col gap-4" onSubmit={setFormDataHandeler}>
                <label className=" w-full">
                    <p className=" text-richblack-5 ">New password <span className=" text-[#EF476F]">*</span></p>
                    <input 
                        type='password'
                        onChange={passwordHandeler}
                        value={fromData.password}
                        className=" mt-2 w-full h-12 rounded-lg bg-richblack-700 p-2 outline-none border-b-richblack-400 border-b-2"
                    />
                </label> 
                <label className=" w-full">
                    <p className=" text-richblack-5 ">Confirm new password<span className=" text-[#EF476F]">*</span></p>
                    <input 
                        type='password'
                        onChange={confirmPasswordHandeler}
                        value={fromData.confirmPassword}
                        className=" mt-2 w-full h-12 rounded-lg bg-richblack-700 p-2 outline-none border-b-richblack-400 border-b-2"
                    />
                </label>
                <button type="submit" className="mt-4 w-full bg-yellow-50 p-3 text-richblack-900 rounded-lg text-center">
                    Reset Password
                </button>
             </form>
            <BackToLogin/>
        </div>
    );
}

export default UpdatePassword;
