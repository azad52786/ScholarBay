import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    signUpdata : null , 
    loader : false , 
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null 
}
const AuthSlice = createSlice({
    name : "auth" , 
    initialState : initialState ,
    reducers : {
        setSignUpdata : (state , action) => {
            state.signUpdata = action.payload  
        },
        setLoader : (state , action) => {
            state.loader = action.payload 
        },
        setToken : (state , action) => {
            state.token = action.payload;
        } 
    }
})

export const {setToken , setSignUpdata , setLoader} = AuthSlice.actions;

export default AuthSlice.reducer;