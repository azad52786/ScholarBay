import React, { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledCourse, getWatchedSection } from "../service/operations/CourseBackendConnection";
import {
  setCourseEntireData,
  setCourseSectionData,
} from "../Store/Slices/CourseVideoSlice";
import VideoSlider from "../component/VideoSection/VideoSlider";
import ReviewModal from "../component/VideoSection/ReviewModal";
import VideoSection from "../component/VideoSection/VideoSection";

const VideoPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.Auth);
  const [reviewModal, setReviewModal] = useState(false);
  const [showVideoSlider, setShowVideoSlider] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [ courseProgress , setCourseProgress] = useState([]);
  const [progressData, setProgressData] = useState(null);
  useEffect(() => {
    (async () => {
      
      const [courseData, watchedProgress] = await Promise.all([
        getEnrolledCourse(courseId, token) , 
        getWatchedSection(courseId, token)
      ])
      if (watchedProgress) {
        setCourseProgress(watchedProgress.completedLessonsIds || []);
        setProgressData({
          totalLessons: watchedProgress.totalLessons || 0,
          completedLessons: watchedProgress.completedLessons || 0,
          progressPercentage: watchedProgress.progressPercentage || 0,
          isComplete: watchedProgress.isComplete || false,
          certificatePublished: watchedProgress.certificatePublished || false
        });
      }
      dispatch(setCourseEntireData(courseData));
      dispatch(setCourseSectionData(courseData.courseContent));
    })();
  } , [courseId , token , dispatch]);
  return (
    <>
      <div className=" relative min-h-screen w-full flex">
        <VideoSlider
          setShowReviewModal={setShowReviewModal}
          setShowVideoSlider={setShowVideoSlider}
          showVideoSlider={showVideoSlider}
          courseProgress={courseProgress}
          progressData={progressData}
        />
        <VideoSection
          courseProgress ={courseProgress}
          setCourseProgress={setCourseProgress}
          setProgressData={setProgressData}
          setShowVideoSlider = {setShowVideoSlider}
        />
      </div>
      {
        // if review modal show review modal
        showReviewModal &&
        <ReviewModal setShowReviewModal={setShowReviewModal}/>
      }
    </>
  );
};

export default VideoPage;
