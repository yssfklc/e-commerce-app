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
        },
        removeAllFromBasket:(state, action)=>{
            console.log('test');
            return state = [];
        }
    }
});


export const selectAllBasket = (state)=>{
    return state.basket
};
export const selectBasketPrice = (state)=>{
    let count=0;
    state.basket.map(item=>count+=Number(item.price));
    return count.toFixed(2);
}

export const {
    addToBasket,
    removeFromBasket,
    removeAllFromBasket
} = addBasketSlice.actions;
export default addBasketSlice.reducer;