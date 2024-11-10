import React from 'react'
import Section_1 from '../component/core/Homepage/Section_1';
import Section_2 from '../component/core/Homepage/Section_2';
import TimelineSection from '../component/core/Homepage/TimelineSection';
import LearningLanguageSection from '../component/core/Homepage/LearningLanguageSection';
import BecomeInstructor_section from '../component/core/Homepage/BecomeInstructor_section';
import ExploreMoreTab from '../component/core/Homepage/ExploreMoreTab';
import RatingAndReviewComponent from '../component/core/Homepage/RatingAndReviewComponent';
const Home = () => {
  return (
    <div>
        {/* section 1  */}
        <Section_1/>
        <RatingAndReviewComponent/>
        <ExploreMoreTab/>
        {/* section 2  */}
        <Section_2/>

        <TimelineSection/>

        <LearningLanguageSection/>

        <BecomeInstructor_section/>
    </div>
  )
}

export default Home