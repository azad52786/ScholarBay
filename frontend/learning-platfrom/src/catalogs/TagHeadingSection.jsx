import React from 'react'

const TagHeadingSection = ({currentCatagroyDetails}) => {
    const {name , description } = currentCatagroyDetails;
  return (
    <div className=' box-content bg-richblack-800 px-4 mx-auto flex min-h-[260px]  flex-col justify-center gap-4'>
        <p className='text-sm text-richblack-300 tracking-wider'>Home / Catalog / <span className=' text-yellow-25'>{name.charAt(0).toUpperCase() + name.slice(1)}</span></p>
        <p className="text-3xl text-richblack-5">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        <p className="max-w-[870px] text-richblack-200">{description}</p>
    </div>
  )
}

export default TagHeadingSection
