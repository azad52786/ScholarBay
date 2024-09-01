import React from "react";
import StarRatings from "react-star-ratings";
import RatingStars from "./RatingStars";
import { Link, useNavigate } from "react-router-dom";
const CourseCard = ({ courseDetails , cardHeight = 250 }) => {
  console.log(cardHeight)
  const navigate = useNavigate();
  const { thumbnail, courseName, price, instructor , _id } = courseDetails;
  const { firstName, lastName } = instructor;
  return (
  <Link to={`/course/${_id}`}>
    <div className=" w-full h-fit font-inter scale-[0.95] hover:scale-[1] shadow-3xl transition-all duration-900 rounded-md"
    >
      <img
        src={thumbnail}
        alt="courseImage"
        loading="lazy"
        className={` w-full h-[${250}px] object-cover rounded-lg`  } />
      <div className=" w-full min-h-36 p-2  rounded-b-md flex flex-col gap-2">
        <p className=" font-semibold text-xl text-pure-greys-50">
          {courseName}
        </p>
        <p className="text-[12px] md:text-lg text-richblack-5">
          By{" "}
          <span className="text-yellow-50">{firstName + " " + lastName}</span>
        </p>
        <div className="w-full flex gap-x-3 item-center">
        <div className=" text-yellow-50 text-lg font-semibold ">3.5</div>
          <RatingStars rating_cnt={3.5}/>
          <div className=" text-lg text-pure-greys-25 ">7 Ratings</div>
        </div>
        <p className="text-sm md:text-xl text-richblack-5">Rs. {price}</p>
      </div>
    </div></Link>
  );
};

export default CourseCard;
