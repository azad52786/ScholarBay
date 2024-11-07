import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Player , BigPlayButton , LoadingSpinner , VolumeMenuButton , PlaybackRateMenuButton , ControlBar } from 'video-react'

const Mainvideo = ({ videoData ,  preViewPicture , videoEnd , thumbnail}) => {
    const {subSectionId} = useParams();

    let videoUrl = videoData?.videoUrl;

  return subSectionId === undefined ? <div></div> : (
  <div className=' w-[97%] mx-auto py-5 z-0'>
       <Player src={videoUrl}
        // poster={thumbnail}
            aspectRatio="15:9"
              playsInline
              
       >
  
       <VolumeMenuButton />
       {
        // !videoUrl && <LoadingSpinner />
       } 
          <BigPlayButton position="center" />
        </Player>
  </div>
  )
}

export default Mainvideo
