import React from 'react'

const TimeLineBox = ({data , index , dataSize }) => {
  return (
    <div className=' flex flex-col gap-[8px] '>
        <div className=' flex flex-row justify-betweenm gap-[35px]'>
            <div className=' w-[50px] h-[50px] aspect-square rounded-full border-2
            border-dotted border-richblack-700 flex justify-center items-center
            bg-white shadow-lg '>
                <img src={data.logo} alt={"logo" + index} />
            </div>
            
            <div className=' flex flex-col items-start justify-center '>
                <p className='font-bold text-lg'>{data.heading}</p>
                <p className=' text-opacity-65'>{data.comment}</p>
            </div>
        </div>
        {
            index + 1 !== dataSize &&
            <div className=' w-[25px] border-r border-dotted border-black h-[50px] border-opacity-40'>

            </div>    
        }
    </div>  
  )
}

export default TimeLineBox