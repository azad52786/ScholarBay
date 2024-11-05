import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children , isyellow , path}) => {
  return (
    <Link to={path}><button className={`font-bold ${isyellow ? ' text-black bg-[#FFD60A]' : 'text-white bg-richblack-800 '} 
    w-fit py-3 md:px-6 px-3 rounded-md transition-all duration-250 hover:scale-95 cursor-pointer border-b-2 border-r-2 border-richblack-700 hover:border-black`}>
        {children}
    </button></Link>
  )
}

export default CTAButton