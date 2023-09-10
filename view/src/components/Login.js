import React, { useEffect, useState } from "react";
import './Register.css';
import { useNavigate } from 'react-router-dom';
import personlogo from '../img/person.svg';
import { useDispatch, useSelector } from "react-redux";
import { isLoggedin, tryLogin, login } from "../features/sessionSlice";
import { Navigate } from "react-router-dom";
import google from '../img/google.svg';



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
        <div className="form-container">
            <div className="form">
                <form >
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
                        <span className="error">{err?err:''}</span>
                    </div>
                    <button type="submit" onClick={event=>handleClick(event)} className="loginbutton">Login</button>
                </form>
                <button type="submit" onClick={event=>handleGoogleAuth(event)} className="googleloginbutton"><img src={google} className='google-icon'/>
Google Login</button>
            </div>
        </div>
    )
}

export default Register;