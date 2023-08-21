import React from "react";
import './Register.css'

function Register(){


    return (
        <div className="form-container">
            <form className="form">
                <div className="form-element">
                    <label>Username</label>
                    <input type="text"/>
                </div>
                <div className="form-element">
                    <label>Password</label>
                    <input type="password"/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;