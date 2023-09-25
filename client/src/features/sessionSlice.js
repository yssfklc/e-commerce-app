import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

const url='http://localhost:8000/login';


export const tryLogin=createAsyncThunk('users/tryLogin', async(data)=>{
        console.log('login-request sent')
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
                return response;

            }
        }catch(error){
            console.log(error);
        }

});



const addSessionSlice=createSlice({
    name:'users',
    initialState:{
        userId:'',
        isLoggedin:false,
        message:'',
        isLoading: false,
        hasError: false,
    },
    reducers:{
        login(state, id){
            state.userId=id;
            state.isLoggedin=true;
        },
        logout(state){
            state.userId={};
            state.isLoggedin=false;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(tryLogin.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(tryLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            if(action.payload.message){
                console.log(action.payload.message)
                state.message=action.payload.message;
            }
            if(action.payload.user){
                state.userId=action.payload.user;
                state.isLoggedin=true;
            }
        })
        .addCase(tryLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        });
    },

})

export const isLoggedin=(state=>state.users.isLoggedin);
export const isLoading=(state=>state.users.isLoading);
export const message=(state=>state.users.message);
export const selectCurrentUser=(state=>state.users.userId);
export const {login, logout} = addSessionSlice.actions;

export default addSessionSlice.reducer;
