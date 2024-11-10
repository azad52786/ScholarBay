import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoVideocamOutline } from "react-icons/io5";


const Section = ({ section }) => {
    const [showSubSection, setShowSubSection] = useState(false);
    let { sectionName, subSection } = section;
  return (
  <div className=" w-full h-full">
      <div className=" font-inter w-full bg-richblack-700 border border-richblack-300 text-richblack-25 flex 
      items-center justify-between px-5 cursor-pointer py-3"
      onClick={() => setShowSubSection(!showSubSection)}  
      >
        <div className=" flex items-center justify-center gap-1 md:gap-3 text-sm z-10"
          
        >
          {
            !showSubSection && <IoIosArrowUp className=" w-5 h-5" />
          }
          {
            showSubSection && <IoIosArrowDown className=" w-5 h-5"/>
          }
          <p className=" text-sm md:text-lg ">{sectionName}</p>
        </div>
        <p className=" text-sm text-yellow-25">{subSection.length + " " + "Lecture(s)"}</p>
      </div>
      
      <div>
      { showSubSection && subSection.length > 0 && 
        subSection.map((subsec) => (
          <div key={subsec._id} className={` border  pr-5 py-3 border-pure-greys-400 text-sm md:text-lg
          flex items-center justify-start gap-5 text-pure-greys-200 ${showSubSection ? "sweerAnimation" : ""}`}
          >
            <IoVideocamOutline className=" w-5 h-5"/>
            <p>{subsec.title}</p>
          </div>
        ))
      }
      {
        showSubSection && subSection.length <= 0 &&
        <div className=" border  px-5 py-3 border-pure-greys-400 text-sm md:text-lg
         flex items-center justify-start gap-5 text-pure-greys-200">
           <p>No SubSection</p>
         </div>
      }
      </div>
      </div>
  );
};

export default Section;
