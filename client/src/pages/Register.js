import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import personlogo from '../img/person.svg';

function Register(){
const [userName, setUserName]=useState('');
const [password, setPassword]=useState('');
const [err, setErr]=useState('');

const navigate = useNavigate();


const handleUsername=(e)=> {
    console.log(userName);
    setUserName(e.target.value);
  };
  function handlePassword(e) {
    setPassword(e.target.value);
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
    async function register(data){
        try{
            const response = await fetch('api/register',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
                
            });
            const res=await response.json();
            if(response.ok){
                setErr(res.message)
                return navigate(`/${res.redirect}`)
                
            }else{
                setErr(res.message)
                
            }
        }catch(err){
            setErr(err);
            console.log(err)
        }
    }
    register(data);
}
    useEffect(()=>{
    }, [])
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
                    <button type="submit" onClick={event=>handleClick(event)}  className="bg-indigo-500 mt-5 mb-3 text-gray-100 py-1 rounded-lg w-full px-8">Register</button>
                </form>
                
            </div>
        
        </div>
        
        
    )
}

export default Register;