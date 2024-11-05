import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'
import HighlitedText from './HighlitedText';
import { ImTree } from "react-icons/im";
import { LiaWpbeginner } from "react-icons/lia";
const ExploreMoreTab = () => {
    const tabs = [
        'Free' ,
        'coding' ,
        "popular" , 
        "Skills"
    ]

    const [currentTab , setCurrentTab] = useState(tabs[0]);
    const [cources , setCources] = useState(HomePageExplore[0].courses);
    const[currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setCardHendeler = (value) => {
        setCurrentTab(value);
        let result = HomePageExplore.filter((course) => course.tag === value);
        setCources(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }
    
  return (
    <div className=' w-10/12 font-edu-sa flex flex-col items-center  gap-3 md:gap-5 mx-auto pb-[500px] md:pb-60 relative'>
        <div className=' text-3xl md:text-4xl font-bold text-center'>
        Unlock the <HighlitedText text = {"Power of Code"} color = {'bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] '}/>
        </div>
        <div className=' text-richblack-300 font-semibold text-lg md:text-xl'>Learn to Build Anything You Can Imagine</div>
        <div className='h-12 md:w-fit justify-around  flex flow-row items-center gap-3 md:gap-[25px] px-2 rounded-full bg-richblack-800 text-richblack-200'>
            {tabs.map((tab , index) => (
                <div key={index} 
                    className={` text-[14px] md:text-[16px] px-5 md:px-7 py-2 rounded-full cursor-pointer hover:text-white hover:bg-richblack-900 ${tab === currentTab ? 'text-white bg-richblack-900 font-bold' : ''}`}
                    onClick={() => setCardHendeler(tab)}
                >
                 {tab}
                </div>
            ))}
        </div>
        <div className='flex flex-col gap-5 md:gap-0 md:flex-row justify-between  absolute top-[220px] md:top-[200px]'>
            {
                cources.map((course , index) =>(
                    <div 
                        key = {index}
                        onClick={() => setCurrentCard(course.heading)}
                    className={` cursor-pointer flex flex-col gap-3 md:gap-6 py-4 w-full md:w-[30%] ${currentCard === course.heading ? 'bg-pure-greys-5 shadow-[10px_10px_10px_#3edb9799] text-richblack-700' : 'bg-richblack-800'} `}>
                        <div className=' text-2xl font-bold px-4 transition-all duration-200'>
                            {course.heading}
                        </div>
                        <div className=' font-medium px-4 text-richblack-500'>
                            {course.description}
                        </div>
                        <div className='h-12 border-b-2 border-dashed border-richblack-500'>
                        </div>
                        <div className= {`px-4 flex justify-between ${currentCard === course.heading ? 'text-caribbeangreen-500' : ' text-richblack-400'}`}>
                            <div className={`flex items-center gap-2 text-[16px]`}>
                            <LiaWpbeginner /> <p>{course.level}</p>
                            </div>
                            <div  className={`flex items-center gap-2 text-[16px]`}>
                            <ImTree />
                            <p>{course.lessionNumber + " "} Lesson</p>
                            </div>
                        </div>

                    </div>
                ))
            }
            
        </div>
    </div>
  )
}

export default ExploreMoreTab