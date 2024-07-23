import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../Slices/AuthSlice'
import ProfileSlice from '../Slices/ProfileSlice';
import CartSlice from '../Slices/CartSlice';
import SignUpSlice from '../Slices/SignUpSlice';
import CreateCourseSlice from '../Slices/CreateCourseSlice';
const store = configureStore({
    reducer : {
        Auth : AuthSlice , 
        User : ProfileSlice , 
        Cart : CartSlice , 
        SignUpData : SignUpSlice , 
        CourseData : CreateCourseSlice , 
    }
})

export default store;