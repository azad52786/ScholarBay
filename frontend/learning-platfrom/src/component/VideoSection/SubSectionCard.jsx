import React from "react";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const SubSectionCard = ({ index , subSection , section_id , courseProgress }) => {
  const { completedLecture } = useSelector((store) => store.CourseVideo)
  const { courseId , subSectionId } = useParams();
  const navigate = useNavigate();
  const { _id , watched, description } = subSection;
  return (
    <div
      key={index}
      onClick={() => {
        navigate(`/view-course/${courseId}/section/${section_id}/sub-section/${subSection._id}`);
      }}
      className={`w-full cursor-pointer h-11 ${subSectionId === subSection._id ? "bg-yellow-25 bg-opacity-80" : "bg-richblack-5 bg-opacity-90"}  
        flex items-center py-3 font-medium text-[14px] VideoSliderSwept border-b border-richblack-900
      `}
    >
      <div className=" w-[15%]">
        {(courseProgress.includes(subSection._id)) && <TiTick className=" w-9 h-10 mb-1 text-[#14e822]
        " />}
      </div>
      <div>
        <p className=" font-semibold font-edu-sa
             text-richblack-700 
        ">{description.slice(0 , 40)}</p>
      </div>
    </div>
  );
};

export default SubSectionCard;
