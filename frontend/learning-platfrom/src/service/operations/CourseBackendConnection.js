import toast from "react-hot-toast";
import { setLoader } from "../../Store/Slices/AuthSlice";
import { COURSE_API } from "../Api";
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
                throw new Error(responce.message);
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