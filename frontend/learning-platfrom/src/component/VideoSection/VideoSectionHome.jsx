import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const VideoSectionHome = () => {
  
    const { courseId , sectionId , subSectionId } = useParams();
        console.log(courseId , " " , sectionId , " " , subSectionId)
        
        useEffect(() => {

        } , []) 
  return (
    <div>
      hiii
    </div>
  )
}

export default VideoSectionHome
