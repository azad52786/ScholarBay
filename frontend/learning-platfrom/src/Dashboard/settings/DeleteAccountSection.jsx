import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from '../../service/operations/BackendConnection';

const DeleteAccountSection = ({setShowDeleteAccountModal}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteAccountHandler = () => {
        dispatch(deleteUser(navigate));
    }
  return (
    <div className=" fixed z-50 top-0 left-0 w-screen h-screen bg-transparent backdrop-blur-sm flex items-center">
      <div className=" px-3 py-6 mx-auto bg-richblack-700 rounded-md border w-[90%] md:w-[50%] lg:w-[40%] h-fit flex flex-col items-center">
        <h1 className=" font-bold text-xl text-caribbeangreen-50">
          Account Deletion Conformation
        </h1>
        <div className=" text-richblack-300 text-base flex flex-col items-center
        mt-3">
        <p>Are you sure you want to delete your account?</p>
        <p>
          If you delete this account, you won't be able to recover it again.
        </p>
        
        </div>
         <div className=" flex items-center gap-4 py-3 text-black ">
              <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[#00BFFF]"
                onClick={() => setShowDeleteAccountModal(false)}
              >Cancel</button>
              <button
              onClick={deleteAccountHandler}
              className="px-4 py-2 rounded-lg text-sm font-medium  bg-yellow-100">Submit</button>
            </div>
      </div>
    </div>
  );
};

export default DeleteAccountSection;
