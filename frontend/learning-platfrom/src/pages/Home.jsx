import React from 'react'
import SectionOne from '../component/core/Homepage/Section_1';
import SectionTwo from '../component/core/Homepage/Section_2';
import TimelineSection from '../component/core/Homepage/TimelineSection';
import LearningLanguageSection from '../component/core/Homepage/LearningLanguageSection';
import BecomeInstructorSection from '../component/core/Homepage/BecomeInstructor_section';
import ExploreMoreTab from '../component/core/Homepage/ExploreMoreTab';
import RatingAndReviewComponent from '../component/core/Homepage/RatingAndReviewComponent';
const Home = () => {
  return (
    <div>
        {/* section 1  */}
        <SectionOne/>
        <RatingAndReviewComponent/>
        <ExploreMoreTab/>
        {/* section 2  */}
        <SectionTwo/>

        <TimelineSection/>

        <LearningLanguageSection/>

        <BecomeInstructorSection/>
    </div>
  )
}

export default Home
