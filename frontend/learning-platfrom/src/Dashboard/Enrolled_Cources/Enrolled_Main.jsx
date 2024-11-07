import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAllCources } from "../../service/operations/BackendConnection";
import CourseCard from "./CourseCard";
import MainUi from "./MainUi";
import { Link, useLocation } from "react-router-dom";
import { getPathArray } from "../../utils/constants";
import FileDetails from "../FileDetails";
import Loading from "../../catalogs/Loading";
import HighlitedText from "../../component/core/Homepage/HighlitedText";

const Enrolled_Main = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const { token } = useSelector((store) => store.Auth);
  const { pathname } = useLocation();

  const getAllenrollcourses = useCallback(async () => {
    const data = await getUserAllCources(token);

    if(data !== undefined) setEnrolledCourses(data);

  }, [setEnrolledCourses, token]);

  useEffect(() => {
    getAllenrollcourses();
  }, [getAllenrollcourses]);
  
  return (!enrolledCourses) ? (
    <Loading />
  ) :  (
    <div className=" w-full h-full">
      <div className=" w-[90%] mx-auto md:w-[80%] lg:w-[70%] min-h-screen mt-10">
        <h1 className=" mb-10 font-edu-sa font-semibold lg:font-bold text-lg md:text-2xl lg:text-3xl text-[#5d53e8e9] text-opacity-90">
          Enrolled Course
        </h1>
        {
          enrolledCourses && enrolledCourses.length === 0 && (
            <div className="text-center text-lg font-mono text-richblack-25">
             <HighlitedText text={" You have not enrolled any course yet."} color={'bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] '}/>
            </div>
          )
        }
        {
           enrolledCourses && enrolledCourses.length > 0 &&
           <div className=" w-full h-full flex items-center justify-between px-3 py-3 rounded-t-md bg-richblack-500 bg-opacity-95">
          <p className=" font-mono lg:font-semibold">Course Name</p>
          <p className=" font-mono lg:font-semibold">Progress</p>
        </div>
        }
        
        {
          enrolledCourses && 
          enrolledCourses.map((course) => (
            <div key={course._id} className=" w-full h-20 border border-richblack-400 border-opacity-60">
            <Link 
            to={`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`}
            >
                <CourseCard courseDetails = {course} /> </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Enrolled_Main;
