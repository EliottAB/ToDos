'use client'

import React, {FormEvent, Fragment, useRef, useState} from 'react'
import "../css/components/loginForm.css"


export const LoginForm = () => {
    const [formType, setFormType] = useState("login")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)
    const confirmPasswordInput = useRef<HTMLInputElement>(null)

    function switchForm(){
        setFormType(formType === "login" ? "signup" : "login")
    }

    function checkEmail(){
        if (!emailInput.current?.value.length) {
            return("Please enter your email and retry")
        }else if(!emailInput.current.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)){
            return("Please enter a valid email and retry")
        }else{
            return("")
        }
    }
    
    function checkPassword(){
        if (!passwordInput.current?.value.length) {
            return("Please enter a password")
        }else if(passwordInput.current.value.length<8){
            return("Must contains at least 8 characters")
        }else if(!passwordInput.current.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]*$/)){
            return("Must contains at least 1 maj, 1 min, 1 number")
        }else if(passwordInput.current.value.length > 20){
            return("No more than 20 characters")
        }else{
            return("")
        }
    }

    function checkConfirmPassword() {
        if (!confirmPasswordInput.current?.value.length) {
            return("Please confirm your password")
        }else if(confirmPasswordInput.current.value != passwordInput.current?.value){
            return("Must be the same as password")
        }else{
            return("")
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        setEmailError(checkEmail())
        if (formType === "signup") {
            setPasswordError(checkPassword())
            setConfirmPasswordError(checkConfirmPassword())
        }
    }

    return(
        
        <form className='login-form' onSubmit={handleSubmit}>
            <h2>{formType === "login" ? "Login" : "Sign Up"}</h2>
            <label htmlFor="email">Email</label>
            <input ref={emailInput} type="email" name="email" id="email" placeholder='Enter your Email'/>
            <p className='error-message'>{emailError}</p>
            <label htmlFor="password">Password</label>
            <input ref={passwordInput} type="password" name="password" id="password" placeholder='Enter your Password'/>
            <p className='error-message'>{passwordError}</p>

            {
                formType === "login" ?
                    <Fragment>
                        <button type='submit' className='login-send'>Login</button>
                        <p className='switch-form'>You don't have an account ? <button type='button' onClick={switchForm}>Sign Up !</button></p>
                    </Fragment>
                :
                    <Fragment>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input ref={confirmPasswordInput} type="password" name="confirm-password" id="confirm-password" placeholder='Re-enter your Password'/>
                        <p className='error-message'>{confirmPasswordError}</p>
                        <button type='submit' className='signup-send'>Sign Up</button>
                        <p className='switch-form'>You already have an account ? <button type='button' onClick={switchForm}>Log in !</button></p>
                    </Fragment>

            }
        </form>
    )

}