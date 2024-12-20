import React, { useState } from "react";
import { MdDeleteSweep, MdOutlineEdit } from "react-icons/md";
import { FaSortAmountDown } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { PiCaretCircleUpBold } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { TbPencilCancel } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { deleteSection , deleteSubSection, deleteSubSectionApi } from "../../service/operations/CourseBackendConnection";
import {
  setEditSubSection,
  setIndexOfSection,
  setSectionId,
  setShowSubSectionForm,
  setSubSection,
} from "../../Store/Slices/SubSectionSlice";
import { setCourseDetails } from "../../Store/Slices/CreateCourseSlice";

const Section = ({
  section,
  index,
  setShowCreateSection,
  setValue,
  token,
  editSectionName,
  setEditSectionId,
  editSectionbtn,
  setEditSectionName,
}) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { subSection: subSections } = section;
  const { courseDetails } = useSelector((store) => store.CourseData);
  const [ showSubSection , setShowSubSection ] = useState(false);
  const editSectionHandeler = () => {
    setEditSectionId(section._id);
    setEditSectionName(section.sectionName);

    setShowCreateSection(false);
    setValue("sectionName", section.sectionName);
  };
  const cancelEditSectionHandeler = () => {
  
    setEditSectionId(-1);
    setEditSectionName("");
    setValue("sectionName", "");
    
    
    setShowCreateSection(true);
  };
  const deleteSectionHandeler = (sectionId , sectionName) => {
    if(sectionName === editSectionName){
      setValue('sectionName' , '');
      setShowCreateSection(true)
    }
    deleteSection(sectionId, token, dispatch);
  };
  const editSubsection = (sectionId , subSection) => {
    dispatch(setSubSection(subSection));
    dispatch(setShowSubSectionForm(true))
    dispatch(setEditSubSection(true));
    dispatch(setSectionId(sectionId))
  }
  const deleteSubsectionHandeler = async (sectionId) => {

    let formData = new FormData();;
    formData.append("courseId" , courseDetails._id);

    const response = await deleteSubSectionApi(formData , token , sectionId);
    if(response.length > 0) dispatch(setCourseDetails(response))
    
  }
  return (
    <div key={index} className="px-1 md:px-2 flex flex-col items-center">
      <div className="flex w-[97%] md:w-[90%] items-center justify-between font-inter p-1 md:p-5 border-b border-richblack-500">
        <div className="flex items-center py-2">
          <FaSortAmountDown className=" h-4 w-8 mr-1 text-[#6E727F]" />
          <div className=" text-[#C5C7D4] text-[12px] md:text-[16px]">
            {section?.sectionName}
          </div>
        </div>
        <div className=" flex items-center justify-center gap-1 text[#6E727F]">
          {!editSectionbtn ? (
            <MdOutlineEdit
              className=" w-6 h-6 md:w-10 cursor-pointer text-[#f743f1]"
              onClick={editSectionHandeler}
            />
          ) : (
            <TbPencilCancel
              className="w-6 h-6 md:w-10 cursor-pointer text-caribbeangreen-200"
              onClick={cancelEditSectionHandeler}
            />
          )}

          <MdDeleteSweep
            className=" h-6 w-6 md:w-10 cursor-pointer text-[#a9f743]"
            onClick={() => deleteSectionHandeler(section._id , section.sectionName)}
          />
          <div className=" w-[4px] text-pure-greys-400 mr-2">|</div>
          {!showSubSection ? (
            <IoIosArrowDropdown
              className="h-6 w-5 cursor-pointer "
              onClick={() => setShowSubSection(true)}
            />
          ) : (
            <PiCaretCircleUpBold className="h-6 w-5 cursor-pointer text-caribbeangreen-300" 
              onClick={() => setShowSubSection(false)}
            />
          )}
        </div>
      </div>
      {
        showSubSection && 
        
      subSections.map((subSection, index) => (
        <div className="flex w-[97%] md:w-[90%] items-center justify-between font-inter px-3  md:px-10 py-2 border-b border-richblack-500">
          <div className="flex items-center">
            <FaSortAmountDown className=" h-4 w-8 mr-1 text-[#6E727F]" />
            <div className=" text-[#C5C7D4] text-[12px] md:text-[16px]">
              {subSection?.title}
            </div>
          </div>
          <div className=" flex items-center justify-center text[#6E727F] text-pure-greys-300">
            <MdOutlineEdit className=" h-5 w-5 md:w-10 cursor-pointer mr-1 " 
                onClick={() => editSubsection(section._id , subSection)}
            />
            <MdDeleteSweep className=" h-5 w-5 md:w-10 cursor-pointer" 
              onClick={() => deleteSubsectionHandeler(subSection._id)}
            />
          </div>
        </div>
      ))}

      {/* */}
      <div
        type="text"
        className=" px-2 py-2 my-2 text-[12px] text-yellow-100 flex w-fit items-center justify-center gap-x-3 
      border border-yellow-50 rounded-md cursor-pointer"
        onClick={() => {
          dispatch(setShowSubSectionForm(true));
          dispatch(setSectionId(section._id));
        }}
      >
        <FiPlusCircle /> Add New SubSection
      </div>
    </div>
  );
};

export default Section;
