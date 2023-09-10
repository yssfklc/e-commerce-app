import React, { useEffect, useState } from "react";
import './Register.css';
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
            const response = await fetch('http://localhost:8000/register',{
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
        <div className="form-container">
            <form className="form">
                <div className="form-element-img">
                    <img src={personlogo}/>
                </div>
                <div className="form-element">
                    <label>Username</label>
                    <input type="text" value={userName} onChange={handleUsername} required/>
                </div>
                <div className="form-element">
                    <label>Password</label>
                    <input type="password" value={password} onChange={handlePassword} required/>
                    <span className="error">{err?err:''}</span>
                </div>
                <button type="submit" onClick={event=>handleClick(event)} className="loginbutton">Register</button>
            </form>
        </div>
    )
}

export default Register;