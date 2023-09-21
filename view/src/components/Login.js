import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import personlogo from '../img/person.svg';
import { useDispatch, useSelector } from "react-redux";
import { isLoggedin, tryLogin, login } from "../features/sessionSlice";
import { Navigate } from "react-router-dom";
import google from '../img/google.svg';
import Footer from "./Footer";



function Register(){
const [userName, setUserName]=useState('');
const [password, setPassword]=useState('');
const [err, setErr]=useState('');
const dispatch= useDispatch();
const isLogin=useSelector(isLoggedin);
const navigate = useNavigate();


const handleUsername=(e)=> {
    setUserName(e.target.value);
    setErr('');
    console.log(userName);
  };
  function handlePassword(e) {
    setPassword(e.target.value);
    setErr('');
    console.log(password);
  }
const handleClick=(event)=>{
    event.preventDefault();
    if(userName==='' || password===''){
        return setErr('Fill password and username area');
    }
    let data ={
        username:userName,
        password:password
    } 
    dispatch(tryLogin(data));
    if(isLogin){
        navigate('/orders');
    }else{
        setErr('incorrect informations')
        navigate('/login');
    }
    // async function register(data){
    //     try{
    //         const response = await fetch('http://localhost:8000/login',{
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Origin": "*"
    //                 // 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             body: JSON.stringify(data),
                
    //         });
    //         // const user = await response.json();
    //         console.log(response)
    //         if(response.ok){

    //             navigate('/home')
    //         }else{
    //             // navigate('/register')
    //             navigate('/login')
    //         }
    //     }catch(error){
    //         console.log(error);
    //     }

    // }
    // register(data);
    
    
    // e.preventDefault();
    // let isAuthenticated=false;
    // if(isAuthenticated){
    //     navigate('/home')
    // }else{
    //     navigate('/register')
    // }
}
const handleGoogleAuth=(event)=>{
    event.preventDefault();
    window.open('http://localhost:8000/auth/google', '_self');

}
useEffect(()=>{
    if(isLogin){
        navigate('/orders');
    }else{
        navigate('/login');
    }
}, [isLogin, ])
    return (
        <div className="flex flex-col items-center  justify-center  min-h-screen">
            <div className="bg-gray-500 py-8 px-4 rounded-lg w-1/5">
                <form >
                    <div className="flex items-center justify-center ">
                        <img src={personlogo} className="w-10"/>
                    </div>
                    <div className="flex flex-col mb-1 ">
                        <label className="text-gray-100 text-xs mb-1">Username</label>
                        <input type="text" value={userName} onChange={handleUsername} className="rounded-lg bg-gray-800 text-gray-100 h-8 text-sm px-1"/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-100 text-xs mb-1">Password</label>
                        <input type="password" value={password} onChange={handlePassword} className="rounded-lg bg-gray-800 text-gray-100 h-8 text-sm px-1"/>
                        <span className="text-red-800 text-xs">{err?err:''}</span>
                    </div>
                    <button type="submit" onClick={event=>handleClick(event)}  className="bg-indigo-500 mt-5 mb-3 text-gray-100 py-1 rounded-lg w-full px-8">Login</button>
                </form>
                <button type="submit" onClick={event=>handleGoogleAuth(event)} className="bg-red-700 text-gray-100 py-1 rounded-lg w-full px-8"><img src={google} className='inline mr-3 pb-1'/>
Google Login</button>
            </div>
        
        </div>
    )
}

export default Register;