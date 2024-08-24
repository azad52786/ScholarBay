import React, { useState } from "react";
import CourseCard from "./CourseCard";

const CatagoryCourseSection = ({ allCourseDetails }) => {
  const [isMostPopuler, setIsMostPopuler] = useState(true);
  console.log(allCourseDetails);
  return (
    <div className=" w-full h-fit font-inter">
      <div class=" mx-auto box-content w-[90%] max-w-maxContentTab px-2 py-12 lg:max-w-maxContent">
        <h2 className=" text-3xl text-pure-greys-100 font-bold ">
          Courses to get you started
        </h2>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <button
            className={`px-4 py-2  ${
              isMostPopuler
                ? "border-b text-yellow-25 border-b-yellow-25"
                : "text-richblack-50"
            }  cursor-pointer`}
            onClick={() => setIsMostPopuler(true)}
          >
            Most Populer
          </button>
          <button
            className={`px-4 py-2 ${
              !isMostPopuler
                ? "border-b text-yellow-25 border-b-yellow-25"
                : "text-richblack-50"
            }text-yellow-25 cursor-pointer`}
            onClick={() => setIsMostPopuler(false)}
          >
            New
          </button>
        </div>
        {/* catagory course slider */}
        <div className=" w-full h-full">
        
          {allCourseDetails?.currentTagCourses?.courses.length > 0 && (
            <CourseCard
              courseDetails={allCourseDetails?.currentTagCourses?.courses[0]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CatagoryCourseSection;
