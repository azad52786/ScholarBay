import React from 'react'
import RatingStars from '../../../catalogs/RatingStars'

const ReviewAndRatingCard = ({data}) => {
  return (
     <ul className=" flex items-center h-full">
                  <li className="w-56 pb-10 h-56 flex flex-col gap-4 bg-richblack-700 rounded-md py-3 px-3">
                    <div className=" flex items-center gap-3 justify-start">
                      {data ? (
                        <img
                          src={data?.user?.image}
                          alt="UserImage"
                          className="h-10 w-10 rounded-full border "
                          loading="lazy"
                        />
                      ) : (
                        <div className=" w-12 aspect-square  bg-richblack-600 animate-pulse  rounded-full"></div>
                      )}
                      <div className=" w-full">
                      {data ? (
                        <p className="text-sm font-medium text-richblack-200">
                          {data?.user?.firstName + " " +  data?.user?.lastName}
                        </p>
                      ) : (
                        <div className="rounded-md w-full flex-grow h-6  mb-1 font-medium bg-richblack-600 animate-pulse"></div>
                      )}
                      {
                        data ? (
                          <RatingStars
                          rating_cnt={data?.rating} />
                        ) : (
                          <div className=" w-full h-6 aspect-square flex-grow  bg-richblack-600 animate-pulse rounded-md"></div>
                        )}
                      </div>
                    </div>
                    <div className=" flex items-center justify-end gap-4">
                       {
                        data ? (<p>{data?.review.substring(0 , 190) + (data?.review.length > 70 ? "..." : "")}</p>) : (<div className=" w-full h-12 aspect-square flex-grow  bg-richblack-600 animate-pulse rounded-md"></div>)
                       }
                       
                    </div>
                  </li>
                </ul>
  )
}

export default ReviewAndRatingCard
