import React, { useEffect, useState } from "react";
import "../../../../src/App.css";
import { getAllRatingAndReviews } from "../../../service/operations/ReviewAndRatingConnection";
import RatingStars from "../../../catalogs/RatingStars";
import ReviewAndRatingCard from "./ReviewAndRatingCard";

const RatingAndReviewComponent = () => {
  let shimmerCard = Array.from({ length: 4 });
  console.log(shimmerCard);
  let [allRatingAndReview, setAllRatingAndReview] = useState(shimmerCard);
  useEffect(() => {
    (async () => {
      let data = await getAllRatingAndReviews();
      setAllRatingAndReview(data)
      console.log(data);
    })();
  }, []);

  return (
    <div className=" w-[90%] py-6 md:py-32 mx-auto font-edu-sa text-richblack-50 bg-richblack-900
    h-fit md:flex ">
      <div className=" md:w-[30%] mr-0 md:mr-6">
        <h1 className=" font-bold leading-[1.1] text-3xl md:text-4xl mb-3">
          Don't just take <span className=" text-red">our word</span> for it!
        </h1>
        <p className=" text-richblack-200 md:text-2xl lg:text-3xl pb-5 md:pb-0">
          See what the community has to say.
        </p>
      </div>
      <div className=" scroll-pause w-full md:w-[69%] mx-auto overflow-hidden flex">
        <div className="animate-scroll mr-3 justify-end flex gap-3 scroll-smooth"
            
        >
          {allRatingAndReview &&
            allRatingAndReview.map((data) => {
              console.log(data);
                // data = null;
              return (
               <ReviewAndRatingCard data = {data} />
              );
            })}
        </div>
        <div className="animate-scroll justify-end flex gap-3 scroll-smooth"
        >
          {allRatingAndReview &&
            allRatingAndReview.map((data) => {
              console.log(data);
                // data = null;
              return (
               <ReviewAndRatingCard data = {data} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RatingAndReviewComponent;
