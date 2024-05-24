import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {countyCode} from '../../data/countrycode'
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../service/operations/BackendConnection';
const ContactUsForm = () => {
    const dispatch = useDispatch();
    
    const {
      register,
      handleSubmit,
      reset , 
      formState: { errors , isSubmitSuccess },
    } = useForm();
    
    useEffect(() => {
      reset({
        firstName : "" , 
        lastName : "" , 
        email : "" , 
        phoneNo : "" , 
        message : ""
      })
    } , [reset , isSubmitSuccess]);

    const submitHandeler = (data) => {
      dispatch(sendMessage(data));
      reset({
        firstName : "" , 
        lastName : "" , 
        email : "" , 
        phoneNo : "" , 
        message : ""
      })
    }
  return (
    <form onSubmit={handleSubmit(submitHandeler)}
      className=' text-[16px] flex flex-col gap-6 justify-center'
    >
      <div className=' flex justify-between w-full'>
        <div className=' flex flex-col gap-2 w-[48%]'>
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            name="firstName" 
            id="firstName"
            placeholder='Enter your first Name'
            className=' p-3 rounded-lg bg-richblack-700 border-b border-richblack-300 text-pure-greys-100 text-[18px]'
            {...register('firstName' , {required : true , maxLength: 80})}
            />
            {errors.firstName && <span>First name is required.</span>}
        </div>
        <div className=' flex flex-col gap-2 w-[48%]'>
          <label htmlFor="lastName">last Name</label>
          <input 
            type="text" 
            name="lastName" 
            id="lastName"
            placeholder='Enter your last Name'
            className=' p-3 rounded-lg bg-richblack-700 border-b border-richblack-300 text-pure-greys-100 text-[18px]'
            {...register('lastName' , {required : true , maxLength: 80})}
            />
            {errors.lastName && <span>Last name is required.</span>}
        </div>
      </div>
      <div className=' flex flex-col gap-2'>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            placeholder='abcd@gmail.com'
            className=' p-3 rounded-lg bg-richblack-700 border-b border-richblack-300 text-pure-greys-100 text-[18px]'
            {...register('email' , {required : true , pattern: /^\S+@\S+$/i})}
            />
            {errors.email && <span>email is required.</span>}
        </div>
        <div className=' flex flex-col gap-2'>
            <label htmlFor="phoneNo">Phone No</label>
            <div className=' flex gap-5'>
              <select
              className=' p-3 rounded-lg bg-richblack-700 border-b border-richblack-300 w-[25%] text-pure-greys-100 text-[18px]'
              >
                {/* dropdown  */}
                {
                  countyCode.map((ele , index) => (
                      <option
                        key = {index} value = {ele.code}
                      >
                        {ele.code} - {ele.country}
                      </option>
                  ))
                }
              </select>
              <input 
                type="number" 
                name="phoneNo" 
                id="phoneNo" 
                placeholder='12345 67890'
                className=' p-3 rounded-lg bg-richblack-700 border-b border-richblack-300 w-[80%] text-pure-greys-100 text-[18px]'
                {...register('phoneNo' , {
                    required : {value : true , message : "Please Enter Phone No"},
                    maxLength : {value : 10 , message : "Maximum len of phone no is 10"},
                    minLength : {value : 10 , message : "Minimum len of phone no is 10"}
                }
                )}
                />
                {
                  errors.phoneNo && <span>{errors.message}</span>
                }
            </div>
              </div>
            <div className=' flex flex-col gap-2'>
              <label htmlFor="message">Message</label>
              <textarea
                id='message'
                name='message'
                row='10'
                col='30'
                className=' resize-none p-3 rounded-lg bg-richblack-700 border-b border-richblack-300 min-h-32 text-pure-greys-100 text-[18px]'
                {...register('message' , {required : true})}
              />
               {
                  errors.message && <span>Please Enter your message</span>
                }
            </div>
            <button type="submit" className="mt-4 w-full bg-yellow-50 p-3 text-richblack-900 rounded-lg text-center">
                Send Message
            </button>
    </form>
  )
}

export default ContactUsForm