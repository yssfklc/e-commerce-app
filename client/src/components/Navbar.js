import React, { useEffect, useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { isLoggedin, logout } from "../features/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import {tryLogout} from '../features/logoutSlice';
import { useNavigate } from "react-router-dom";
import i1 from '../img/i1.svg';
import i7 from '../img/i7.svg';

function Navbar(){
  const dispatch=useDispatch();
  const isLogin=useSelector(isLoggedin);
  const [isOpen, setIsOpen]=useState(false);
  const navigate=useNavigate();
  const handlelogout = ((event)=>{
    event.preventDefault();
    dispatch(tryLogout());
    dispatch(logout());
    navigate('/login');
  })
  const handleMenu=(e)=>{
    e.preventDefault();
    setIsOpen(!isOpen)
  }
  

    return (
        <>
          <div className='flex justify-between bg-gray-800 text-gray-200 py-3 px-10 text-xl max-md:text-sm max-md:px-5 sticky top-0 max-md:h-14 max-md:justify-between z-10'>
            <div className='flex items-center justify-between max-md:justify-start'>
                <NavLink><img src={i1} alt="" className="w-12 mr-5 max-md:w-10 max-md:block"/></NavLink>
                <NavLink to='/home' className={ ({ isActive }) => isActive? 'activeNavLink text-2xl pr-5 max-md:text-xs max-md:pr-2 max-md:hidden ' : 'pinactiveNavLink pr-5 max-md:hidden'} >Home</NavLink>
                <NavLink to='/products' className={ ({ isActive }) => isActive? 'activeNavLink text-2xl pr-5 max-md:text-sm max-md:pr-2 max-md:hidden' : 'pinactiveNavLink pr-5 max-md:hidden'}>Products</NavLink>
                <NavLink to='/orders' className={ ({ isActive }) => isActive? 'activeNavLink text-2xl pr-5 max-md:text-sm max-md:pr-2 max-md:hidden' : 'pinactiveNavLink pr-5 max-md:hidden'}>Orders</NavLink>
                <NavLink to='/basket' className={ ({ isActive }) => isActive? 'activeNavLink text-2xl pr-5 max-md:text-sm max-md:pr-2 max-md:hidden' : 'pinactiveNavLink pr-5 max-md:hidden'}>My Basket</NavLink>
                <button className="md:hidden" onClick={(e)=>handleMenu(e)}><img src={i7} alt="" className=""/></button>
                <div className="md:hidden max-md:absolute max-md:top-14 max-md:left-10 max-md:bg-gray-400 max-md:rounded-lg max-md:w-28 ">
                  {isOpen?<div className="max-md:flex max-md:flex-col max-md:items-center py-5">
                  <NavLink to='/products' className='border-gray-100 border-b-2 pb-1 mb-2 w-20'>Products</NavLink>
                  <NavLink to='/orders' className='border-gray-100 border-b-2 pb-1 mb-2 w-20'>Orders</NavLink>
                  <NavLink to='/basket' className='border-gray-100 border-b-2 pb-1 mb-2 w-20'>My Basket</NavLink>
                  </div>:null}
                </div>
            </div>
            
            {isLogin?
              <div className='flex text-gray-100 justify-center align-center '>
                <button className="" onClick={(e)=>handlelogout(e)}>Logout</button>
                {/* <button className="logout-button" onClick={(e)=>handlelogout(e)}>Profile</button> */}
              </div>:
              <div className='flex justify-center align-center '>
                <NavLink to='/register' className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mr-5 py-1 px-3 rounded-lg text-center max-md:mr-2'>Sign Up</NavLink>
                <NavLink to='/login' className='mr-5 py-1 px-3 text-center max-md:mr-2'>Sign In</NavLink>
              </div>}
            
          </div>
          
          <Outlet/>
        </>
    )
}

export default Navbar;
