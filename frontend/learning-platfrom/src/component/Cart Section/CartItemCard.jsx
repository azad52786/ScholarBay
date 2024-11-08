import React from 'react'
import RatingStars from '../../catalogs/RatingStars';
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteItem } from '../../Store/Slices/CartSlice';
import { useDispatch } from 'react-redux';

const CartItemCard = ({item , index}) => {
    const { ratingAndReviews , thumbnail , 
        price , courseName } = item;
        const tagName = item.tag?.name;
        const dispatch = useDispatch();
  return (
    <>
    <div key={index} className=' w-full h-fit flex items-center justify-between'>
      <div className=' flex md:flex-row flex-col gap-4'>
        <img src={thumbnail} alt='CourseThumbnail' className=' w-[180px] h-[100px] md:h-[160px] md:w-[220px] rounded-md'/>
        <div className=' flex flex-col items-start justify-start gap-y-1 md:gap-y-2'>
            <p className=' font-bold text-xl '>{courseName}</p>
            <p className=' font-semibold text-lg text-pure-greys-400'>{tagName}</p>
            <div className=' flex gap-3 items-center'>
            <RatingStars rating_cnt={3.5} /> <span className=' font-semibold text-lg text-pure-greys-400' >{3.5} Rating</span></div>
        </div>
      </div>
        <div className=' flex flex-col items-center'>
            <p className=' text-yellow-50 font-edu-sa text-xl md:text-2xl lg:text-3xl mb-5'> ₹{price}</p>
            <div className=' md:p-4 p-2 bg-richblack-600 text-pink-200 w-fit h-fit rounded-md cursor-pointer'
                onClick={ () => {

                    dispatch(deleteItem(item._id));
                }}
            >
                <RiDeleteBinLine className=' w-6 h-6' />
            </div>
        </div>
    </div>
    <div className=' h-1 border-b-2 border-richblack-500 w-full my-5'></div>
    </>
  )
}

export default CartItemCard
