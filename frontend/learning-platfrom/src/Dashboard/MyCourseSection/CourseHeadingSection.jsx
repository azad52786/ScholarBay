import React from 'react'

const CourseHeadingSection = () => {
  return (
    <div className=" w-full border rounded-t-md border-pure-greys-600
    flex items-center justify-between
    text-[14px] text-pure-greys-200  px-4 h-[50px]
">
    <div className="w-[65%] md:w-[70%]">COURSES</div>
    <div className=" flex-grow md:w-[30%] flex items-center justify-around gap-x-7 md:gap-x-16">
        <div 
        
        >
            PRICE
        </div>
        <div >
            ACTIONS
        </div>
    </div>
</div>
  )
}

export default CourseHeadingSection
