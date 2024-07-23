
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ErrorMessageComponent from './ErrorMessageComponent';
import { FaRupeeSign } from "react-icons/fa6";
import { COURSE_API } from '../../service/Api';
import Apiconnection from '../../service/Apiconnection';
import toast from 'react-hot-toast';
import { BiSolidAddToQueue } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";





const CreateCourseForm = () => {
    const { editCourseDetails ,  courseDetails } = useSelector((store) => store.CourseData);
    const [tags , setTags] = useState([]);
    const [catagoryArray , setCatagoryArray] = useState([]);
    const { register , getValues , setValue , formState : {errors} , handleSubmit } = useForm({
        criteriaMode: "all"
    })
    
    async function fetchAllTags(){
        try{
            const result = await Apiconnection('get' , COURSE_API.GET_ALL_TAGS );
            setTags(result.data.tags);
            console.log(tags)
        }catch(e){
            toast.error("Error occur while fetching tags")
            console.log(e);
        }
    }
    function addCatagroyHandeler(){
        let newValue = getValues("category");
        if(newValue.length === 0) return ;
        console.log(newValue)
        setCatagoryArray([...catagoryArray , newValue]);
        setValue("category" , "");
    }
    function removeCatagoryHandeler(index){
        console.log(index);
        let newArray = [...catagoryArray]
        console.log(newArray)
        newArray.splice(index , 1);
        setCatagoryArray(newArray);
    }
    useEffect(()=>{
        fetchAllTags()
    } , [])
    // course,
    //   courseDescription,
    //   whatYouWillLearn,
    //   price,
    //   tag,
    //   category,
    //   instructions,
    //   benefitOfCourse
  return (
    <div className=' h-full w-full mt-6'>
        <form className=' bg-richblack-800 w-[93%] mr-3 mx-auto h-fit rounded-md border border-pure-greys-600
            p-6 pr-12 text-pure-greys-25 font-inter'
                onSubmit={handleSubmit((data) => {
                    console.log(data)
                })}
            >
            <div className=' w-full h-fit flex gap-y-1 flex-col mb-3 text-pure-greys-100'>
                <label htmlFor="course"
                    className = "text-pure-greys-25"
                >Course Title <sup className=' text-red'>*</sup></label>
                <input
                    id="course"
                    className=' h-11 rounded-md p-2 bg-richblack-600 '
                    placeholder='Enter Course Title'
                    {
                        ...register("course" , {
                            required : {
                                value : true , 
                                message :  "This input is required." 
                            }
                        })
                    }
                />
                <ErrorMessageComponent
                    errors={errors}
                    name = "course" />
            </div>
            <div className=' w-full h-fit flex gap-y-1 mb-3 flex-col text-pure-greys-100'>
                <label htmlFor="courseDescription"
                    className = "text-pure-greys-25"
                    >
                Course Description <sup className=' text-red mb-1'>*</sup></label>
                <textarea
                    id="courseDescription"
                    className=' h-11 rounded-md p-2 bg-richblack-600 resize-none'
                    placeholder='Enter Course Description'
                    {
                        ...register("courseDescription" , {
                            required : {
                                value : true , 
                                message :  "This input is required." 
                            }
                        })
                    }
                />
                <ErrorMessageComponent
                    errors={errors}
                    name = "courseDescription" />
            </div>
            <div className=' w-full h-fit flex gap-y-1 mb-3 flex-col relative text-pure-greys-100'>
                <label htmlFor="price"
                    className = "text-pure-greys-25"
                    >
                    Price <sup className=' text-red mb-1'>*</sup></label>
                    {/* <RiMoneyRupeeCircleFill className /> */}
                    <div className=' relative w-full h-full'>
                    <FaRupeeSign className=' absolute w-9 aspect-square top-[27%]' />
                        <input
                            id="price"
                            className=' h-11 w-full rounded-md pl-8 p-2 bg-richblack-600 resize-none'
                            placeholder='Enter Course Price'
                            {
                                ...register("price" , {
                                    required : {
                                        value : true , 
                                        message :  "This input is required." 
                                    } , 
                                    pattern : {
                                        value: /\d+/,
                                        message: "This input is number only."
                                    }
                                })
                            }
                        />
                    </div>
                <ErrorMessageComponent
                    errors={errors}
                    name = "price" />
            </div>
            <div className=' w-full h-fit flex gap-y-1 flex-col mb-3 '>
                <label htmlFor="tag"
                    className = "text-pure-greys-25"
                >Choose your Tag <sup className=' text-red'>*</sup></label>
                <select
                    id="tag"
                    className=' h-11 rounded-md p-2 bg-richblack-600 text-pure-greys-100 '
                    placeholder='Enter Course Tag of the Course'
                    {
                        ...register("tag" , {
                            required : {
                                value : true , 
                                message :  "This input is required." 
                            }
                        })
                    }
                >
                    <option disabled>
                        Choose your Option
                    </option>
                   { 
                       tags.map((tag , index) => (
                            <option value={tag.name} key={tag.name}>{tag.name}</option>
                       ))
                    }
                </select>
                <ErrorMessageComponent  
                    errors={errors}
                    name = "tag" />
            </div>
            <div className=' w-full h-fit flex gap-y-1 flex-col mb-3 text-pure-greys-100'>
                <label htmlFor="category"
                    className = "text-pure-greys-25"
                >Catagorys <sup className=' text-red'>*</sup></label>
                <div className='flex flex-wrap gap-4'>
                    {
                        catagoryArray.map((catagory , index) => (
                            <div key={index} className=' flex  w-fit h-fit p-1 px-2 bg-yellow-500 rounded-3xl gap-1 items-center'>
                                <div className=''>
                                    {catagory}
                                </div>
                                <RxCross2 className=' cursor-pointer'
                                    onClick={() => {
                                        removeCatagoryHandeler(index)
                                    }}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className=' relative w-full h-full'>
                        <input
                            id="category"
                            className=' h-11 w-full rounded-md pr-8 p-2 bg-richblack-600 resize-none'
                            placeholder='Enter Course Category'
                            {
                                ...register("category" , {
                                    required : {
                                        value : true , 
                                        message :  "This input is required." 
                                    } , 
                                    pattern : {
                                        value: /\d+/,
                                        message: "This input is number only."
                                    }
                                })
                            }
                        />
                        <BiSolidAddToQueue className=' absolute w-9 aspect-square top-[27%] right-0
                             cursor-pointer text-yellow-25' 
                            onClick={addCatagroyHandeler}
                            />
                </div>
                <ErrorMessageComponent
                    errors={errors}
                    name = "category" />
            </div>
            
            <div className=' w-full h-fit flex gap-y-1 flex-col mb-3 text-pure-greys-100'>
                <label htmlFor="course"
                    className = "text-pure-greys-25"
                >Course Title <sup className=' text-red'>*</sup></label>
                <input
                    id="course"
                    className=' h-11 rounded-md p-2 bg-richblack-600 '
                    placeholder='Enter Course Title'
                    {
                        ...register("course" , {
                            required : {
                                value : true , 
                                message :  "This input is required." 
                            }
                        })
                    }
                />
                <ErrorMessageComponent
                    errors={errors}
                    name = "course" />
            </div>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default CreateCourseForm
