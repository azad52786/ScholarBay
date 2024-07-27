import React, { useState } from "react";
import { MdDeleteSweep, MdOutlineEdit } from "react-icons/md";
import { FaSortAmountDown } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { PiCaretCircleUpBold } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { TbPencilCancel } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { deleteSection } from "../../service/operations/CourseBackendConnection";

const Section = ({ section, index, setCreateSection, setValue , token }) => {
  const [show, setShow] = useState(false);
  const [editSection, setEditsection] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);
  const dispatch = useDispatch();
  const editSectionHandeler = () => {
    setEditsection(true);
    console.log(section);
    setCreateSection(false);
    setValue("sectionName", section.sectionName);
  };
  const cancelEditSectionHandeler = () => {
    setEditsection(false);
    setValue("sectionName", "");
    setCreateSection(true)
  }
  const deleteSectionHandeler = (sectionId) => {
    deleteSection(sectionId , token , dispatch)
  };
  return (
    <div key={section._id} className=" px-2 flex flex-col items-center">
      <div className="flex w-[90%] items-center justify-between font-inter p-5 border-b border-richblack-500">
        <div className="flex items-center">
          <FaSortAmountDown className=" h-4 w-8 text-[#6E727F]" />
          <div className=" text-[#C5C7D4] text-[16px]">
            {section?.sectionName}
          </div>
        </div>
        <div className=" flex items-center justify-center text[#6E727F]">
          {!editSection ? (
            <MdOutlineEdit
              className=" h-6 w-10 cursor-pointer "
              onClick={editSectionHandeler}
            />
          ) : (
            <TbPencilCancel className=" h-6 w-10 cursor-pointer " 
                onClick={cancelEditSectionHandeler}
            />
          )}

          <MdDeleteSweep
            className=" h-6 w-10 cursor-pointer"
            onClick={() => deleteSectionHandeler(section._id)}
          />
          <div className=" w-[4px] text-pure-greys-400">|</div>
          {!show ? (
            <IoIosArrowDropdown
              className="h-6 w-5 cursor-pointer"
              onClick={() => console.log("hi", section._id)}
            />
          ) : (
            <PiCaretCircleUpBold className="h-6 w-5 cursor-pointer" />
          )}
        </div>
      </div>
      {
        // itrate all the subSection Array
      }
      <div className="flex w-[90%] items-center justify-between font-inter px-10 py-2 border-b border-richblack-500">
        <div className="flex items-center">
          <FaSortAmountDown className=" h-4 w-8 text-[#6E727F]" />
          <div className=" text-[#C5C7D4] text-[16px]">
            {section?.sectionName}
          </div>
        </div>
        <div className=" flex items-center justify-center text[#6E727F] text-pure-greys-300">
          <MdOutlineEdit className=" h-6 w-10 cursor-pointer " />
          <MdDeleteSweep className=" h-6 w-10 cursor-pointer" />
        </div>
      </div>
      <button className=" px-2 py-2 my-2 text-[12px] text-yellow-100 flex w-fit items-center justify-center gap-x-3 border border-yellow-50 rounded-md">
        <FiPlusCircle /> Add New SubSection
      </button>
    </div>
  );
};

export default Section;
