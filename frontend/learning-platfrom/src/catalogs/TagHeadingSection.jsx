import React from 'react'

const TagHeadingSection = ({currentCatagroyDetails}) => {
    const { name , description } = currentCatagroyDetails;

  return (
    <div className=' box-content bg-richblack-800 px-4 mx-auto flex min-h-[260px]  flex-col justify-center gap-4'>
        <p className='text-sm  mt-2 text-richblack-300 tracking-wider'>Home / Catalog / <span className=' text-yellow-25'>{name.charAt(0).toUpperCase() + name.slice(1)}</span></p>
        <p className="text-3xl text-[#37eae4f5] md:font-bold font-semibold font-edu-sa ">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        <p className="max-w-[96%] md:max-w-[90%]  font-mono text-richblack-200 pb-3">{description}</p>
    </div>
  )
}

export default TagHeadingSection
