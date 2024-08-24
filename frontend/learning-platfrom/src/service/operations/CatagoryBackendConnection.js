import toast from "react-hot-toast";
import { CATAGORY_APIS } from "../Api";
import Apiconnection from "../Apiconnection";

export const getAllCatagoryDetails = async ( formData , token ) => {
    try{    
        let response = await Apiconnection(
            "post" , 
            CATAGORY_APIS.CATAGORY_PAGE_DETAILS, 
            formData , 
            {
                'Content-Type' : 'application/json' , 
                'Authorization' : `Bearer ${token}`
            } 
        );
        // return response
        if(!response.data.success){
            toast.error("Sorry Something Went Wrong . please Try Again 🙇")
        }
        console.log(response)
        return response?.data;
    }catch(e){
        // toast.error(e.response.data.message);
        console.log(e);
    }
}