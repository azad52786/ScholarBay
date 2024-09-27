import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom";
import { addRatingReview } from "../../service/operations/ReviewAndRatingConnection";
const ReviewModal = ({ setShowReviewModal }) => {
  const { courseId } = useParams();
  const { user } = useSelector((store) => store.User);
  const { token } = useSelector(store => store.Auth)
  const { firstName, lastName, image } = user;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  function ratingChanged (newRating){
    // console.log(newRating)
    setValue("starCount" , newRating)
  }
  async function onSubmit (data) {
    // console.log(data);
    const formData = new FormData();
    // rating , review , courseId
    formData.append("rating" , data.starCount);
    formData.append("review" , data.reviewContent);
    formData.append("courseId" , courseId);
    
    await addRatingReview(formData , token);
    
  }
  useEffect(() => {
    register("starCount", { required: true, min: 0.1 });
  }, [register]);
  return (
    <div
      className=" fixed w-screen h-screen bg-richblack-800
        flex items-center justify-center z-50
   backdrop-blur-sm font-edu-sa bg-opacity-70"
    >
      <div
        className="
             w-[90%] md:w-[60%] lg:w-[50%] rounded-lg border-2 border-richblack-500 bg-richblack-800
        "
      >
        <div
          className=" flex items-center justify-between px-3 py-4
           bg-richblack-600 bg-opacity-90 text-pure-greys-200"
        >
          <p
            className="
                   font-bold font-edu-sa text-xl 
              "
          >
            Add Review
          </p>
          <RxCross2
            className=" w-7 h-7 cursor-pointer"
            onClick={() => setShowReviewModal(false)}
          />
        </div>
        <div className=" flex items-center justify-center gap-3  py-3">
          <img
            src={image}
            alt="Profile Image"
            className=" object-cover h-16 aspect-square rounded-lg"
          />
          <div className=" font-edu-sa font-medium">
            <p className=" mb-1">{firstName + " " + lastName}</p>
            <p>Posting Publicly</p>
          </div>
          
        </div>
        <div className=" flex items-center justify-center py-2">
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={35}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
          </div>
              {errors.starCount && (
              <p className="text-pink-100 text-center">Rating is required</p>
              )}
          <form className=" w-[95%] md:w-[90%] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="reviewContent" className=" text-sm pb-3 block">Add Your Experience  <span className=" text-pink-200">*</span></label>
            <textarea name="reviewContent" id="reviewContent" rows={5} className=" w-full bg-richblack-600 bg-opacity-60 rounded-md
              border-b-2 border-pure-greys-100 border-r min-h-[130px] p-2 text-sm pb-4
            " placeholder="Enter Your Exprence....."
              {...register("reviewContent" , {required : true})}
            ></textarea>
            {errors.reviewContent && (
              <p className=" text-pink-100">Review is required</p>
          )}
            <div className=" flex items-center justify-end gap-4 py-3">
              <button className="px-4 py-2 rounded-lg text-sm font-medium bg-richblack-300"
                onClick={() => setShowReviewModal(false)}
              >Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium text-black  bg-yellow-100">Submit</button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default ReviewModal;
