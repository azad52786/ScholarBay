import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

const RatingStars = ({rating_cnt}) => {
    const [allStarCount , setAllStarCnt ] = useState({
        fullStar : 0 , 
        halfStar : 0 , 
        emptyStar : 0 
    })
    function hasPrecision(num) {
        return num % 1 !== 0;
    }
    useEffect(() => {
        let fullStar = Math.floor(rating_cnt) || 0;
        let halfStar = hasPrecision(rating_cnt) ? 1 : 0;
        let emptyStar = !hasPrecision(rating_cnt) ? 5 - fullStar : 4 - fullStar;
        
        setAllStarCnt({
            emptyStar , halfStar  , fullStar
        })
    } , [rating_cnt])
  return (
    <div className="flex gap-1 text-yellow-100">
        {
            Array.from({length : allStarCount.fullStar} , (_ , i) => {
                return <TiStarFullOutline key={i} size={20}/>
            })
        }
        {
            Array.from({length : allStarCount.halfStar} , (_ , i) => {
                return <TiStarHalfOutline key={i} size={20}/>
            })
        }
        {
            Array.from({length : allStarCount.emptyStar} , (_ , i) => {
                return <TiStarOutline key={i} size={20}/>
            })
        }
    </div>
  )
}

export default RatingStars
