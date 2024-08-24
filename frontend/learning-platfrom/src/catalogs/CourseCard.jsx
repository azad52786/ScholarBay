import React from "react";

const CourseCard = ({ courseDetails }) => {
  console.log("Course Details is : ", courseDetails);
  
  const { thumbnail , courseName , price , instructor } = courseDetails;
  const { firstName , lastName }  = instructor;
  return (
    <div className=" w-[300px] font-inter scale-[0.9] hover:scale-[1] transition-all duration-900 border border-pure-greys-500 rounded-md">
      <img src={thumbnail} alt='courseImage' loading="lazy" className=" w-full h-[160px] object-cover rounded-t-md"/>
      <div className=" w-full min-h-36 p-2 bg-richblack-800 rounded-b-md flex flex-col gap-2">
          <p className=" font-semibold text-xl text-pure-greys-50">{courseName}</p>
          <p className="text-[12px] md:text-lg text-richblack-5">By <span className="text-yellow-50">{firstName + " " + lastName}</span></p>
      </div>
    </div>
  );
};

export default CourseCard;
