import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import toast from 'react-hot-toast';
import { updateUserProfile } from '../../service/operations/BackendConnection';
import { useDispatch } from 'react-redux'

const ChangeProfilePicture = () => {
    const { user } = useSelector((store) => store.User);
    const { token } = useSelector((store) => store.Auth);
    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false);
    const [preViewSource , setPreViewSource] = useState(null);
    const [imageFile , setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if(file){
            console.log("reader called")
            preViewSourceDefineHandler(file);
            setImageFile(file);
        }
    }
    const profilePictureUpdateHandler = useCallback(() => {
      try{
        console.log("uploading profile picture...");
        setLoading(true);
        const formData = new FormData();
        formData.append("displayPicture" , imageFile);
        console.log("Form data is " , formData);
        dispatch(updateUserProfile(formData , token));
      setLoading(false);
      }catch(e){
        toast.error(e.message);
        console.error(e.message);
      }
  } , [dispatch , imageFile , token]);
    function preViewSourceDefineHandler(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreViewSource(reader.result);
        }
    }
    const FileUploadbtnClick = () => {
        fileInputRef.current.click();
    }
    useEffect(() => {
      if(imageFile){
        profilePictureUpdateHandler();
      }
    } , [imageFile , profilePictureUpdateHandler]);
  return (
    <div className='flex justify-between w-[70%] bg-richblack-700 p-8 rounded-md items-center mb-16'>
          <div className=' flex gap-4 items-center'>
            <img src={preViewSource || user.image} alt='profile' height={100} width={100} className=' rounded-full'/>
            <div className=' flex flex-col gap-2'>
              <div className=' text-pure-greys-25 font-medium text-sm'>Change your Profile Picture</div>
              <div className="flex flex-row gap-3">
                <input 
                    type='file'
                    ref={fileInputRef}
                    onChange={fileChangeHandler}
                    accept='image/png, image/gif, image/jpeg'
                    className='hidden'
                />
                
                <button className={` ml-7 font-bold text-black bg-[#FFD60A]
                  w-fit h-fit py-2 px-4 rounded-md transition-all duration-250 hover:scale-95 cursor-pointer border-b-2 border-r-2 border-richblack-700 hover:border-black`}
                    onClick={FileUploadbtnClick}
                  >
                  {
                    loading? "Uploading..." : (<p> Select <FiUpload className="text-lg text-richblack-900 mb-2 ml-2 inline-block" /></p>)
                  }
                  
                </button>
              </div>
              
            </div>
          </div>
    </div>
  )
}

export default ChangeProfilePicture
