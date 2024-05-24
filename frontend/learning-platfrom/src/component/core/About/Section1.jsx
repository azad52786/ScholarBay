import React from 'react'
import HighlitedText from '../Homepage/HighlitedText'
import aboutus1 from '../../../assets/Images/aboutus1.webp'
import aboutus2 from '../../../assets/Images/aboutus2.webp'
import aboutus3 from '../../../assets/Images/aboutus3.webp'

const Section1 = () => {
  return (
    <div className=' w-full bg-[#273245] pt-8 pb-24 '>
        <div className=' w-10/12 mx-auto font-inter text-center'>
            <div  className='font-bold text-4xl '>
                <h1 className=' mb-4'>Driving Innovation in Online Education for a </h1>
                <HighlitedText text = "Brighter Future" color = {'bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] '}/>    
            </div>
            <div
                className=' text-[#838894] text-[18px] mt-6'
            >Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a <br/> brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing <br/> a vibrant learning community.</div>
            <div className='w-full mt-12 relative  flex justify-center items-start'>
            <div class=" bg-gradient-to-br from-yellow-300 to-yellow-500 h-24 w-64 blur-[50px] rounded-full mt-4"></div>
                <div className=' flex gap-8 absolute '>
                    <img src={aboutus1} alt="about1" />
                    <img src={aboutus2} alt="about2" />
                    <img src={aboutus3} alt="about3" />
                </div>
            </div>
        </div>
         
    </div>
  )
}

export default Section1