import React, { useEffect, useState } from 'react'
import { buyCourse } from '../../service/operations/BuyCourseApiConnection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CourseDetailsSection from './CourseDetailsSection';
import { getEntireCourseDetails, getSimilarCourses } from '../../service/operations/CourseBackendConnection';
import Loading from '../../catalogs/Loading';
import CourseContentSection from './CourseContentSection';
import toast from 'react-hot-toast';
import SimilarCoursesSection from './SimilarCoursesSection';

const CoursePageHome = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [course , setCourse] = useState(null);
  const [similarCourses, setSimilarCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
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
        const loadCourseData = async () => {
            setIsLoading(true);
            setLoadError("");
            const [courseResponse, similarResponse] = await Promise.all([
              getEntireCourseDetails(courseId , user?._id),
              getSimilarCourses(courseId),
            ]);
            if (!courseResponse?.data?.data) {
              setCourse(null);
              setLoadError("We couldn't load this course right now.");
              setIsLoading(false);
              return;
            }
            setCourse(courseResponse.data.data);
            setSimilarCourses(similarResponse?.similarCourses || []);
            setIsLoading(false);
        }
        loadCourseData();
    } , [courseId, user?._id]);
  if (isLoading) {
    return <Loading />;
  }

  if (loadError) {
    return (
      <div className="mx-auto mt-16 w-[95%] max-w-3xl rounded-2xl border border-richblack-700 bg-richblack-800 p-8 text-center text-richblack-25">
        <p className="text-2xl font-semibold text-richblack-5">Course unavailable</p>
        <p className="mt-3 text-sm text-richblack-300">{loadError}</p>
      </div>
    );
  }

  return (
  
    <div className=' w-[95%] md:w-[90%] mx-auto h-full mt-10 font-inter'>
      <CourseDetailsSection  course = {course?.course} alreadyEnrolled = {course?.alreadyEnrolled} buyNowHandeler={buyNowHandeler}/>
      <CourseContentSection courseContent = {course?.course?.courseContent}/>
      <SimilarCoursesSection baseCourse={course?.course} similarCourses={similarCourses} />
    </div>
  )
}

export default CoursePageHome
