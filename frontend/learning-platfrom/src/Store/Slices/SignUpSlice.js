import { createSlice } from "@reduxjs/toolkit";

const SignUpSlice = createSlice({
    name : "signup" , 
    initialState : {
        signUpData : null , 
    } , 
    reducers : {
        addSignUpDetails : (state , action) => {
            state.signUpData = action.payload ;
        } , 
        removeSignUpDetails : (state , action) => {
            state.signUpData = action.payload ;
        }
    }
})


export const {addSignUpDetails , removeSignUpDetails} =  SignUpSlice.actions;
export default SignUpSlice.reducer;