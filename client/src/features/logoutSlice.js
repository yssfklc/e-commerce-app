import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";
import { logout } from "./sessionSlice";
import { useDispatch } from "react-redux";

const url='http://localhost:8000/logout';


export const tryLogout=createAsyncThunk('logout/tryLogout', async()=>{
        try{
            const response = await fetch(url);
            // const user = await response.json();
            if(response.ok){
                console.log('lale')
                logout();
            }else{
                // navigate('/Logout')
                // navigate('/Logout')
            }
        }catch(error){
            console.log(error);
        }

})

const addLogoutSlice=createSlice({
    name:'logout',
    initialState:{
        isLoading: false,
        hasError: false
    },
    reducers:{},
    extraReducers: [(builder)=>{
        builder
        .addCase(tryLogout.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(tryLogout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            console.log('basarılı logout')
        })
        .addCase(tryLogout.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        });
    }, ]
})

export const {} = addLogoutSlice.actions;

export default addLogoutSlice.reducer;
