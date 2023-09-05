import React, { useEffect, useState } from "react";
import './Register.css';
import { useNavigate } from 'react-router-dom';
import personlogo from '../img/person.svg';
import { useDispatch, useSelector } from "react-redux";
import { isLoggedin, tryLogin } from "../features/sessionSlice";
import { Navigate } from "react-router-dom";


function Register(){
const [userName, setUserName]=useState('');
const [password, setPassword]=useState('');
const dispatch= useDispatch();
const isLogin=useSelector(isLoggedin);
const navigate = useNavigate();


const handleUsername=(e)=> {
    setUserName(e.target.value);
    console.log(userName);
  };
  function handlePassword(e) {
    setPassword(e.target.value);
    console.log(password);
  }
const handleClick=(event)=>{
    event.preventDefault();
    let data ={
        username:userName,
        password:password
    } 
    dispatch(tryLogin(data));
    console.log(isLogin)
    if(isLogin){
        navigate('/home');
    }else{
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
useEffect(()=>{
    if(isLogin){
        navigate('/home');
    }else{
        navigate('/login');
    }
}, [isLogin])
    return (
        <div className="form-container">
            <form className="form">
                <div className="form-element-img">
                    <img src={personlogo}/>
                </div>
                <div className="form-element">
                    <label>Username</label>
                    <input type="text" value={userName} onChange={handleUsername}/>
                </div>
                <div className="form-element">
                    <label>Password</label>
                    <input type="password" value={password} onChange={handlePassword}/>
                </div>
                <button type="submit" onClick={event=>handleClick(event)}>Login</button>
            </form>
        </div>
    )
}

export default Register;