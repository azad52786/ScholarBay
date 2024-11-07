import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import HighlitedText from "../component/core/Homepage/HighlitedText";

const CatagoryCourseSection = ({ allCourseDetails }) => {
  const [isMostPopuler, setIsMostPopuler] = useState(true);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className=" w-full h-fit font-inter">
      <div className=" border-b border-richblack-600 mx-auto box-content w-[90%] max-w-maxContentTab px-2 py-4 md:py-6 lg:max-w-maxContent">
        <h2 className=" text-xl font-edu-sa  md:text-3xl text-pure-greys-100 font-bold ">
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
        {allCourseDetails?.currentTagCourses?.courses.length <= 0 ? (
        <div className=" w-full flex items-center justify-center font-mono">
          <HighlitedText
            text={"No Course Found"}
            color={
              "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]  font-semibold text-4xl mb-3"
            }
          /></div>
        ) : (
          <div className="slider-container">
            <Swiper
              slidesPerView={1}
              loop={true}
              // spaceBetween={1}
              modules={[Pagination, Navigation]}
              pagination={true}
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
              {allCourseDetails?.currentTagCourses?.courses.map(
                (course, index) => (
                  <SwiperSlide
                    key={index}
                    className=" flex items-center justify-center"
                  >
                    <CourseCard courseDetails={course} />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatagoryCourseSection;
