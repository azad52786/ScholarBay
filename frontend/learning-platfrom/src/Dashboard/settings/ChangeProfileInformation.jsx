import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAdditionalData } from '../../service/operations/BackendConnection';

const ChangeProfileInformation = () => {
    const {user} = useSelector((store) => store.User);
    const { token } = useSelector((store) => store.Auth)
    const name = useRef("");
    const dispatch = useDispatch();
    const profession = useRef(null);
    const dateOfBirth = useRef(null);
    const [gender , setGender] = useState(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const contactNumber = useRef(null)
    const setGenderHandler = (e) => setGender(e.target.value);
    const professionData = [
        "developer" , 
        "student" , 
        "Teacher" , 
    ]
    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = {
            "gender": gender,
            "dateOfBirth": dateOfBirth.current.value , 
            "contactNumber" : contactNumber.current.value, 
            "password" : password.current.value , 
            "confirmPassword" : confirmPassword.current.value ,
        }
        profession.current.value = null;
        dateOfBirth.current.value = null;
        // setGender(null);
        password.current.value = null;
        confirmPassword.current.value = null;
        contactNumber.current.value = null;
        console.log(formData);
        dispatch(updateUserAdditionalData(formData , token));
    }
  return (
    <div className='flex justify-between w-[70%] bg-richblack-700 p-8 rounded-md items-center mb-16'>
    <form className=' flex flex-col gap-12  w-full'
        onSubmit={submitHandler}
    >
      <p className=' text-pure-greys-100 font-semibold text-2xl'>Profile Information</p>
      <div className=' flex gap-6 text-pure-greys-25'>
        <div className=' w-[50%] text-sm '>
            <label htmlFor="name" className=' font-semibold mb-3'>Display Name</label>
            <input 
                type="text" 
                id='name'
                className=' text-lg h-12 p-2 rounded-md w-[100%]'
                placeholder={user.firstName + " " + user.lastName}
                disabled
                ref={name}
            />
        </div>
        <div className=' w-[50%] text-sm '>
            <label htmlFor="profession" className=' font-semibold mb-3'> Profession </label>
            <select name="profession" id="profession" ref={profession}
                className='text-lg block w-full h-12 bg-richblack-600 rounded-md p-2 cursor-pointer'
            >
            {
                professionData.map((ele , index) => (
                    <option key={ele} value={ele}>{ele}</option>
                ))
            }
            </select>
        </div>
      </div>
      <div className=' flex gap-6 text-pure-greys-25'>
        <div className=' w-[50%] text-sm '>
            <label htmlFor="dateOfBirth" className=' font-semibold mb-3'>Date Of Birth</label>
            <input 
                type="date" 
                id='dateOfBirth'
                className=' text-lg h-12 p-2 rounded-md w-[100%] bg-richblack-600'
                ref={dateOfBirth}
            />
        </div>
        <div className=' w-[50%] text-sm '>
        <label htmlFor="gender" className='font-semibold mb-3'>Gender</label>
        <div className='bg-richblack-600 h-12 rounded-md flex gap-4 items-center justify-around'>
            <div className='flex gap-2 cursor-pointer w-fit h-fit'>
                <input 
                    type='radio' 
                    id='male' 
                    name='gender' 
                    value='Male' 
                    className='h-5 w-5 cursor-pointer' 
                    required 
                    checked = {gender === "Male"}
                    onChange={setGenderHandler}
                />
                <label htmlFor='male' className=' cursor-pointer'>Male</label>
            </div>
            <div className='flex gap-2 cursor-pointer'>
                <input 
                    type='radio' 
                    id='female' 
                    name='gender' 
                    value='Female' 
                    checked = {gender === "Female"}
                    className='h-5 w-5 cursor-pointer' 
                    onChange={setGenderHandler}
                />
                <label htmlFor='female' className=' cursor-pointer'>Female</label>
            </div>
            <div className='flex gap-2 cursor-pointer'>
                <input 
                    type='radio' 
                    id='others' 
                    name='gender' 
                    value='Others' 
                    checked = {gender === "Others"}
                    className='h-5 w-5 cursor-pointer' 
                    onChange={setGenderHandler}
                />
                <label htmlFor='others' className=' cursor-pointer'>Others</label>
            </div>
        </div>

        </div>
        </div>
        <div className=' w-[50%] text-sm '>
            <label htmlFor="number" className=' font-semibold mb-3'>Contact Number</label>
            <input 
                type="number" 
                id='number'
                className=' text-lg h-12 p-2 rounded-md w-[100%]  bg-richblack-600'
                placeholder={"12232134324"}
                ref={contactNumber}
            />
        </div>
        <div className=' flex gap-6 text-pure-greys-25'>
        <div className=' w-[50%] text-sm '>
            <label htmlFor="password" className='font-semibold mb-3'>Password</label>
            <input 
                type="password" 
                className=' text-lg h-12 p-2 rounded-md w-[100%] bg-richblack-600'
                placeholder={"******"}
                ref={password}
            />
        </div>
        <div className=' w-[50%] text-sm '>
            <label htmlFor="confirmPassword" className='font-semibold mb-3'>Confirm Password</label>
            <input 
                type="password" 
                id="confirmPassword"
                className=' text-lg h-12 p-2 rounded-md w-[100%] bg-richblack-600'
                placeholder={"******"}
                ref={confirmPassword}
            />
        </div>
        </div>
        <button className={` ml-7 font-bold text-black bg-[#FFD60A]
            w-fit h-fit py-2 px-4 rounded-md transition-all duration-250 hover:scale-95 cursor-pointer border-b-2 border-r-2 border-richblack-700 hover:border-black`}
            type='submit'
        >Submit</button>
    </form>
</div>
  )
}

export default ChangeProfileInformation
