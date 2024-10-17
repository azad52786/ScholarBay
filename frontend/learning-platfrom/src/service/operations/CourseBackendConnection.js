import toast from "react-hot-toast";
import { setLoader } from "../../Store/Slices/AuthSlice";
import { COURSE_API, INSTRUCTOR_DASHBOARD_API } from "../Api";
import Apiconnection from "../Apiconnection";
import { setCourseDetails, setStep } from "../../Store/Slices/CreateCourseSlice";

export const createCourse = (formData , token ) => {
    return async(dispatch) => {
        const toastId = toast.loading("Creating Course Please Wait.....")
        try{
            const responce = await Apiconnection(
                    "POST" ,
                    COURSE_API.CREATE_COURSE , 
                    formData, 
                    {
                        'Content-Type' : 'multipart/form-data',
                        "Authorization" : `Bearer ${token}` , 
                    })
                    
            console.log(responce.data.course)
            toast.dismiss(toastId)
            if(!responce.data.success){
                toast.error("Failed to Createing Course Please try again")
                throw new Error("Error Occure While Createing Course");
            }
            toast.success("Course is Successfully Created😍😍")
            dispatch(setCourseDetails(responce.data.course));
            dispatch(setStep(2));
        }catch(e)  {
            toast.dismiss(toastId);
            console.log("error messase is" , e);
            toast.error(e.response.data.message);
        }
        
    }
}
export const updateCourseDetails = (formData , token ) => {
    return async(dispatch) => {
        const toastId = toast.loading("Updateing the Course Details.....")
        try{
            const responce = await Apiconnection(
                    "POST" ,
                    COURSE_API.UPDATE_COURSE , 
                    formData, 
                    {
                        'Content-Type' : 'multipart/form-data',
                        "Authorization" : `Bearer ${token}` , 
                    })
                    
            console.log(responce)
            toast.dismiss(toastId)
            if(!responce.data.success){
                toast.error("Failed to Createing Course Please try again")
                throw new Error(responce.message);
            }
            toast.success("Course is Successfully Updated😍😍")
            dispatch(setCourseDetails(responce.data.upDatedcourse));
            dispatch(setStep(2));
        }catch(e)  {
            toast.dismiss(toastId);
            console.log("error messase is" , e);
            toast.error(e.response.data.message);
        }
        
    }
}

export const createSectionCall = async(data , token , dispatch) => {
    const toastId = toast.loading("Section is Creating.....🙂")
    try{
        const responce = await Apiconnection(
        "POST" , 
        COURSE_API.CREATE_SECTION , 
        data , 
        {
            'Content-Type' : 'application/json' , 
            "Authorization" : `Bearer ${token}` , 
        }
        );
        console.log(responce.data)
        if(!responce.data.success){
            toast.error("Sorry Something Went Wrong . please Try Again 🙇")
            console.log("Create section return success false")
        }
        toast.dismiss(toastId)
        toast.success("Section is Successfully Created 😍");
        dispatch(setCourseDetails(responce.data.updatedCourse));
    }catch(e){
        toast.dismiss(toastId)
        toast.error(e.response.data.message);
        console.log(e);
        
    }
}

export const deleteSection = async(sectionId , token , dispatch) => {
    const toastId = toast.loading("deleting Section....🙂")
    try{
        const url = COURSE_API.DELETE_SECTION + sectionId
        const responce = await Apiconnection(
            "DELETE" , 
           url , 
           null , 
           {
                "Authorization" : `Bearer ${token}` , 
            }
        )
        if(!responce.data.success){
            toast.error("Sorry Something Went Wrong . please Try Again 🙇")
            // console.log("Create section return success false")
        }
        toast.dismiss(toastId)
        toast.success("Section is Successfully Deleted 😍");
        console.log(responce.data)
        dispatch(setCourseDetails(responce.data.updatedCourse));
    }catch(e){
        toast.dismiss(toastId)
        toast.error(e.response.data.message);
        console.log(e);
    }
}

export const updateSection = async(formData , token , dispatch) => {
    const toastId = toast.loading("Updateing Section....🙂")
    try{
        const responce = await Apiconnection(
            "POST" , 
           COURSE_API.UPDATE_SECTION , 
           formData , 
           {
                "Content-Type" : 'application/json' , 
                "Authorization" : `Bearer ${token}` , 
            }
        )
        if(!responce.data.success){
            toast.error("Sorry Something Went Wrong . please Try Again 🙇")
            // console.log("Create section return success false")
        }
        toast.dismiss(toastId)
        toast.success("Section is Successfully Deleted 😍");
        console.log(responce.data)
        return responce.data.updateSection;
    }catch(e){
        toast.dismiss(toastId)
        toast.error(e.response.data.message);
        console.log(e);
    }
}

