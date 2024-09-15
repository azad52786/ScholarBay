import { createSlice } from "@reduxjs/toolkit";
const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState: {
    courseSectionData: [],
    courseEntireData: [],
    completedLecture: [],
    totalNoOfLecture: 0,
  },
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setCourseEntireData: (state, action) => {
      state.courseEntireData = state.payload;
    },
    setTotalNoOfLecture: (state, action) => {
      state.totalNoOfLecture = action.payload;
    },
    setCompletedLecture: (state, action) => {
      state.completedLecture = action.payload;
    },
    updateCompletedLecture: (state, action) => {
      state.completedLecture = [...state.completedLecture, action.payload];
    },
  },
});

export const {
  setCourseEntireData,
  setCourseSectionData,
  setTotalNoOfLecture,
  setCompletedLecture,
  updateCompletedLecture,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
