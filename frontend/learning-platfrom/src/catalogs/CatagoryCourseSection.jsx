import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'
import 'swiper/css';

const CatagoryCourseSection = ({ allCourseDetails }) => {
  const [isMostPopuler, setIsMostPopuler] = useState(true);
  useEffect(()=> {
    window.scrollTo({
      top :  0 , 
      left : 0 , 
      behavior : 'smooth'
    })
  } , [])
  return (
    <div className=" w-full h-fit font-inter">
      <div class=" mx-auto box-content w-[90%] max-w-maxContentTab px-2 py-12 lg:max-w-maxContent">
        <h2 className=" text-3xl text-pure-greys-100 font-bold ">
          Courses to get you started
        </h2>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <button
            className={`px-4 py-2  ${
              isMostPopuler
                ? "border-b text-yellow-25 border-b-yellow-25"
                : "text-richblack-50"
            }  cursor-pointer`}
            onClick={() => setIsMostPopuler(true)}
          >
            Most Populer
          </button>
          <button
            className={`px-4 py-2 ${
              !isMostPopuler
                ? "border-b text-yellow-25 border-b-yellow-25"
                : "text-richblack-50"
            }text-yellow-25 cursor-pointer`}
            onClick={() => setIsMostPopuler(false)}
          >
            New
          </button>
        </div>
        {/* catagory course slider */}
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
            {allCourseDetails?.currentTagCourses?.courses.length > 0 &&
              allCourseDetails?.currentTagCourses?.courses.map(
                (course, index) => (
                  <SwiperSlide key={index} className=" flex items-center justify-center">
                    <CourseCard courseDetails={course} />
                  </SwiperSlide>
                )
              )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CatagoryCourseSection;
