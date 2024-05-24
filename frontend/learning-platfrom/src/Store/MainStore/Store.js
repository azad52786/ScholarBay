import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../Slices/AuthSlice'
import ProfileSlice from '../Slices/ProfileSlice';
import CartSlice from '../Slices/CartSlice';
import SignUpSlice from '../Slices/SignUpSlice';
const store = configureStore({
    reducer : {
        Auth : AuthSlice , 
        User : ProfileSlice , 
        Cart : CartSlice , 
        SignUpData : SignUpSlice , 
    }
})

export default store;