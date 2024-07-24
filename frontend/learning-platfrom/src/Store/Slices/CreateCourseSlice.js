import { createSlice } from "@reduxjs/toolkit";
// course,
  //   courseDescription,
  //   whatYouWillLearn,
  //   price,
  //   tag,
  //   category,
  //   instructions,
  //   benefitOfCourse
const initialState = {
  step: 1,
  courseDetails: {
    course : null , 
    courseDescription : null,
  //   whatYouWillLearn,
    price : null,
    tag : null,
    category : null,
    instructions : null,
    benefitOfCourse : null
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
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
  },
});

export default CreateCourseSlice.reducer;
export const {
  setCourseDetails,
  setEditCourseDetails,
  setStep,
  setPaymentLoading,
} = CreateCourseSlice.actions;
