import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url='http://localhost:8000/products';

const getAllProducts = async()=>{
    try{
      const response = await fetch(url)
      if(response.ok){
        const result = await response.json();     
        console.log(result);
        return result;
      }
    }catch(error){
      console.log(error);
    }
     
  };
export const loadAllProducts = createAsyncThunk('allProducts/loadAllProducts', async()=>{
    try{
      const response = await fetch(url)
      if(response.ok){
        const result = await response.json();     
        return result;
      }
    }catch(error){
      console.log(error);
    }
     
  });

const addProductSlice = createSlice({
    name: 'allProducts',
    initialState: {
        recipes: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(loadAllProducts.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            action.payload.map((item) => {
                if(!state.recipes.includes(item) ){
                    state.recipes.push(item);
                }else{
                    return
                }
            });
        })
        .addCase(loadAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        });
    }
})

export const selectAllProducts=(state)=>state.allProducts.recipes;

export const {} = addProductSlice.actions;
export default addProductSlice.reducer;

