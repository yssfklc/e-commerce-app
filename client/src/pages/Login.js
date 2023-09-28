import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import personlogo from '../img/person.svg';
import { useDispatch, useSelector } from "react-redux";
import { isLoggedin, tryLogin, isLoading, message } from "../features/sessionSlice";
import google from '../img/google.svg';


const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function Register(){
const [email, setEmail]=useState('');
const [password, setPassword]=useState('');
const [err, setErr]=useState('');
const [pasErr, setPasErr]=useState('');
const [bothErr, setBothErr]=useState('');
const dispatch= useDispatch();
const isLogin=useSelector(isLoggedin);
const loading=useSelector(isLoading);
const mess=useSelector(message);
const navigate = useNavigate();


const handleEmail=(e)=> {
    let errror = '';
    setErr('')
    if (!isEmail(email)) {
        errror = "Check Your Email Format";
    }
 
    setErr(errror);
    setEmail(e.target.value);
  };
  function handlePassword(e) {
    
 
    setBothErr('');
    setPassword(e.target.value);

  }
const handleClick=(event)=>{
    event.preventDefault();
    if(err !== ''){
        return
    }
    if(email==='' || password===''){
        return setBothErr('Fill password and email area');
    }
    let data ={
        username:email,
        password:password
    } 
    dispatch(tryLogin(data));
    
    
        if(!loading && isLogin){
            console.log('tried to navigate')
            navigate('/orders');
        }else if(!loading && !isLogin){
            console.log(mess)
            setErr(mess)
            navigate('/login');
        }
    
}
const handleGoogleAuth=(event)=>{
    event.preventDefault();
    window.open('/auth/google', '_self');
    navigate('/orders');
}
useEffect(()=>{
    
    if(isLogin){
        console.log('tried to navigate')
        navigate('/orders');
    }else{
        navigate('/login');
    }
}, [isLogin, ])
    return (
        <div className="flex flex-col items-center  justify-center  min-h-screen">
            <div className="bg-gray-500 py-8 px-4 rounded-lg w-1/5 max-sm:w-4/5 max-md:w-2/5">
                <form >
                    <div className="flex items-center justify-center ">
                        <img src={personlogo} className="w-10"/>
                    </div>
                    <div className="flex flex-col mb-1 ">
                        <label className="text-gray-100 text-xs mb-1">E-mail</label>
                        <input type="email" value={email} onChange={handleEmail} className="rounded-lg bg-gray-800 text-gray-100 h-8 text-sm px-1" placeholder="Type Your Email"/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-100 text-xs mb-1">Password</label>
                        <input type="password" value={password} onChange={handlePassword} className="rounded-lg bg-gray-800 text-gray-100 h-8 text-sm px-1 " autoComplete="current-password" placeholder="Type Your Password"/>
                        <span className="text-red-800 text-xs">{err?err:bothErr}</span>
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