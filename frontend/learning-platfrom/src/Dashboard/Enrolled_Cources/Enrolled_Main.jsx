import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserAllCources } from '../../service/operations/BackendConnection';
import CourseCard from './CourseCard';
import MainUi from './MainUi';

const Enrolled_Main = () => {
     const [enrolledCourses , setEnrolledCourses] = useState(null);
     const { token } = useSelector((store) => store.Auth);
     const getAllenrollcourses = async() => {
        const data = await getUserAllCources(token);
        setEnrolledCourses(data?.data);
        console.log(enrolledCourses);
     }
     useEffect(() =>{
      getAllenrollcourses();
     }, []);
    


  return (
    <div className=' w-full h-full flex flex-col gap-y-3'>
      <h1 className=' ml-4 mt-5 text-2xl text-pure-greys-50 font-bold font-inter'>Enrolled Courses</h1>
        {
          !enrolledCourses 
          ? (<div className='text-center w-full'>Loading...</div>) 
          : enrolledCourses.length === 0 
          ? (<div>No Courses Available</div>) 
          : (<MainUi/>)
        }
    </div>
  )
}

export default Enrolled_Main
