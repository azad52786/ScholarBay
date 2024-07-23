export const ACCOUNT_TYPE = {
    STUDENT: "Student",
    INSTRUCTOR: "Instructor",
    ADMIN: "Admin",
  }
  
  export const COURSE_STATUS = {
    DRAFT: "Draft",
    PUBLISHED: "Published",
  }
  
  
 export const getPathArray = (pathname) => {
    const capitalizeFirstLetter = (str) => {
      if (!str) return str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    const capitalizeArray = (arr) => {
      return arr.map(capitalizeFirstLetter);
    }
    
    return capitalizeArray(pathname.split("/"));
  }
  
export const CourseCreationData = [
  {
    step : 1 , 
    title : "Course Information" , 
  } , 
  {
    step : 2 , 
    title : "Course Builder" 
  } , 
  {
    step : 3 , 
    title : "Publish" 
  } 
]




 export const courseUploadTips = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important notes to all enrolled students at once."
  ];

