import React, { useEffect } from 'react'
import CoursePageHome from '../component/CoursePage Component/CoursePageHome'

const CoursePage = () => {

  useEffect(() => {
      window.scrollTo({
          top : 0 , 
          left : 0 , 
          behavior : 'smooth'
     })
  }, []);
    return (
    <div className=' w-full h-full '>
        <CoursePageHome />
    </div>
  )
}

export default CoursePage
