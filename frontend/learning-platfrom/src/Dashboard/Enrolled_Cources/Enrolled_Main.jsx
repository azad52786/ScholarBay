import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAllCources } from "../../service/operations/BackendConnection";
import CourseCard from "./CourseCard";
import MainUi from "./MainUi";
import { useLocation } from "react-router-dom";
import { getPathArray } from "../../utils/constants";
import FileDetails from "../FileDetails";

const Enrolled_Main = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const { token } = useSelector((store) => store.Auth);
  const { pathname } = useLocation();
  // const pathArray = getPathArray(pathname);
  // console.log(pathArray);
  const getAllenrollcourses = useCallback( async () => {
    const data = await getUserAllCources(token);
    setEnrolledCourses(data);
    // console.log(enrolledCourses);
  }, [setEnrolledCourses ,  token]); 

  useEffect(() => {
    getAllenrollcourses();
  }, [getAllenrollcourses]);

  return (
    <div className=" w-full h-full flex flex-col gap-y-3">
     <FileDetails pathname = {pathname}/>
      <h1 className=" ml-4 mt-1 text-2xl text-pure-greys-50 font-bold font-inter">
        Enrolled Courses
      </h1>
      {!enrolledCourses ? (
        <div className=" flex items-center mt-24 justify-center mr-9 text-3xl text-pure-greys-100">
          Loading...
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className=" flex items-center mt-24 justify-center mr-9 text-3xl text-pure-greys-100">
          No Courses Available
        </div>
      ) : (
        <MainUi />
      )}
    </div>
  );
};

export default Enrolled_Main;
