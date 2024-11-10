import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

import SubSectionCard from "./SubSectionCard";


const SectionSlideCard = ({ index , section , courseProgress }) => {

  const [showSection , setShowSection ] = useState(false);
  const { sectionId } = useParams();
  const { sectionName, subSection } = section;
  
  
  useEffect(() => {
    if(sectionId === section._id) setShowSection(true);
    else setShowSection(false);
  } , [sectionId]);
  
  return (
    <div key={index} className=" mb-2"
      
    >
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
            <SubSectionCard index={index} courseProgress={courseProgress} subSection={subSec} section_id = {section._id} />)
        )
      }</div>
    </div>
  );
};

export default SectionSlideCard;
