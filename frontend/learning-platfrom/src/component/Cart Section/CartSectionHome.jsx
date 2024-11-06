import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItemCard from './CartItemCard';
import { resetCart } from '../../Store/Slices/CartSlice';
import toast from 'react-hot-toast';

const CartSectionHome = () => {
  const {totalPrice ,  cartItems , totalItems } = useSelector((store) => store.Cart);
  const { user } = useSelector((store) => store.User);
  // console.log(to)
  const dispatch = useDispatch();
  const style = {
    'background-image': 'linear-gradient(90deg, rgba(135,132,186,1) 0%, rgba(189,204,204,1) 6%, rgba(71,209,35,1) 35%, rgba(37,210,140,1) 66%, rgba(0,212,255,1) 100%)' , 
    color: 'transparent' , 
    'background-clip': 'text'
  }
  console.log(cartItems);
  return (
    <div className=' w-full h-full mb-10 font-mono'>
      <div className=' w-[90%] md:w-[70%] h-full mx-auto mt-5'>
        <p className=' font-mono text-3xl font-medium text-richblack-25 mb-6'>Cart</p>
        <div className=' flex flex-col justify-center items-start gap-y-3 mb-4'>
          <div className=' w-full flex items-center justify-between'>
          <p className='text-lg text-pure-greys-200 mb-[-10px]'>{totalItems} Courses in Cart</p>
          <button
                className=" font-edu-sa w-fit flex items-center justify-center px-3 md:px-6 py-3 rounded-md bg-blue-100 text-pure-greys-800
             font-semibold md:text-lg border-b-[3px] border-l-[3px] border-richblack-600 hover:scale-105 transition-all duration-500"
             onClick={() => dispatch(resetCart())}
              >
                Remove All
              </button>
          
          </div>
          <div className=' h-1 border-b-2 border-richblack-500 w-full'></div>
          <div className=' flex items-center justify-around bg-richblack-700  h-36 w-full rounded-md bg-opacity-60'>
            <p className=' font-semibold text-xl  lg:text-2xl'>Total Price : <span className=' text-yellow-100 text-2xl lg:text-3xl'>₹{totalPrice}</span></p>
            <button
                className=" font-edu-sa w-fit flex items-center justify-center px-3 lg:px-6 py-3 rounded-md bg-yellow-100 text-pure-greys-800
             font-semibold lg:text-lg border-b-[3px] border-l-[3px] border-white hover:scale-105 transition-all duration-500"
             onClick={() => {
              if(user.accountType != "Studnet"){
                    toast.error("Please Lon in into a Student account");
                    return;
                  }
             }}
              >
                Buy Now
              </button>
          </div>
        </div> 
        
        {
          cartItems && cartItems.length <= 0 && 
          <p className=' text-center text-2xl font-bold' style={style}>No items in the cart</p>
        }
        {
          cartItems && cartItems.length > 0 && 
          cartItems.map((item) => (
              <CartItemCard item = {item}/>
          ))
            
        }
      </div>
    </div>
  )
}

export default CartSectionHome
