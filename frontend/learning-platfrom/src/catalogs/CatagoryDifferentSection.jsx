import React, { useEffect, useState } from 'react'
import { Navigation, Pagination}  from 'swiper/modules'
import { Swiper , SwiperSlide } from 'swiper/react';
import CourseCard from './CourseCard';
import 'swiper/css';

const CatagoryDifferentSection = ({diffCatagoryCourses}) => {
    const [diffentCourses , setDifferentCourses] = useState([]);
    useEffect(() => {
        let courseArray = [];
        if (diffCatagoryCourses.length > 0) {
            diffCatagoryCourses.forEach((ele) => {
                courseArray = [...courseArray, ...ele.courses];
            });
        }
        setDifferentCourses(courseArray);
    }, [diffCatagoryCourses]);
  return (
    <div className=' w-full h-fit font-inter'>
    
    <div className=" w-[90%] mx-auto box-content max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
    <h2 className="section_heading mb-6 md:text-3xl text-xl">Similar to Python</h2>
    <div className="slider-container">
          <Swiper
            slidesPerView={1}
            loop={true}
            // spaceBetween={1}
            modules={[ Pagination, Navigation]}
            pagination={true}
            className="mySwiper"
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{ 
              0 : { slidesPerView : 1} , 
              700 : { slidesPerView : 2 } , 
              1024: { slidesPerView: 3 },
            }}
          >
            {diffentCourses.length > 0 &&
              diffentCourses.map(
                (course, index) => (
                  <SwiperSlide key={index} className=" flex items-center justify-center">
                    <CourseCard  courseDetails={course} />
                  </SwiperSlide>
                )
              )}
          </Swiper>
        </div>
    </div></div>
  )
}

export default CatagoryDifferentSection
