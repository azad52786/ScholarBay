import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from '../service/operations/BackendConnection';

const LogoutModal = ({setLogoutModal , logoutModalHandler}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandeler = async() => {
    try{
        dispatch(logout(navigate));
    }catch(e){
        console.log(e);
    }
  }
  return (
    <div className=' w-screen min-h-screen fixed top-0 left-0 bg-transparent backdrop-blur-[2px] z-10 flex items-center justify-center'>
        <div className=' bg-richblack-800 w-3/12 h-52 rounded-md border flex flex-col gap-y-4 p-4'>
            <h1 className=' font-bold text-4xl text-pure-greys-100'>Are you Sure ?</h1>
            <h1 className=' font-bold text-xl text-pure-greys-300'>You will be logged Out from your Account.</h1>
            <div className=' flex'>
                <button className={`font-bold text-black bg-[#FFD60A]
                w-fit py-3 px-6 rounded-md transition-all duration-250 hover:scale-95 cursor-pointer border-b-2 border-r-2 border-richblack-700 hover:border-black`}
                    onClick={logoutHandeler}
                >
                    Log Out
                </button>
                <button className={` ml-7 font-bold text-white bg-richblack-500 
                    w-fit py-3 px-6 rounded-md transition-all duration-250 hover:scale-95 cursor-pointer border-b-2 border-r-2 border-richblack-700 hover:border-black`}
                    onClick={logoutModalHandler}    
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

export default LogoutModal
