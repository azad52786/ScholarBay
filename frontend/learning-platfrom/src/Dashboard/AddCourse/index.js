import React from "react";
import { CourseCreationData } from "../../utils/constants";
import { courseUploadTips } from "../../utils/constants";
import CreateCourseForm from "./CreateCourseForm";
import { useSelector } from "react-redux";
import StepSection from "./StepSection";
export default function AddCourse(){
    const { step } = useSelector((store) => store.CourseData)
    return (
        <div className="w-full h-full flex  gap-5 mt-6 ">
            <div className="w-[60%]">
                <div className=" w-full text-center text-2xl text-pure-greys-25 font-bold font-inter">Add Course</div>
                <StepSection CourseCreationData = { CourseCreationData } step = {step}/>
                {step === 1 && <CreateCourseForm/>}
                
            </div>
            <div className=" w-[30%] ">
                <div className=" w-fit h-fit p-6  bg-richblack-700 rounded-md text-start border border-pure-greys-500 font-inter">
                   <div className=" text-xl font-bold mb-4">⚡Course Upload Tips</div>
                   <ul style={{"list-style-type":"circle"}} className=" text-sm text-pure-greys-100 pl-4">
                        {
                            courseUploadTips.map((tips , index) => (
                                <li key={ index} className=" mb-2">{tips}</li>
                            ))
                        }
                   </ul>
                </div>
            </div>
        </div>
    )
}