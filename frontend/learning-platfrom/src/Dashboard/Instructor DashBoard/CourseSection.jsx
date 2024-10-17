import React from 'react'
import Spinner from './SpinnerInstructor'
import { Link } from 'react-router-dom'

const CourseSection = ({courses}) => {
  console.log(courses)
  return !courses ? (<div className=" w-full h-[200px] items-center justify-center my-12">
      <Spinner/>
    </div>) :  (
    <div className='my-12 bg-richblack-800 p-5 rounded-md'>
    <div className=' flex items-center justify-between w-full mb-4'>
      <h1 className=' font-semibold lg:font-bold text-2xl md:text-3xl text-[#0066FF]'>Your Courses</h1>
    <Link to="/dashboard/default/my-courses"><div className=' text-yellow-50 text-sm '>See All</div></Link>
    </div>
    
    <div className=' w-full h-fit grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 md:gap-0'>
      {
        courses.map((course) => (

          <div className=' w-[80%] mx-auto md:w-[90%]'>
            <img src={course?.thumbnail} alt='thumbnail' className=' w-full h-[200px] rounded-md bg-cover bg-center'/>
            <p className=' font-light text-richblack-50 mb-2'>{course.courseName}</p>
            <p className=' text-sm text-richblack-400'>Total Student : {course.totalStudentsEnrolled} | ₹ {course.price}</p>
          </div>
        ))
      }
    </div></div>
  )
}

export default CourseSection
