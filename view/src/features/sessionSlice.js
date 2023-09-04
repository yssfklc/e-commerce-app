import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

const url='http://localhost:8000/login';


export const tryLogin=createAsyncThunk('users/tryLogin', async(data)=>{
        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
                
            });
            // const user = await response.json();
            if(response.ok){
                const result = await response.json();     
                return result;
            }else{
                // navigate('/login')
                // navigate('/login')
            }
        }catch(error){
            console.log(error);
        }

})

const addSessionSlice=createSlice({
    name:'users',
    initialState:{
        user: {},
        isLoggedin:false,
        isLoading: false,
        hasError: false
    },
    reducres:{},
    extraReducers: (builder)=>{
        builder
        .addCase(tryLogin.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(tryLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.user=action.payload;
            state.isLoggedin=true;
            console.log({user:state.user, isLoggedin:state.isLoggedin});
            // Cookies.set('auth',action.payload.sesionId, { expirationDate:action.payload.sessionInfo.cookie.expires });
        })
        .addCase(tryLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        });
    }
})

export const isLoggedin=(state=>state.users.isLoggedin);
export const selectCurrentUser=(state=>state.users.user);
export const {} = addSessionSlice.actions;

export default addSessionSlice.reducer;
