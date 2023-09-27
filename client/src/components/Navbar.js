import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { isLoggedin, logout } from "../features/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import {tryLogout} from '../features/logoutSlice';
import { useNavigate } from "react-router-dom";
import i1 from '../img/i1.svg';

function Navbar(){
  const dispatch=useDispatch();
  const isLogin=useSelector(isLoggedin);
  const navigate=useNavigate();
  const handlelogout = ((event)=>{
    event.preventDefault();
    dispatch(tryLogout());
    dispatch(logout());
    navigate('/login');
  })

    return (
        <>
          <div className='flex justify-between bg-gray-800 text-gray-200 py-3 px-10 text-xl max-sm:text-sm max-sm:flex-col max-sm:px-5 sticky top-0'>
            <div className='flex items-center justify-center'>
                <NavLink><img src={i1} alt="" className="w-12 mr-5 max-sm:w-6 max-sm:block"/></NavLink>
                <NavLink to='/home' className={ ({ isActive }) => isActive? 'activeNavLink text-2xl pr-5 max-sm:text-xs max-sm:pr-2 ' : 'pinactiveNavLink pr-5'} >Home</NavLink>
                <NavLink to='/products' className={ ({ isActive }) => isActive? 'activeNavLink text-2xl pr-5 max-sm:text-sm max-sm:pr-2 ' : 'pinactiveNavLink pr-5'}>Products</NavLink>
                <NavLink to='/orders' className={ ({ isActive }) => isActive? 'activeNavLink text-2xl pr-5 max-sm:text-sm max-sm:pr-2' : 'pinactiveNavLink pr-5'}>Orders</NavLink>
                <NavLink to='/basket' className={ ({ isActive }) => isActive? 'activeNavLink text-2xl pr-5 max-sm:text-sm max-sm:pr-2' : 'pinactiveNavLink pr-5'}>My Basket</NavLink>
            </div>
            {isLogin?
              <div className='flex text-gray-100 justify-center align-center'>
                <button className="" onClick={(e)=>handlelogout(e)}>Logout</button>
                {/* <button className="logout-button" onClick={(e)=>handlelogout(e)}>Profile</button> */}
              </div>:
              <div className='flex justify-center align-center'>
                <NavLink to='/register' className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mr-5 py-1 px-3 rounded-lg text-center'>Sign Up</NavLink>
                <NavLink to='/login' className='mr-5 py-1 px-3 text-center'>Sign In</NavLink>
              </div>}
            
          </div>
          <Outlet/>
        </>
    )
}

export default Navbar;
