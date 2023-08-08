'use client'

import React, {Fragment, useState} from 'react'
import "../css/components/loginForm.css"


export const LoginForm = () => {
    const [formType, setFormType] = useState("login")

    function switchForm(){
        setFormType(formType === "login" ? "signup" : "login")
    }

    return(
        
        <form className='login-form'>
            <h2>{formType === "login" ? "Login" : "Sign Up"}</h2>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder='Enter your Email'/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder='Enter your Password'/>

            {
                formType === "login" ?
                    <Fragment>
                        <button type='button' className='login-send'>Login</button>
                        <p>You don't have an account ? <button type='button' onClick={switchForm}>Sign Up !</button></p>
                    </Fragment>
                :
                    <Fragment>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" name="confirm-password" id="confirm-password" placeholder='Re-enter your Password'/>
                        <button type='button' className='signup-send'>Sign Up</button>
                        <p>You already have an account ? <button type='button' onClick={switchForm}>Log in !</button></p>
                    </Fragment>

            }
        </form>
    )

}