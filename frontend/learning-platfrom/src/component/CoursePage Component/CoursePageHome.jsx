import React, { useEffect, useState } from 'react'
import { buyCourse } from '../../service/operations/BuyCourseApiConnection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CourseDetailsSection from './CourseDetailsSection';
import { getEntireCourseDetails, publishCertificate, unpublishCertificate, getCertificateEligibility, downloadCertificate } from '../../service/operations/CourseBackendConnection';
import Loading from '../../catalogs/Loading';
import CourseContentSection from './CourseContentSection';
import toast from 'react-hot-toast';

const CoursePageHome = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [course , setCourse] = useState([]);
    const [eligibility, setEligibility] = useState(null);
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
            if (token && user?.accountType === 'Student') {
              const eligibilityRes = await getCertificateEligibility(courseId, token);
              setEligibility(eligibilityRes);
            }
        }
        getEntireCourse();
    } , [courseId, token, user?._id, user?.accountType]);

    const handlePublishCertificate = async () => {
        if (!token) return;
        const res = await publishCertificate(courseId, token);
        if (res?.success) {
            setCourse((prev) => ({ ...prev, course: { ...prev.course, certificatePublished: true } }));
        }
    };

    const handleUnpublishCertificate = async () => {
        if (!token) return;
        const res = await unpublishCertificate(courseId, token);
        if (res?.success) {
            setCourse((prev) => ({ ...prev, course: { ...prev.course, certificatePublished: false } }));
        }
    };

    const handleDownloadCertificate = async () => {
        if (!token) return;
        await downloadCertificate(courseId, token);
    };
  return course.length === 0 ? (<Loading/>) : (
  
    <div className=' w-[95%] md:w-[90%] mx-auto h-full mt-10 font-inter'>
      <CourseDetailsSection  course = {course?.course} alreadyEnrolled = {course?.alreadyEnrolled} buyNowHandeler={buyNowHandeler}/>
      {user?.accountType === 'Student' && (
        <div className='mt-6 rounded-lg border border-richblack-700 bg-richblack-800 p-4'>
          <h3 className='text-lg font-semibold text-yellow-50'>Certificate Status</h3>
          <p className='mt-2 text-sm text-richblack-100'>Progress: {eligibility?.percentage ?? 0}%</p>
          <p className='text-sm text-richblack-100'>Completed lessons: {eligibility?.completedCount ?? 0}/{eligibility?.totalLessons ?? 0}</p>
          <p className='text-sm text-richblack-100'>{eligibility?.message || 'Complete the course to unlock the certificate.'}</p>
          <button
            type='button'
            disabled={!eligibility?.isEligible}
            onClick={handleDownloadCertificate}
            className={`mt-3 rounded-md px-4 py-2 ${eligibility?.isEligible ? 'bg-yellow-50 text-richblack-900' : 'cursor-not-allowed bg-richblack-700 text-richblack-400'}`}
          >
            Download Certificate
          </button>
        </div>
      )}
      {user?.accountType === 'Instructor' && (
        <div className='mt-6 rounded-lg border border-richblack-700 bg-richblack-800 p-4'>
          <h3 className='text-lg font-semibold text-yellow-50'>Certificate Publishing</h3>
          <p className='mt-2 text-sm text-richblack-100'>Publish or unpublish the certificate for this course.</p>
          <div className='mt-3 flex gap-3'>
            <button type='button' onClick={handlePublishCertificate} className='rounded-md bg-yellow-50 px-4 py-2 text-richblack-900'>Publish Certificate</button>
            <button type='button' onClick={handleUnpublishCertificate} className='rounded-md bg-richblack-700 px-4 py-2 text-richblack-100'>Unpublish Certificate</button>
          </div>
        </div>
      )}
      <CourseContentSection courseContent = {course?.course?.courseContent}/>
    </div>
  )
}

export default CoursePageHome
