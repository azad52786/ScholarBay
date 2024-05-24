import React from 'react'
import CTAButton from './CTAButton'
import HighlitedText from './HighlitedText'

const Section_2 = () => {
  return (
    <div className=' bg-pure-greys-5 text-richblack-300 font-inter pt-16'>
        <div className='homePage_bg h-[333px] '>
            <div className='h-full flex justify-center items-center gap-4'>
                <CTAButton isyellow={true} path = '/' >Explore Full Catalog →</CTAButton>
                <CTAButton isyellow={false} path = '/' >Learn More </CTAButton>
            </div>
        </div>
        <div className='w-10/12 mx-auto h-[250px] pb-6 flex flex-row pt-12 items-center justify-between gap-24'>
            <div className=' font-inter font-bold text-4xl text-richblack-800'>
                Get the skills you need for a
                <HighlitedText text={`job that is in demand. `} color = {'bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] '}/>
            </div>
            <div className=' flex flex-col justify-center gap-7 font-bold'>
                <p className='text-richblack-800'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                <CTAButton isyellow={true} path='/'>Learn more</CTAButton>
            </div>
        </div>
    </div>
  )
}

export default Section_2