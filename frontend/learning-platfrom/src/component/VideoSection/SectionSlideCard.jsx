import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

import SubSectionCard from "./SubSectionCard";


const SectionSlideCard = ({ section }) => {
//   console.log(section);
  const [showSection , setShowSection ] = useState(false);
  const { subSectionId } = useParams();
  const { sectionName, subSection } = section;
  console.log(showSection);
  console.log(subSection);
  return (
    <div key={section._id} className=" mb-2">
      <div
        className={`w-full h-fit  bg-richblack-700 font-edu-sa  flex items-center justify-between
         py-3 text-pure-greys-200 px-4 cursor-pointer
        ` }
        onClick={() => setShowSection((pre) => !pre)}
      >
        <p>{sectionName.slice(0 , 30)}</p>
        <div
          className=" cursor-pointer"
          
        >
          {!showSection ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>
      <div >
      {
        showSection &&
        subSection.map((subSec, index) => (
            <SubSectionCard subSection={subSec} />)
        )
      }</div>
    </div>
  );
};

export default SectionSlideCard;
