import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { useParams, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SectionSlideCard from './SectionSlideCard';

const VideoSlider = ({setShowReviewModal , setShowVideoSlider , showVideoSlider , courseProgress, progressData}) => {
  const {completedLecture , courseSectionData } = useSelector((store) => store.CourseVideo);
  const { courseId } = useParams();
  const location = useLocation();
  
  const isCertActive = location.pathname.endsWith('/certificate');

  return courseSectionData && courseSectionData.length === 0 ? (<div>No Item Found</div>) : (
    <div className={`absolute z-10 lg:relative videoSlider  duration-300 top-0  min-h-screen w-[300px] lg:w-[30%] bg-richblack-800
        backdrop:blur-sm border-r border-b border-opacity-50 border-pure-greys-300
          ${!showVideoSlider ? "sliderOff" : "videoSlider left-[-300px]"} lg:left-0
        `}>
        
         {/* top section  */}
        <div className=' w-full h-[80px]  flex items-center justify-between px-2
          border-b border-opacity-50 border-pure-greys-300'>
          <RxCross2 className=' lg:hidden w-10 h-10  text-richblack-400 cursor-pointer rounded-lg bg-[rgba(39, 144, 245, 0.09)] backdrop:blur-sm'
            onClick={() => {
              setShowVideoSlider(false)
            }}
          />
          <button className=' flex font-edu-sa items-center gap-2
            bg-yellow-25 rounded-md px-2 py-3 text-richblack-800 '
            onClick={() => setShowReviewModal(true)}
            >ReView  <CiEdit className=' w-6 h-6
            '/></button>
        </div>

        {/* Progress Display */}
        {progressData && (
          <div className='p-4 border-b border-richblack-700 bg-richblack-900/30'>
            <div className='flex justify-between items-center mb-1 text-sm font-edu-sa'>
              <span className='text-richblack-300'>Course Progress</span>
              <span className='text-caribbeangreen-100 font-bold'>{progressData.progressPercentage}%</span>
            </div>
            <div className='w-full bg-richblack-900 h-2.5 rounded-full overflow-hidden'>
              <div 
                className='h-full rounded-full transition-all duration-500 bg-caribbeangreen-100'
                style={{
                  width: `${progressData.progressPercentage}%`
                }}
              ></div>
            </div>
            <p className='text-xs text-richblack-400 mt-2 font-edu-sa'>
              {progressData.completedLessons} of {progressData.totalLessons} lessons completed
            </p>
          </div>
        )}
        
        {/* section slider  */}
        
        <div className=' p-2'>
          {
            courseSectionData && 
            courseSectionData.map((section , i) => (
                <SectionSlideCard 
                index={i}
                courseProgress = {courseProgress}
                section={section}
                />
            ))
          }
        </div>

        {/* Certificate Section Link */}
        <div className=' p-2 border-t border-richblack-700 mt-4'>
          <NavLink to={`/view-course/${courseId}/certificate`} className="w-full block">
            <div className={`flex items-center gap-3 w-full pl-4 p-3 cursor-pointer text-sm font-inter rounded-xl transition-all duration-150 ${
              isCertActive 
                ? "bg-yellow-700 border-l-4 border-l-yellow-25 text-yellow-50" 
                : "bg-opacity-0 text-pure-greys-200 hover:bg-richblack-700/50"
            }`}>
              <span className="text-lg">📜</span>
              <p className="font-semibold font-edu-sa">Course Certificate</p>
            </div>
          </NavLink>
        </div>
        
    </div>
  )
}

export default VideoSlider

   