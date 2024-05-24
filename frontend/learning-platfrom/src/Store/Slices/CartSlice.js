import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart" , 
    initialState : {
        totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    } , 
    setTotalItems : (state , action) => {
        state.totalItems = action.payload;
    }
    // add item 
    // delete item 
    // reset cart 
})

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;