import React from 'react'
import HighlitedText from '../Homepage/HighlitedText';
import { Link } from 'react-router-dom';
import CTAButton from '../Homepage/CTAButton';

const LearningGrid = () => {
    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
      ];
  return (
    <div className=' w-full bg-richblack-900 mt-24'>
        <div className=' w-10/12 mx-auto grid lg:grid-cols-4 grid-cols-1 mb-32'>
            {
                LearningGridArray.map((card , index) => (
                    <div
                        key={index}
                        className={`lg:min-h-[250px]  ${card.order < 0 && " col-span-2 "}
                            ${card.order % 2 ? "bg-richblack-600 " : " bg-richblack-800  "}
                            ${card.order === 3 && "lg:col-start-2 "} 
                            `} 
                    >
                        {
                            card.order < 0 &&
                            <div className='bg-richblack-900 lg:min-h-[250px] p-8 flex flex-col gap-2'>
                                <div className=' font-semibold text-4xl'>{card.heading}</div>
                                <HighlitedText text={card.highlightText} color = {'bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]  font-semibold text-4xl mb-3'}/>
                                <div className=' text-pure-greys-200 mb-4 font-inter text-[17px]'>{card.description}</div>
                                <CTAButton isyellow={true} path='/'>{card.BtnText}</CTAButton>
                            </div>
                        }
                        {
                            card.order > 0 && 
                            <div className=' p-7'>
                                <h1 className=' text-xl font-semibold leading-5 mb-5 text-pure-greys-25'>{card.heading}</h1>
                                <p className=' font-inter text-pure-greys-300'>{card.description}</p>
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default LearningGrid