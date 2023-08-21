import React from "react";
import './Navbar.css';
import { Outlet } from "react-router-dom";
function Navbar(){


    return (
        <>
          <navbar className='navbar'>
            <div className='leftnavelements'>
                <a href='/products'>Products</a>
                <a href='/orders'>Orders</a>
                <a href='/users'>Users</a>
            </div>
            <div className='rightnavelements'>
                <a href='/register'>Sign Up</a>
                <a href='/register'>Sign In</a>
            </div>
            
          </navbar>
          <Outlet/>
        </>
    )
}

export default Navbar;
