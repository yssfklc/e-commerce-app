import React from "react";
import './Navbar.css';
import { Outlet } from "react-router-dom";
function Navbar(){


    return (
        <>
          <navbar className='navbar'>
            <div className='leftnavelements'>
                <a href='/home'>Home</a>
                <a href='/products'>Products</a>
                <a href='/orders'>Orders</a>
            </div>
            <div className='rightnavelements'>
                <a href='/register'>Sign Up</a>
                <a href='/login'>Sign In</a>
            </div>
            
          </navbar>
          <Outlet/>
        </>
    )
}

export default Navbar;
