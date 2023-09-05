import React from "react";
import './Navbar.css';
import { Outlet, Link, NavLink } from "react-router-dom";
import { isLoggedin, logout } from "../features/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import {tryLogout} from '../features/logoutSlice';
import { useNavigate } from "react-router-dom";

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
          <navbar className='navbar'>
            <div className='leftnavelements'>
                <NavLink to='/home' className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>Home</NavLink>
                <NavLink to='/products' className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>Products</NavLink>
                <NavLink to='/orders' className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>Orders</NavLink>
                <NavLink to='/basket' className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>My Basket</NavLink>
            </div>
            {isLogin?
              <div className='rightnavelements'>
                <button className="logout-button" onClick={(e)=>handlelogout(e)}>Logout</button>
                {/* <button className="logout-button" onClick={(e)=>handlelogout(e)}>Profile</button> */}
              </div>:
              <div className='rightnavelements'>
                <NavLink to='/register'>Sign Up</NavLink>
                <NavLink to='/login'>Sign In</NavLink>
              </div>}
            
          </navbar>
          <Outlet/>
        </>
    )
}

export default Navbar;
