import React, { useEffect, useRef } from "react";
import { CourseCreationData } from "../../utils/constants";
import { courseUploadTips } from "../../utils/constants";
import CreateCourseForm from "./CreateCourseForm";
import { useDispatch, useSelector } from "react-redux";
import StepSection from "./StepSection";
import { setEditCourseDetails, setStep } from "../../Store/Slices/CreateCourseSlice";
import SectionHome from "../Addsections/SectionHome";
import PublishHome from "../PublishSection/PublishHome";
export default function AddCourse(){
    const { step , editCourseDetails } = useSelector((store) => store.CourseData);
    const dispatch = useDispatch();
    let formRef = useRef(null);
    
    useEffect(() => {

        window.scrollTo({top : 0, left : 0 , behavior: "smooth"});
        
    } , [step])
    
    useEffect(() => {
        return () => {
            dispatch(setEditCourseDetails(false))
            dispatch(setStep(1));
        }
    }, [])
    
    return (
        <div className="w-full  h-full flex md:flex-row flex-col-reverse  gap-5 mt-6 ">
            <div className=" w-[90%] mx-auto md:mx-0l md:w-[60%] mb-8">
                <div className=" w-full text-center text-2xl text-pure-greys-25 font-bold font-edu-sa">
                {!editCourseDetails ? "Add Course" : "Edit Course"}</div>
                <StepSection CourseCreationData = { CourseCreationData } step = {step}/>
                { step === 1 && <CreateCourseForm/> }
                { step === 2 && <SectionHome/> }
                { step === 3 && <PublishHome/>}
            </div>
            {
            !editCourseDetails && 
                <div className=" w-[90%] mx-auto md:w-[30%] flex items-center justify-center md:items-start">
                <div className=" w-fit h-fit p-6  bg-richblack-700 rounded-md text-start border border-pure-greys-500 font-edu-sa">
                   <div className=" text-lg text-[#50c4d5] font-bold mb-4">⚡Course Upload Tips</div>
                   <ul style={{"listStyleType":"circle"}} className=" text-sm text-pure-greys-100 pl-4">
                        {
                            courseUploadTips.map((tips , index) => (
                                <li key={ index} className=" text-xs mb-2">{tips}</li>
                            ))
                        }
                   </ul>
                </div>
            </div>
            }
            
        </div>
    )
}