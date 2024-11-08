import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "./CourseCard";
import "swiper/css";
import HighlitedText from "../component/core/Homepage/HighlitedText";

const CatagoryDifferentSection = ({ diffCatagoryCourses }) => {
  const [diffentCourses, setDifferentCourses] = useState([]);
  useEffect(() => {
    let courseArray = [];
    if (diffCatagoryCourses.length > 0) {
      diffCatagoryCourses.forEach((ele) => {
        courseArray = [...courseArray, ...ele.courses];
      });
    }
    setDifferentCourses(courseArray);
  }, [diffCatagoryCourses]);

  useEffect(() => {
    const nextButton = document.querySelector(".swiper-button-next");
    const prevButton = document.querySelector(".swiper-button-prev");
    if (nextButton) {
      nextButton.innerHTML = `
      <svg class="arrow-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    }

    if (prevButton) {
      prevButton.innerHTML = `
        <svg class="arrow-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
  }, []);
  return (
    <div className=" w-full h-fit font-inter">
      <div className=" border-b border-richblack-600 w-[90%] mx-auto box-content pt-1 md:pt-3 lg:pt-4 py-6 ">
        <h2 className="section_heading pb-3 md:pb-0 text-xl font-edu-sa  md:text-3xl text-pure-greys-100 font-bold">
          Similar to Python
        </h2>
        {diffentCourses.length <= 0 ? (
          <div className=" w-full flex items-center justify-center font-mono ">
            <HighlitedText
              text={"No Course Found"}
              color={
                "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]  font-semibold text-4xl mb-3"
              }
            />
          </div>
        ) : (
          <div className="slider-container">
            <Swiper
              slidesPerView={1}
              loop={true}
              // spaceBetween={1}
              modules={[Pagination, Navigation]}
              pagination={false}
              className="mySwiper"
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              navigation={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                700: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {diffentCourses.map((course, index) => (
                <SwiperSlide
                  key={index}
                  className=" flex items-center justify-center"
                >
                  <CourseCard courseDetails={course} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatagoryDifferentSection;
