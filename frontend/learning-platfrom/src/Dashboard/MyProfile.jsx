import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import FileDetails from './FileDetails';

const MyProfile = () => {
    const {user , loader : ProfileLoader} = useSelector((store) => store.User);
    const { pathname } = useLocation();
    
    const navigate = useNavigate();
    const { loader : AuthLoader } = useSelector((store) => store.Auth);
    const isLoader = ProfileLoader || AuthLoader;
    return isLoader ? (
      <Loader/>
    ) : (
      <div className='w-full bg-richblack-900 font-edu-sa flex flex-col items-center justify-center text-pure-greys-25'>
        {/* <FileDetails pathname={pathname} extra = {["Profile"]}/> */}
        <div className='pl-3 font-edu-sa flex items-center justify-center text-4xl mt-4 font-bold text-[#00BFFF] mb-8'>My Profile</div>
        <div className='flex justify-between w-[70%] h-fit bg-richblack-700 p-8 rounded-md items-center mb-16'>
          <div className=' flex gap-4 items-center'>
            <div className='h-fit w-fit '>
            <img src={user.image} alt='profile'  className="h-32 w-32 rounded-full object-center "/>
            </div>
            
            <div className=' flex flex-col gap-2'>
              <div className=' text-pure-greys-25 font-bold text-xl'>{user.firstName + " " + user.lastName}</div>
              <div className=' text-pure-greys-300 text-sm'>{user.email}</div>
            </div>
          </div>
          <button className={` ml-7 font-bold text-black bg-[#FFD60A]
          w-fit h-fit py-3 px-6 rounded-md transition-all duration-250 hover:scale-95 cursor-pointer border-b-2 border-r-2 border-richblack-700 hover:border-black`}
            onClick={() => {
                navigate("/dashboard/default/setting")
            }}
          >
           { "Edit" + " " + "✏️"}
          </button>
        </div>
        <div className='flex flex-col w-[70%] bg-richblack-700 p-8 rounded-md items-center gap-y-4'>
          <div className=' flex w-full items-start justify-between mb-6'>
            <div className='text-pure-greys-25 font-bold text-xl'>Personal Details</div>
            <button className={` ml-7 font-bold text-black bg-[#FFD60A]
              w-fit h-fit py-3 px-6 rounded-md transition-all duration-250 hover:scale-95 cursor-pointer border-b-2 border-r-2 border-richblack-700 hover:border-black`}
                onClick={() => {
                    navigate("/dashboard/default/setting")
                }}
            > { "Edit" + " " + "✏️"}</button>
          </div>
          <div className='flex w-full'>
            <div className='w-[50%]'>
              <p className=' text-sm text-pure-greys-300 mb-2'>First Name</p>
              <p className='font-bold text-start text-pure-greys-25'>{user.firstName}</p>
            </div>
            <div className=' w-[50%]'>
              <p className=' text-sm text-pure-greys-300 mb-2'>Last Name</p>
              <p className='font-bold text-pure-greys-25'>{user.lastName}</p>
            </div>
          </div>
          <div className='flex w-full'>
            <div className='w-[50%]'>
              <p className=' text-sm text-pure-greys-300  mb-2'>Email</p>
              <p className='font-bold  text-start text-pure-greys-25'>{user?.email}</p>
            </div>
            <div className='w-[50%]'>
              <div className=' text-sm   text-pure-greys-300 mb-2'>Contact Number</div>
              <p className='font-bold  text-pure-greys-25'>{user?.contact ? user.contact : "Null" }</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MyProfile
