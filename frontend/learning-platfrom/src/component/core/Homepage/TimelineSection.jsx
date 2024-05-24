import React, { useState } from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimeLineBox from './TimeLineBox'
import TimeLineImage from '../../../assets/Images/TimelineImage.png'
const TimelineSection = () => {
    const timeLineData = [
        {
            id : 1 , 
            logo : logo1 , 
            heading : "Leadership" , 
            comment : "Fully committed to the success company" , 
        },
        {
            id : 2 , 
            logo : logo2 , 
            heading : "Responsibility" , 
            comment : "Students will always be our top priority" , 
        },
        {
            id : 3 , 
            logo : logo3 , 
            heading : "Flexibility" , 
            comment : "The ability to switch is an important skills" , 
        },
        {
            id : 4 , 
            logo : logo4 , 
            heading : "Solve the problem" , 
            comment : "Code your way to a solution" , 
        }
    ]
    const [dataSize , setDatasize] = useState(timeLineData.length);
  return (
    
    <div className=' bg-pure-greys-5 font-inter text-richblue-800 pt-16 pb-10'>
        <div className=' w-10/12 mx-auto flex flex-row'>
            <div className=' w-[45%] flex flex-col items-start gap-6'>
                {
                timeLineData.map((element , index) => {
                    return (
                        <TimeLineBox key={element.key} data = {element} dataSize = {dataSize} index = {index}/>
                    );
                })
                }
            </div>
            <div className=' relative'>
                    <div className='shadow-[-5px_-5px_50px_5px] shadow-blue-100 '>
                        <img src={TimeLineImage} alt="TimelineImage" className=' object-cover h-[450px] w-[650px] shadow-[15px_15px_white] ' />
                    </div>
                    <div className=' absolute flex flex-row  w-[550px] h-[100px] bg-caribbeangreen-700 left-[50%] translate-x-[-50%] bottom-[-2.5rem] mx-auto font-inter text-white'>
                        <div className='p-6 h-full  w-[45%] flex flex-row justify-between items-center '>
                            <div className=' h-full flex flex-row items-center gap-10'>
                                <h1 className=' font-bold text-3xl'>10</h1>
                                <p className=' text-caribbeangreen-400'>YEARS EXPERIENCES</p>
                            </div>
                        </div >
                        <div className=' w-[2%] my-[.6rem] h-[80%] border-r-2'></div>
                        <div className='p-6 h-full  w-[45%] flex flex-row justify-between items-center '>
                            <div className=' h-full flex flex-row items-center gap-10'>
                                <h1 className=' font-bold text-3xl '>250</h1>
                                <p className=' text-caribbeangreen-400'>TYPES OF COURSES</p>
                            </div>
                        </div >
                    </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection