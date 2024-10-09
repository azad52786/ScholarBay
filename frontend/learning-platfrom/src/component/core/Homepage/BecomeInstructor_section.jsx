import React from 'react'
import instructor from '../../../assets/Images/Instructor.png'
import HighlitedText from './HighlitedText'
import CTAButton from './CTAButton'

const BecomeInstructor_section = () => {
  return (
    <div className=' font-edu-sa w-10/12 h-fit mx-auto pt-20 pb-16 flex flex-col md:flex-row gap-20'>
        <img src={instructor}
        className=' w-full md:w-[45%] object-contain shadow-[-20px_-20px_white]'
         alt="instructor" />
        <div className=' flex flex-col gap-12 justify-center items-center md:items-start'>
            <div className=' font-bold text-4xl'>
                Become an <br/>
                <HighlitedText text ={"instructor"} color = {'bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] '}/>
            </div>
            <p className=' text-richblack-300 text-lg font-semibold'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            <CTAButton isyellow={true} path='/'>Start Teaching Today  ➡</CTAButton>
        </div>
    </div>
  )
}

export default BecomeInstructor_section