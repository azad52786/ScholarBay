import React, { useEffect, useState } from 'react'
import Apiconnection from '../service/Apiconnection';
import { COURSE_API } from '../service/Api';
import { useSelector } from 'react-redux';

const useUserCourse = () => {
    const { token } = useSelector((store) => store.Auth)
    const [data , setData] = useState(null);
    
    const fetchData = async() => {
        try{
            const responce = await Apiconnection(
                "GET" , 
                COURSE_API.GET_ALL_USER_ENROLLED_COURSE , 
                null , 
                {
                    "Authorization" : `Bearer ${token}` 
                }
            )
            
            setData(responce.data.courses)
        }catch(e){
            console.error("Error fetching courses:", e);
        }
        
    }
  useEffect(() => {
    fetchData();
  } , [])
  return data;
}

export default useUserCourse
