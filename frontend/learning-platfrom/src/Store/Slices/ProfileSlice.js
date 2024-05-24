import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name : "profile" , 
    initialState : {
        loader : false , 
        user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null , 
    } , 
    reducers : {
        setUser : (state , action) => {
            state.user = action.payload;
        } , 
        setLoader : (state , action) => {
            state.loader = action.payload 
        }
    }
})

export const {setUser , setLoader} = profileSlice.actions;
export default profileSlice.reducer;