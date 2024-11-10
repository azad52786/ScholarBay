import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"
const cartSlice = createSlice({
    name : "cart" , 
    initialState : {
        totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
        cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [] , 
        totalPrice : localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0 ,
    } , 
    reducers : {
        setTotalItems : (state , action) => {
            state.totalItems = action.payload;
        } , 
        addToCart : (state , action) => {
            let course = action.payload ;
            let index = state.cartItems.findIndex((item) => item._id === course._id);
            if(index >= 0){
                toast.error("Course is Already inside in cart");
                return ;
            }
            
            state.cartItems.push(course);
            state.totalItems++;
            state.totalPrice += course.price;
            
            localStorage.setItem("totalItems" , JSON.stringify(state.totalItems));
            localStorage.setItem("cartItems" , JSON.stringify(state.cartItems));
            localStorage.setItem("totalPrice" , JSON.stringify(state.totalPrice));
            
            toast.success("Course added to cart");
        } , 
        deleteItem : (state , action ) => {
            let courseId = action.payload ;
            let index = state.cartItems.findIndex((item) => item._id === courseId);
            if(index != -1){
            let courseArray = current(state.cartItems);
            let price = courseArray[index]?.price;
            state.cartItems.splice(index , 1);
            state.totalItems--;
            state.totalPrice -= price;
            
            
            localStorage.setItem("totalItems" , JSON.stringify(state.totalItems));
            localStorage.setItem("cartItems" , JSON.stringify(state.cartItems));
            localStorage.setItem("totalPrice" , JSON.stringify(state.totalPrice));
            toast.success("Course Deleted From Cart")
            }
        } , 
        
        resetCart : (state , action ) => {
            state.totalItems = 0;
            state.totalPrice = 0;
            state.cartItems = [];
            
            localStorage.removeItem("totalItems");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("totalPrice");
        }
    }
    
})

export const { setTotalItems , resetCart , deleteItem , addToCart } = cartSlice.actions;
export default cartSlice.reducer;