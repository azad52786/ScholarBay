import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAllCources } from "../../service/operations/BackendConnection";
import CourseCard from "./CourseCard";
import MainUi from "./MainUi";
import { useLocation } from "react-router-dom";
import { getPathArray } from "../../utils/constants";
import FileDetails from "../FileDetails";
import Loading from "../../catalogs/Loading";

const Enrolled_Main = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { token } = useSelector((store) => store.Auth);
  const { pathname } = useLocation();
  // const pathArray = getPathArray(pathname);
  // console.log(pathArray);
  const getAllenrollcourses = useCallback(async () => {
    const data = await getUserAllCources(token);
    console.log(data);
    setEnrolledCourses(data);
    // console.log(enrolledCourses);
  }, [setEnrolledCourses, token]);

  useEffect(() => {
    getAllenrollcourses();
  }, [getAllenrollcourses]);

  return enrolledCourses.length <= 0 ? (
    <Loading />
  ) : (
    <div className=" w-full h-full">
      <div className=" w-[90%] mx-auto md:w-[80%] lg:w-[70%] min-h-screen mt-10">
        <h1 className=" mb-10 font-edu-sa font-semibold lg:font-bold text-lg md:text-2xl lg:text-3xl text-richblack-25 text-opacity-90">
          Enrolled Course
        </h1>
        <div className=" w-full h-full flex items-center justify-between px-3 py-3 rounded-t-md bg-richblack-500 bg-opacity-95">
          <p className=" font-mono lg:font-semibold">Course Name</p>
          <p className=" font-mono lg:font-semibold">Progress</p>
        </div>
        {
          enrolledCourses.map((course) => (
            <div key={course._id} className=" w-full h-20 border border-richblack-400 border-opacity-60">
                <CourseCard courseDetails = {course} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Enrolled_Main;
