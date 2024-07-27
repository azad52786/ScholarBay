import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  step: 1,
  courseDetails: {
    courseContent : [] , 
  },
  editCourseDetails: false,
  paymentLoading: false,
};

const CreateCourseSlice = createSlice({
  name: "CreateCourse",
  initialState: initialState,
  reducers: {
    setCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setEditCourseDetails: (state, action) => {
      state.editCourseDetails = action.payload;
    },
    setSubSection : (state , action) => {
      state.courseDetails.courseContent = action.payload;
    } , 
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
  },
});

export default CreateCourseSlice.reducer;
export const {
  setCourseDetails,
  setEditCourseDetails,
  setSubSection , 
  setStep,
  setPaymentLoading,
} = CreateCourseSlice.actions;
