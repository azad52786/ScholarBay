import React from 'react'
import { buyCourse } from '../../service/operations/BuyCourseApiConnection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const CoursePageHome = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(courseId)
    const { token } = useSelector((store) => store.Auth);
    const { user } = useSelector((store) => store.User)
    const buyNowHandeler = async () => {
        await buyCourse(token , [courseId] , user , navigate , dispatch , true);
    }
  return (
    <div>
      <button
        onClick={buyNowHandeler}
      >Buy Now</button>
    </div>
  )
}

export default CoursePageHome
