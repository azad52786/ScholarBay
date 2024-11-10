import toast from "react-hot-toast";
import { COURSE_API } from "../Api";
import Apiconnection from "../Apiconnection";

export const addRatingReview = async (data, token) => {
  if (!token) {
    toast.error("Authorization token is missing");
    return;
  }
  const toastId = toast.loading("Submitting your review...");
  try {
    const res = await Apiconnection("post", COURSE_API.ADD_RATING, data, {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    });
    toast.dismiss(toastId);
    if (res?.data?.success) {
      toast.success("Review successfully added! 😍");
      return res.data;
    } else {
      const errorMessage = res?.data?.message || "Failed to submit review";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (e) {
    console.error("Error submitting review:", e);
    toast.dismiss(toastId);
    toast.error(e.response.data.message || "Something went wrong. Please try again.");
  } finally {
    toast.dismiss(toastId);
  }
};


export const getAllRatingAndReviews = async() => {
    try{
    
      let allRatingAndReviews = await Apiconnection("get" , COURSE_API.GET_ALL_RATINGS_AND_REVIEW);
      console.log(allRatingAndReviews);
      if(allRatingAndReviews.data.success){
        return allRatingAndReviews.data?.allRatingAndReviews;
      }else{
        throw new Error(allRatingAndReviews.data?.message || "Failed to fetch reviews and ratings");
      }

    }catch(e){
      console.error("Error fetching reviews and ratings:", e);
      // toast.error(e.response?.data?.message || e.message || "Unknown error Please try again");
    }
    return [];
}
