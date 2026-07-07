import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart" , 
    initialState : {
        totalItems : 0,
        cartItems : [] , 
        totalPrice : 0 ,
    } , 
    reducers : {
        setCart : (state , action) => {
            const courses = action.payload || [];
            state.cartItems = courses;
            state.totalItems = courses.length;
            state.totalPrice = courses.reduce((sum, item) => sum + (item.price || 0), 0);
        } , 
        resetCart : (state) => {
            state.totalItems = 0;
            state.totalPrice = 0;
            state.cartItems = [];
        }
    }
});

export const { setCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
