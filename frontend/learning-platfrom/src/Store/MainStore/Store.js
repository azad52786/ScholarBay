import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../Slices/AuthSlice'
import ProfileSlice from '../Slices/ProfileSlice';
import CartSlice from '../Slices/CartSlice';
import SignUpSlice from '../Slices/SignUpSlice';
import CreateCourseSlice from '../Slices/CreateCourseSlice';
import SubsectionFormSlice from '../Slices/SubSectionSlice';
import CourseVideoSlice from '../Slices/CourseVideoSlice';
const store = configureStore({
    reducer : {
        Auth : AuthSlice , 
        User : ProfileSlice , 
        Cart : CartSlice , 
        SignUpData : SignUpSlice , 
        CourseData : CreateCourseSlice , 
        SubSectionData : SubsectionFormSlice , 
        CourseVideo : CourseVideoSlice , 
    }
})

export default store;