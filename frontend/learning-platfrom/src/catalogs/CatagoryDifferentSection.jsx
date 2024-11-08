import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "./CourseCard";
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../src/App.css"
import HighlitedText from "../component/core/Homepage/HighlitedText";
import { navigationButtonStyleHandler } from "../utils/helperfunction";

const CatagoryDifferentSection = ({ diffCatagoryCourses , name }) => {
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

  

  return (
    <div className=" w-full h-fit font-inter">
      <div className=" border-b border-richblack-600 w-[90%] mx-auto box-content pt-1 md:pt-3 lg:pt-4 py-6 ">
        <h2 className="section_heading pb-3 text-xl font-edu-sa  md:text-3xl text-pure-greys-100 font-bold">
          Similar to {name}
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
              onInit={navigationButtonStyleHandler}
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
