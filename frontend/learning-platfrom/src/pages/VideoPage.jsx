import React, { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledCourse } from "../service/operations/CourseBackendConnection";
import {
  setCourseEntireData,
  setCourseSectionData,
} from "../Store/Slices/CourseVideoSlice";
import VideoSlider from "../component/VideoSection/VideoSlider";
import ReviewModal from "../component/VideoSection/ReviewModal";

const VideoPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.Auth);
  const [reviewModal, setReviewModal] = useState(false);
  const [showVideoSlider, setShowVideoSlider] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  useEffect(() => {
    (async () => {
      const courseData = await getEnrolledCourse(courseId, token);
      console.log(courseData);
      dispatch(setCourseEntireData(courseData));
      dispatch(setCourseSectionData(courseData.courseContent));
    })();
  });
  return (
    <>
      <div className=" relative min-h-screen w-full ">
        <VideoSlider
          setShowReviewModal={setShowReviewModal}
          setShowVideoSlider={setShowVideoSlider}
          showVideoSlider={showVideoSlider}
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
