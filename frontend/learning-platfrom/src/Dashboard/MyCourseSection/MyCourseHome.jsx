import React from "react";
import { Link } from "react-router-dom";

import TopBarSection from "./TopBarSection";
import CourseHeadingSection from "./CourseHeadingSection";

const MyCourseHome = () => {
  return (
    <div className="w-full h-full flex  gap-5 mt-6 ">
      <div className=" w-[85%] ml-5">
        <TopBarSection/>
        <div className=" w-full">
            <CourseHeadingSection/>
            <div className=" w-full h-fit border rounded-b-md border-pure-greys-300">
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseHome;
