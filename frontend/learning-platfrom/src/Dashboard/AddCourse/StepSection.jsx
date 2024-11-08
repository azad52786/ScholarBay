import React from 'react'
import { FaCheck } from 'react-icons/fa'

const StepSection = ({CourseCreationData , step}) => {
  return (
    <div className=' w-[90%] mx-auto mt-6 flex font-edu-sa '>
      {
        CourseCreationData.map((CreateData , index) => (
            <div className=' w-[30%] h-full flex flex-col items-center justify-between md:mr-1 gap-y-3' key={index}>
                <div className=' w-full h-full flex items-center justify-between' >
                    {
                        CreateData.step > 1 ? (<div className={`h-1 flex items-center justify-center border-b-2 
                        ${CreateData.step <= step ? "border-yellow-5" : "border-richblack-700"} w-[40%] border-dashed`}></div>)
                        : (<div className=' w-[40%] h-1'></div>)
                    }
                    <div
                    className={`${step === CreateData.step 
                        ? "bg-yellow-900 border-yellow-50 text-yellow-50 border-2 border-dashed" 
                        : CreateData.step < step ? "bg-yellow-900 border-yellow-5 text-yellow-50 border-2" 
                        : "border-richblack-700 bg-richblack-800 text-richblack-300 border-2 border-dashed"} 
                        rounded-full p-1 w-9 h-9 ml-1 mr-1 aspect-square flex items-center justify-center `}
                >
                    {
                        CreateData.step < step ? (<FaCheck/>)  : (CreateData.step)
                    }
                </div>
                {
                        CreateData.step < 3 ? <div className={`h-1 flex items-center justify-center border-b-2 
                        ${CreateData.step < step ? "border-yellow-5" : "border-richblack-700"} w-[40%]  border-dashed`}></div>
                        : (<div className=' w-[40%] h-1'></div>)
                }
            </div>
            <div className={`text-xs ${step === CreateData.step ?"text-pure-greys-25" : "text-pure-greys-200"}  `}>{CreateData.title}</div>
        </div>
            
        ))
      }
    </div>
  )
}

export default StepSection
