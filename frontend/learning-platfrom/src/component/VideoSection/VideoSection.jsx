import React, { useEffect, useState } from 'react';
import { HiMenuAlt1 } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Apiconnection from '../../service/Apiconnection';
import { COURSE_API } from '../../service/Api';
import { updateCompletedLecture } from '../../Store/Slices/CourseVideoSlice';
import Mainvideo from './Mainvideo';
import "video-react/dist/video-react.css"

const VideoSection = ({ setShowVideoSlider }) => {
  const { courseEntireData, courseSectionData , completedLecture} = useSelector((store) => store.CourseVideo);
  const { token } = useSelector((store) => store.Auth)
  let { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [videoData, setVideoData] = useState(null);
  const [preViewPicture, setPreViewPicture] = useState(null);
  const [videoEnd, setVideoEnd] = useState(false);
  const { courseName, thumbnail } = courseEntireData || {};
  const [noLec , setNoLec ] = useState(false);

  // fetch the video
  useEffect(() => {

    // make undefined -> string i take it from params it took a lot's of time to find this error 
    if(sectionId === "undefined" || subSectionId === "undefined") {

      setNoLec(true)
      return;
    }else{
      if(noLec){
        setNoLec(false);
      }
    }
    if (courseId==="undefined") {
      navigate('/dashboard/default/enrolled-courses');
      return;
    }
    let sectionData = courseSectionData?.filter((section) => section?._id === sectionId);
    let subSectionData = sectionData?.[0]?.subSection?.filter((subSec) => subSec?._id === subSectionId);
    setVideoData(subSectionData?.[0]);
    setPreViewPicture(thumbnail);

    setVideoEnd(false);
  }, [courseEntireData, courseSectionData, location.pathname]);

  const isFirstVideo = () => {
    const indexOfSection = courseSectionData?.findIndex((section) => section?._id === sectionId);
    const indexOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.findIndex((subSec) => subSec?._id === subSectionId);
    return indexOfSection === 0 && indexOfSubSection === 0;
  };

  const isLastVideo = () => {
    const indexOfSection = courseSectionData?.findIndex((section) => section?._id === sectionId);

    const noOfSection = courseSectionData?.length;
    const noOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.length;
    const indexOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.findIndex((subSec) => subSec?._id === subSectionId);
    return indexOfSection === noOfSection - 1 && indexOfSubSection === noOfSubSection - 1;
  };

  const goToNextHandeler = async() => {
    if(!videoData) return ;
    if(!videoData?.watched){
        try{
          const res = await Apiconnection('put' , COURSE_API.MARKED_SUBSECTION + '/' + videoData?._id , null , {
             Authorization : `Bearer ${token}`
          })
          if(res.data.success){
             dispatch(updateCompletedLecture(videoData._id))
          }else{
            throw new Error("SomeThing Went Wrong");
          }
        }catch(e){
           console.error(e);
            return ;
        }
    }
    const indexOfSection = courseSectionData?.findIndex((section) => section?._id === sectionId);
    const noOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.length;

    const indexOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.findIndex((subSec) => subSec?._id === subSectionId);
    let nextSectionId, nextSubSectionId;
    if (indexOfSubSection < noOfSubSection - 1) {
      nextSectionId = sectionId;
      nextSubSectionId = courseSectionData?.[indexOfSection]?.subSection?.[indexOfSubSection + 1]?._id;
    } else {
      nextSectionId = courseSectionData?.[indexOfSection + 1]?._id;
      nextSubSectionId = courseSectionData?.[indexOfSection + 1]?.subSection?.[0]?._id;
    }
    navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
  };

  const goToPreViousHandeler = () => {
    const indexOfSection = courseSectionData?.findIndex((section) => section?._id === sectionId);

    let preSectionId, preSubSectionId;
    
    const indexOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.findIndex((subSec) => subSec?._id === subSectionId);
    
    if (indexOfSubSection > 0) {
      preSectionId = sectionId;
      preSubSectionId = courseSectionData?.[indexOfSection]?.subSection?.[indexOfSubSection - 1]?._id;
    } else {
      preSectionId = courseSectionData?.[indexOfSection - 1]?._id;
      const noOfSubSection = courseSectionData?.[indexOfSection - 1]?.subSection?.length;

      preSubSectionId = courseSectionData?.[indexOfSection - 1]?.subSection?.[noOfSubSection - 1]?._id;
    }
    navigate(`/view-course/${courseId}/section/${preSectionId}/sub-section/${preSubSectionId}`);
  };

  return (
    <div className='h-full w-full font-edu-sa'>
      <div className='h-[80px] w-full bg-richblack-800 bg-opacity-50 px-2 flex items-center justify-between border-b border-richblack-500 border-opacity-60'>
        <div className='flex md:gap-3'>
          <HiMenuAlt1
            className='md:w-10 md:h-10 w-6 h-6 text-pure-greys-300 lg:hidden cursor-pointer'
            onClick={() => setShowVideoSlider((prev) => !prev)}
          />
          <p className='pl-2 md:pl-5 font-semibold md:font-bold text-base md:text-2xl text-richblack-300'>{courseName}</p>
        </div>
        <div className=' pr-4'>
        {
         courseSectionData  && courseSectionData.length > 0 && 
         <div className=' '>
         
           {
             !isFirstVideo() && <button
               className=' py-1 px-2 mb-1 md:mb-0  md:py-2 md:px-3 mr-2 bg-blue-100 border-b-2 border-l text-richblack-800 border-white rounded-md md:text-lg md:font-semibold'
               onClick={goToPreViousHandeler}
             >Previous</button>
           }
           { 
             !isLastVideo() && <button
               className='  py-1 px-2 md:py-2 md:px-3 mr-2  bg-yellow-100 text-richblue-800 border-b-2 border-r border-white rounded-md md:text-lg md:font-semibold'
               
               onClick={goToNextHandeler}
             >{videoData?.watched || completedLecture.includes(videoData?._id) ? "Next" : "Mark And Next"}</button>
           }
         </div>
        }
        </div>
        
        {/* if subsectionid is undefined Please show a message no lecture found */}
      </div>
      {
        noLec ? (<div className=' flex items-center justify-center w-full h-[400px] text-2xl font-bold'
          style={{
           background: "linear-gradient(90deg, rgba(126,98,237,1) 0%, rgba(68,216,53,1) 36%, rgba(52,216,118,1) 49%, rgba(210,95,224,1) 100%)" , 
           backgroundClip : "text" , 
           color : 'transparent'
           
          }}
        >No Video Found !!!</div> ) : (<Mainvideo videoData={videoData} thumbnail={thumbnail}  preViewPicture = {preViewPicture} videoEnd ={videoEnd}/>)
      }
      
    </div>
  );
};

export default VideoSection;
