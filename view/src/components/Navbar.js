import React from "react";
import './Navbar.css';
import { Outlet, Link, NavLink } from "react-router-dom";
function Navbar(){


    return (
        <>
          <navbar className='navbar'>
            <div className='leftnavelements'>
                <NavLink to='/home' className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>Home</NavLink>
                <NavLink to='/products' className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>Products</NavLink>
                <NavLink to='/orders' className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>Orders</NavLink>
                <NavLink to='/basket' className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>My Basket</NavLink>
            </div>
            <div className='rightnavelements'>
                <NavLink to='/register'>Sign Up</NavLink>
                <NavLink to='/login'>Sign In</NavLink>
            </div>
            
          </navbar>
          <Outlet/>
        </>
    )
}

export default Navbar;
