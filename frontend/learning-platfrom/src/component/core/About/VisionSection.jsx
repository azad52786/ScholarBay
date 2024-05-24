import React from 'react'

const VisionSection = ({heading , color , decs}) => {
  return (
    <div className=' max-w-[43%]'>
        <heading className= {`${color} bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ` }>{heading}</heading>
        <div className=' text-base font-medium text-richblack-300 lg:w-[95%] mt-6 leading-6'>{decs}</div>
    </div>
  )
}

export default VisionSection