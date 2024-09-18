import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
const VideoSlider = ({setShowReviewModal , setShowVideoSlider , showVideoSlider}) => {
  return (
    <div className={`absolute videoSlider  duration-300 top-0  h-screen w-[300px] bg-richblack-800
        backdrop:blur-sm border-r border-b border-opacity-50 border-pure-greys-300
          ${!showVideoSlider ? "sliderOff" : "videoSlider left-[-300px]"}
        `}>
        
         {/* top section  */}
        <div className=' w-full h-[80px]  flex items-center justify-between px-2
         border-b border-opacity-50 border-pure-greys-300'>
          <RxCross2 className=' lg:hidden w-10 h-10  text-richblack-400 cursor-pointer rounded-lg bg-[rgba(39, 144, 245, 0.09)] backdrop:blur-sm'
            onClick={() => {
              setShowVideoSlider(false)
              console.log(showVideoSlider)
            }}
          />
          <button className=' flex font-edu-sa items-center gap-2
           bg-yellow-25 rounded-md px-2 py-3 text-richblack-800 '
            onClick={() => setShowReviewModal(true)}
            >ReView  <CiEdit className=' w-6 h-6
            '/></button>
        </div>
        
        {/* section slider  */}
        
        
    </div>
  )
}

export default VideoSlider
   