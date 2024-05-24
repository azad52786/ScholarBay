import React from 'react'
import Section1 from '../component/core/About/Section1'
import Section2 from '../component/core/About/Section2'
import Section3 from '../component/core/About/Section3'
import LearningGrid from '../component/core/About/LearningGrid'
import ContactUs from '../component/core/About/ContactUs'

const About = () => {
  return (
    <div className=' w-screen'>
        <Section1/>
        <Section2/>
        <Section3/>
        <LearningGrid/>
        <ContactUs/>
    </div>
  )
}

export default About