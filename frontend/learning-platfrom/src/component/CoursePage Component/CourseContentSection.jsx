import React from 'react'
import Section from './Section'

const CourseContentSection = ({courseContent}) => {
    console.log(courseContent)
  return (
    <div className=' lg:w-[50%] w-full h-full font-inter flex flex-col gap-3 mt-10 md:mt-0 lg:mt-[-100px]'>
      <p className=' text-richblack-50 lg:text-3xl  md:text-3xl font-bold sm:text-2xl'>Course Content</p>
      <div className=' w-full flex  items-center justify-between text-xl'>
            <p className=' w-fit h-fit text-richblack-25'>{courseContent?.length} Section(s) </p>
            <p className=' text-yellow-100'>Collapse all sections</p>
      </div>
      <div>
        {
          courseContent?.map((section, index) => (
            <Section section= {section} key={section._id}/>
          ))
        }
        {
          courseContent.length <= 0 && 
           <div className=" border-2 bg-richblack-500  px-5 py-3 border-pure-greys-400 text-sm md:text-lg
           flex items-center justify-center text-yellow-25 font-bold">
             <p> No Section Found </p>
           </div>
        }
      </div>
    </div>
  )
}

export default CourseContentSection
