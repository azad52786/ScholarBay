import React from 'react'
import CourseCard from './CourseCard'

const CatagoryTopCourseSection = ({ topSellingCourses }) => {
  return (
    <div className=' w-full h-fit box-content font-inter'>
      <div className=' w-[90%] mx-auto flex flex-col'>
        <h2 class="section_heading mb-6 md:text-3xl text-xl">Frequently BoughtTogether</h2>
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-6'>
            {
                topSellingCourses.map((course , index) => (
                    <CourseCard  map={index} courseDetails={course} cardHeight = {400}/>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default CatagoryTopCourseSection