export const createSubSection = async (data , token) => {
    let toastId = toast.loading("SubSection is Creating....😍")
    try{    
        let response = await Apiconnection(
            "post" , 
            COURSE_API.CREATE_SUBSECTION , 
            data , 
            {
                'Content-Type' : 'multipart/form-data' , 
                'Authorization' : `Bearer ${token}`
            }
        );
        if(!response.data.success){
            toast.dismiss(toastId)
            toast.error("Sorry Something Went Wrong . please Try Again 🙇")
        }
        toast.dismiss(toastId)
        toast.success("SubSection is Successfully Created 😍");
        console.log(response.data)
        return response.data;
    }catch(e){
        toast.dismiss(toastId)
        toast.error(e.response.data.message);
        console.log(e);
    }
}
export const updateSubSection = async (data , token) => {
    let toastId = toast.loading("Updateing Subsection...")
    try{    
        let response = await Apiconnection(
            "post" , 
            COURSE_API.UPDATE_SUBSECTION , 
            data , 
            {
                'Content-Type' : 'multipart/form-data' , 
                'Authorization' : `Bearer ${token}`
            }
        );
        if(!response.data.success){
            toast.dismiss(toastId)
            toast.error("Sorry Something Went Wrong . please Try Again 🙇")
        }
        toast.dismiss(toastId)
        toast.success("SubSection is Successfully Updated 😍");
        console.log(response.data)
        return response.data;
    }catch(e){
        toast.dismiss(toastId)
        toast.error(e.response.data.message);
        console.log(e);
    }
}
export const deleteSubSectionApi = async ( formData , token , subSectionId) => {
    let toastId = toast.loading("deleteing Subsection...");
    console.log(formData);
    try{    
        let response = await Apiconnection(
            "delete" , 
            COURSE_API.DELETE_SUBSECTION + `/${subSectionId}`, 
            formData , 
            {
                'Content-Type' : 'application/json' , 
                'Authorization' : `Bearer ${token}`
            } 
        );
        // return response
        if(!response.data.success){
            toast.dismiss(toastId)
            toast.error("Sorry Something Went Wrong . please Try Again 🙇")
        }
        toast.dismiss(toastId)
        toast.success("SubSection is Successfully Deleted 😍");
        console.log(response.data)
        return response.data;
    }catch(e){
        toast.dismiss(toastId)
        // toast.error(e.response.data.message);
        console.log(e);
    }
}
export const modechange = async ( formData , token , navigate) => {
    let toastId = toast.loading("Updateing Status of Course...");
    // console.log(formData);
    try{    
        let response = await Apiconnection(
            "post" , 
            COURSE_API.UPDATE_MODE, 
            formData , 
            {
                'Content-Type' : 'application/json' , 
                'Authorization' : `Bearer ${token}`
            } 
        );
        // return response
        if(!response.data.success){
            toast.dismiss(toastId)
            toast.error("Sorry Something Went Wrong . please Try Again 🙇")
        }
        toast.dismiss(toastId)
        toast.success(`your Course is ${formData.get('mode')}  😍`);
        console.log(response.data)
        navigate("/dashboard/default/my-courses")
        // return response.data;
    }catch(e){
        toast.dismiss(toastId)
        toast.error(e.response.data.message);
        console.log(e);
    }
}

export const getEntireCourseDetails = async (courseId , userId) => {
    try{
        const course = await Apiconnection('post' , COURSE_API.COURSE_DETAILS, {courseId: courseId , userId: userId});
        if(!course.data.success) {
            throw new Error(course.data.message);
        }
        return course;
    }catch(e){
        console.log(e);
        toast.error("Failed to get course details");
    }
}

export const getEnrolledCourse = async(courseId , token) => {
    try{
        const responce = await Apiconnection(
            "get",
            COURSE_API.ENROLLED_COURSE_DETAILS,
            null,
            {
              Authorization: `Bearer ${token}`,
            },
            {
              courseId,
            }
          );
          if(!responce.data.success){
            throw new Error(responce.data.message);
          }
          return responce.data.data;
    }catch(e){
        console.log(e);
        toast.error("Server Error")
        return [];
    }
}


export const getInstructorCourses = async(token) => {
   
    try{
        let courses = await Apiconnection('get' , INSTRUCTOR_DASHBOARD_API.GET_INSTRUCTOR_COURSES , null , {
            'Authorization' : `Bearer ${token}`
        })
        if(courses?.data?.success){
            return courses.data?.courses;
        }else{
            throw new Error("Instructor course fetched Failed!!")
        }
    }catch(e){
        console.log(e);
    }
    //  toast.dismiss(toastId)
    return [];
}