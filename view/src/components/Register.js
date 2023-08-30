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
            if(response.ok){
                navigate('/home')
            }else if(!response.ok && response.redirected){
                console.log('lale')
                setErr('user already exist')
                
            }else{
                setErr('try again')
            }
        }catch(err){
            setErr(err);
            console.log(err)
        }
    }
    register(data);
}
    useEffect(()=>{
        console.log(err)
    }, [err])
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
                    <span>{err?err:''}</span>
                </div>
                <button type="submit" onClick={event=>handleClick(event)}>Register</button>
            </form>
        </div>
    )
}

export default Register;