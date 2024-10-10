import React from 'react'
import HighlitedText from '../Homepage/HighlitedText'
import VisionSection from './VisionSection'
import FoundingStory from '../../../assets/Images/FoundingStory.png'

const Section2 = () => {
  return (
    <div className=' w-full bg-richblack-900 pt-[350px] md:pt-24'>
        <div className=' w-10/12 mx-auto text-center font-edu-sa text-2xl md:text-4xl'>
            <div className=' font-semibold md:font-bold md:leading-12 text-balance'>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighlitedText text = " combines technology" color = {'bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] '}/>, 
            <HighlitedText text = "expertise" color = {'bg-gradient-to-b from-[#e65c00] via-[#e65c00] to-[#A6FFCB]'}/> , and community to create an 
            <HighlitedText text={" unparalleled educational experience"} color={'bg-gradient-to-b from-[#e65c00] via-[#e65c00] to-[#A6FFCB]'}/>.
            </div>
        </div>
        <div className=' w-screen mt-12 h-[0.5px] bg-richblack-600'></div>
        <div className=' w-full bg-richblack-900 pt-12'>
            <div className=' w-10/12 mx-auto'>
                <div className=' flex md:flex-row flex-col gap-4 md:gap-0 justify-between items-center mb-24'>
                    <VisionSection 
                        heading = "Our Founding Story" color = {'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]'}
                        decs={<>
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            <br />
                            <br />
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </>}
                    />
                    <img src={FoundingStory} alt="FoundingStory" className=' w-[30rem] h-[16rem] shadow-[0_0_20px_0] shadow-[#FC6767]' />
                </div>
                <div className=' flex md:flex-row flex-col justify-between gap-4 md:gap-0 items-center pb-24'>
                    <VisionSection heading="Our Vision" color={'bg-gradient-to-b from-[#FF512F] to-[#F09819]'} decs ="With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience."/>
                    <VisionSection heading="Our Mission" color={'bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]'} decs ="Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities."/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Section2