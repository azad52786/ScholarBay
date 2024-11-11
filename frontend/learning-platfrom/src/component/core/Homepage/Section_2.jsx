import React from 'react'
import CTAButton from './CTAButton'
import HighlitedText from './HighlitedText'

const Section_2 = () => {
  return (
    <div className=' bg-pure-greys-5 text-richblack-300 font-edu-sa pt-16 pb-24 md:pb-0'>
        <div className='homePage_bg md:h-[333px] h-[420px] '>
            <div className='h-full flex justify-center items-end md:items-center gap-4 pb-10 md:pb-0'>
                <CTAButton isyellow={true} path = '/' >Explore Full Catalog →</CTAButton>
                <CTAButton isyellow={false} path = '/' >Learn More </CTAButton>
            </div>
        </div>
        <div className='w-10/12 mx-auto h-[250px] pb-6 flex flex-col md:flex-row pt-7 md:pt-12 items-center justify-between gap-6 md:gap-24'>
            <div className='  font-semibold text-justify md:text-center md:font-bold text-3xl md:text-4xl text-richblack-800'>
                Get the skills you need for a
                <HighlitedText text={`job that is in demand. `} color = {'bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] '}/>
            </div>
            <div className=' flex flex-col justify-center gap-7 font-bold'>
                <p className='text-richblack-800'>The modern ScholarBay is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                <CTAButton isyellow={true} path='/'>Learn more</CTAButton>
            </div>
        </div>
    </div>
  )
}

export default Section_2