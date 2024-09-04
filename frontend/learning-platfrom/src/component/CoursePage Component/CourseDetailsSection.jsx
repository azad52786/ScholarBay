import React from "react";
import RatingStars from "../../catalogs/RatingStars";
import { MdLanguage } from "react-icons/md";
import { LiaHandPointRight } from "react-icons/lia";
import { FaShareFromSquare } from "react-icons/fa6";
import { toast } from "react-hot-toast"

const CourseDetailsSection = ({ course, alreadyEnrolled }) => {
  const {
    ratingAndReviews,
    price,
    instructor,
    createdAt,
    courseName,
    courseDescription,
    thumbnail,
    category,
  } = course;
  console.log(category);
  
  const copyUrl = async() => {
    try{
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Url copied successfully");
    }catch(e){
        console.log(e);
    }
  }
  return (
    <div className=" font-inter w-full h-fit grid grid-cols-1 grid-rows-4 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 gap-2 justify-stretch content-start">
      <div className=" h-fit flex gap-y-5 flex-col py-10 lg:col-span-2">
        <p className=" text-2xl md:text-4xl font-bold text-richblack-5 sm:text-[42px]">
          {courseName}
        </p>
        <p class="text-richblack-200 md:text-xl text-justify">
          {courseDescription}
        </p>
        <div className=" flex items-center gap-4 ">
          <p className=" font-bold text-yellow-100">4.2</p>
          <RatingStars rating_cnt={4.2} />
          <p className=" md:font-semibold md:text-lg  text-pure-greys-25">
            (3 Reviews)
          </p>
          <p className=" md:font-semibold md:text-lg text-richblack-200">
            5 Student Enrolled
          </p>
        </div>
        <p class=" text-pure-greys-25 text-lg md:text-2xl">
          Created By {instructor?.firstName + " " + instructor?.lastName}
        </p>
        <div className=" flex  items-center gap-10 text-pure-greys-50">
          <div className=" flex gap-2">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              class="text-2xl text-richblack-5"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
              <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
            </svg>
            <p className=" md:text-lg ">Created At {createdAt.slice(0, 10)}</p>
          </div>
          <div className=" flex gap-2">
            <MdLanguage className=" w-6 h-6" />
            <p className=" md:text-lg">English</p>
          </div>
        </div>
      </div>
      <div className="row-span-2 flex items-center justify-center p-4 h-fit">
        <div className="  bg-richblack-700  h-full w-full rounded-md py-4 px-4 flex flex-col items-center gap-4">
          <img
            src={thumbnail}
            alt="thumbnail"
            className=" rounded-md h-[200px] w-full"
          />
          <p className=" font-bold text-2xl text-pure-greys-25 self-start">
            ₹ {price}
          </p>
          {!alreadyEnrolled && (
            <div className=" flex items-center justify-between w-full gap-7">
              <button
                className=" flex items-center justify-center w-full py-3 rounded-md bg-yellow-100 text-pure-greys-800
             font-semibold text-lg border-b-[3px] border-l-[3px] border-white hover:scale-105 transition-all duration-500"
              >
                Buy Now
              </button>
              <button
                className=" flex items-center justify-center w-full py-3 rounded-md bg-blue-200 text-pure-greys-800
             font-semibold text-lg  border-b-[3px] border-l-[3px] border-black hover:scale-105 transition-all duration-500"
              >
                Add to Cart
              </button>
            </div>
          )}
          {alreadyEnrolled && (
            <button
              className=" flex items-center justify-center w-full py-3 rounded-md bg-blue-200 text-pure-greys-800
                font-semibold text-lg  border-b-[3px] border-l-[3px] border-black hover:scale-105 transition-all duration-500"
            >
              Go to Course
            </button>
          )}
          <p className=" text-sm text-pure-greys-25 tracking-wide mt-4 text-center">
            30-Day Money - Back Guarantee
          </p>
          <p className=" font-bold text-xl text-pure-greys-100 w-full tracking-wide mt-4 text-start">
            This Course Includes
          </p>
          <div className=" mb-2 w-full">
            {category.map((cat, index) => (
              <div className=" flex items-center gap-3 text-2xl text-caribbeangreen-300">
                {" "}
                <LiaHandPointRight className=" flex items-center" />
                <p
                  key={index}
                  className=" text-[16px] tracking-wide text-center "
                >
                  {cat}
                </p>{" "}
              </div>
            ))}{" "}
          </div>
          <div className=" text-xl cursor-pointer flex items-center justify-center gap-1 text-yellow-50"
            onClick={copyUrl}
          >
            <FaShareFromSquare/>
            <p className=" tracking-wide ml-2">
              Share
            </p>
          </div>
        </div>
      </div>
      <div className=" mt-16 w-full h-fit flex flex-col gap-2 items-start md:col-span-2 justify-center px-12 py-6 border border-pure-greys-300">
      <p className="text-3xl font-semibold">What you'll learn</p>
      <div className="mt-5">Foundation in Java Programming,
        Real-World Application Development,
        Versatility and Market Demand</div>
      </div>
    </div>
  );
};

export default CourseDetailsSection;
