import { createSlice } from "@reduxjs/toolkit";

const addBasketSlice= createSlice({
    name:'basket',
    initialState:[],
    reducers:{
        addToBasket:(state, action)=>{
            state.push(action.payload);
            
        },
        removeFromBasket:(state, action)=>{
            return state = state.filter(recipe => recipe.id !== action.payload.id);
        }
    }
});


export const selectAllBasket = (state)=>{
    console.log(`State.basket: ${state.basket}`)
    return state.basket
};

export const {
    addToBasket,
    removeFromBasket
} = addBasketSlice.actions;
export default addBasketSlice.reducer;