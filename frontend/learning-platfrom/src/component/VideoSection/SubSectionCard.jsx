import React from "react";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const SubSectionCard = ({ index, subSection, section_id, courseProgress }) => {
  const { completedLecture } = useSelector((store) => store.CourseVideo)
  const { courseId, subSectionId } = useParams();
  const navigate = useNavigate();
  const { _id, title, description, contentType } = subSection;
  const contentTypeLabel =
    contentType === "TEXT_NOTE"
      ? "Markdown"
      : contentType === "QUIZ_ASSESSMENT"
        ? "Quiz"
        : "Video";
  return (
    <div
      key={index}
      onClick={() => {
        navigate(`/view-course/${courseId}/section/${section_id}/sub-section/${subSection._id}`);
      }}
      className={`w-full cursor-pointer h-fit ${subSectionId === subSection._id ? "bg-yellow-25 bg-opacity-80" : "bg-richblack-5 bg-opacity-90"}  
        flex items-center py-3 font-medium text-[14px] VideoSliderSwept border-b border-richblack-900
      `}
    >
      <div className=" w-[15%]">
        {(courseProgress.includes(subSection._id)) && <TiTick className=" w-9 h-10 mb-1 text-[#14e822]
        " />}
      </div>
      <div className="flex flex-col pr-2">
        <p className="font-semibold font-edu-sa text-richblack-700">
          {title || description?.slice(0, 40) || "Untitled lesson"}
        </p>
        <p className="text-xs uppercase tracking-[0.22em] text-richblack-400">
          {contentTypeLabel}
        </p>
      </div>
    </div>
  );
};

export default SubSectionCard;
