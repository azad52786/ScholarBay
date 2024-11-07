import React from "react";
import CourseCard from "./CourseCard";
import HighlitedText from "../component/core/Homepage/HighlitedText";

const CatagoryTopCourseSection = ({ topSellingCourses }) => {
  return (
    <div className=" w-full h-fit box-content font-inter">
      <div className=" w-[90%] mx-auto lg:max-w-maxContent px-2 py-4 md:py-6 flex flex-col">
        <h2 className="section_heading pb-3 md:pb-0 text-xl font-edu-sa  md:text-3xl text-pure-greys-100 font-bold">
          Top Courses
        </h2>
        {topSellingCourses.length <= 0 ? (
          <div className=" w-full flex items-center justify-center font-mono ">
            <HighlitedText
              text={"No Course Found"}
              color={
                "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]  font-semibold text-4xl mb-3"
              }
            />
          </div>
        ) : (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-6 p-6">
            {topSellingCourses.map((course, index) => (
              <CourseCard map={index} courseDetails={course} cardHeight={400} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatagoryTopCourseSection;
