import React from 'react'
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../service/operations/BackendConnection';


const DeleteProfileSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteAccountHandler = () => {
        dispatch(deleteUser(navigate));
    }
  return (
    <div className='flex justify-between w-[70%] bg-[#340019]  p-8 rounded-md items-center mb-16'>
          <div className=' flex gap-8 items-center'>
            <MdDeleteSweep className=' w-12 h-12 p-2 rounded-full text-[#EF476F] bg-[#691432]'/>
            <div className=' flex flex-col gap-y-4 '>
                <div className=' text-pure-greys-50 font-semibold text-2xl'>Delete Account</div>
                <div className=' text-sm text-[#FBC7D1]'>
                    <p>Would you like to delete account?</p>
                    <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                </div>
                <div className=' cursor-pointer text-[#D43D63]'
                    onClick={deleteAccountHandler}
                >
                    I want to delete my account.
                </div>
            </div>
          </div>
    </div>
  )
}

export default DeleteProfileSection
