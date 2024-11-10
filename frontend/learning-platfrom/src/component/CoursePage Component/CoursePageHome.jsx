import React, { useEffect, useState } from 'react'
import { buyCourse } from '../../service/operations/BuyCourseApiConnection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CourseDetailsSection from './CourseDetailsSection';
import { getEntireCourseDetails } from '../../service/operations/CourseBackendConnection';
import Loading from '../../catalogs/Loading';
import CourseContentSection from './CourseContentSection';
import toast from 'react-hot-toast';

const CoursePageHome = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [course , setCourse] = useState([]);
    const { token } = useSelector((store) => store.Auth);
    const { user } = useSelector((store) => store.User)
    const buyNowHandeler = async () => {
        if(user.accountType != "Student"){
                    toast.error("Please Lon in into a Student account");
                    return;
                  }
        await buyCourse(token , [courseId] , user , navigate , dispatch , true);
    }
    
    useEffect(() => {
        const getEntireCourse  = async () => {
            let course = await getEntireCourseDetails(courseId , user?._id);
            setCourse(course?.data?.data);
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
