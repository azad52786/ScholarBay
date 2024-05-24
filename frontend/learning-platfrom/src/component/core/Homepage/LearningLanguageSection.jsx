import React from 'react'
import HighlitedText from './HighlitedText'
import Compare_with_others from '../../../assets/Images/Compare_with_others.png'
import know_your_progress from '../../../assets/Images/Know_your_progress.svg'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from '../Homepage/CTAButton'
const LearningLanguageSection = () => {
  return (
    <div className=' w-screen bg-pure-greys-5 text-richblack-800 pt-32 pb-32'>
      <div className=' w-10/12 mx-auto flex flex-col items-center'>
          <div className=' text-3xl font-bold'>
          Your swiss knife for
          <HighlitedText text={"learning any language"} color = {'bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] '}></HighlitedText>
          </div>
          <p className=' text-center font-medium pt-3'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, <br/> custom schedule and more.</p>
          <div className='flex flex-row relative'>
            <img
            src= {know_your_progress}
            className=' object-contain z-10 mr-[-125px]'
            alt="know_your_progress" />
            <img 
            src={Compare_with_others} 
            className=' object-contain z-20'
            alt="Compare_with_others" />
            <img 
            src={Plan_your_lessons} 
            className=' object-contain z-30 ml-[-150px]'
            alt="Plan_your_lessons" />
          </div>
          <CTAButton isyellow={true} path = '/'>Learn More</CTAButton>
      </div>
    </div>
  )
}

export default LearningLanguageSection