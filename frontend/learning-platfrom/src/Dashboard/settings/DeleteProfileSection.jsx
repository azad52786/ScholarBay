import React from 'react'
import { MdDeleteSweep } from "react-icons/md";



const DeleteProfileSection = ({setShowDeleteAccountModal}) => {


  return (
    <div className='flex justify-between w-[90%] md:w-[70%]  border border-richblack-100 bg-[#340019] px-3 py-6 md:p-8 rounded-md items-center mb-16'>
          <div className=' flex gap-8 items-center'>
          <div className=' w-20 h-12 p-1 text-2xl  rounded-full bg-[#691432] flex items-center justify-center'>
            <MdDeleteSweep className=' text-[#EF476F] '/>
          </div>
            
            <div className=' flex flex-col gap-y-4 '>
                <div className=' text-pure-greys-50 font-semibold text-2xl'>Delete Account</div>
                <div className=' text-sm text-[#FBC7D1]'>
                    <p>Would you like to delete account?</p>
                    <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                </div>
                <div className=' cursor-pointer w-fit  px-3 py-2 rounded-md  text-[#D43D63] border-richblack-600 border'
                
                    onClick={() => setShowDeleteAccountModal(true)}
                >
                    I want to delete my account.
                </div>
            </div>
          </div>
    </div>
  )
}

export default DeleteProfileSection
