import React, { useEffect, useState } from 'react'
import { buyCourse } from '../../service/operations/BuyCourseApiConnection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CourseDetailsSection from './CourseDetailsSection';
import { getEntireCourseDetails } from '../../service/operations/CourseBackendConnection';
import Loading from '../../catalogs/Loading';
import CourseContentSection from './CourseContentSection';

const CoursePageHome = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [course , setCourse] = useState([]);
    console.log(courseId)
    const { token } = useSelector((store) => store.Auth);
    const { user } = useSelector((store) => store.User)
    const buyNowHandeler = async () => {
        await buyCourse(token , [courseId] , user , navigate , dispatch , true);
    }
    
    useEffect(() => {
        const getEntireCourse  = async () => {
            let course = await getEntireCourseDetails(courseId , user?._id);
            console.log(course);
            setCourse(course.data?.data);
        }
        getEntireCourse();
    } , []);
  return course.length === 0 ? (<Loading/>) : (
  
    <div className=' w-[95%] md:w-[90%] mx-auto h-full mt-10 font-inter'>
      <CourseDetailsSection  course = {course?.course} alreadyEnrolled = {course?.alreadyEnrolled} buyNowHandeler={buyNowHandeler}/>
      <CourseContentSection courseContent = {course?.course?.courseContent}/>
    </div>
  )
}

export default CoursePageHome
