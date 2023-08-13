'use client'

import React, {FormEvent, Fragment, useRef, useState} from 'react'
import "../css/components/loginForm.css"
import { useUserContext } from '../context/userContext'
import { useRouter } from 'next/navigation'


export const LoginForm = () => {
    const [formType, setFormType] = useState("login")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const { signUp, logIn, createUserInDatabase, setUserTodos, getUserTodos, setUserId } = useUserContext()
    const router = useRouter()

    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)
    const confirmPasswordInput = useRef<HTMLInputElement>(null)

    function switchForm(){
        if (!loadingSubmit) {
            setEmailError("")
            setPasswordError("")
            setConfirmPasswordError("")
            setFormType(formType === "login" ? "signup" : "login")
        }
    }

    function checkEmail(): string{
        if (!emailInput.current?.value.length) {
            return("Please enter your email")
        }else if(!emailInput.current.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)){
            return("Please enter a valid email")
        }else{
            return("")
        }
    }
    
    function checkPassword(): string{
        if (!passwordInput.current?.value.length) {
            return("Please enter a password")
        }else if(formType === "signup" && passwordInput.current.value.length<8){
            return("Must contains at least 8 characters")
        }else if(formType === "signup" && !passwordInput.current.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]*$/)){
            return("Must contains at least 1 maj, 1 min, 1 number")
        }else if(formType === "signup" && passwordInput.current.value.length > 20){
            return("No more than 20 characters")
        }else{
            return("")
        }
    }

    function checkConfirmPassword(): string{
        if (!confirmPasswordInput.current?.value.length) {
            return("Please confirm your password")
        }else if(confirmPasswordInput.current.value != passwordInput.current?.value){
            return("Must be the same as password")
        }else{
            return("")
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        if (!loadingSubmit) {
            const getEmailError = checkEmail()
            const getPasswordError = checkPassword()
            const getConfirmPasswordError = checkConfirmPassword()
            setEmailError(getEmailError)
            setPasswordError(getPasswordError)
            setConfirmPasswordError(getConfirmPasswordError)
            
            if (formType === "signup") {
                if (getEmailError === "" && getPasswordError === "" && getConfirmPasswordError === ("")) {
                    setLoadingSubmit(true)
                    try {
                        const signupResponse = await signUp(emailInput.current?.value, passwordInput.current?.value)
                        try {
                            await createUserInDatabase(signupResponse.user.uid)
                            setUserId(signupResponse.user.uid)
                            router.push("/")
                        } catch (error) {
                            setEmailError("Something went wrong...")
                        }
                    } catch (error: any) {
                        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                            setEmailError("Your email is already used")
                        }else{
                            setEmailError("Something went wrong...")
                        }
                    }
                    setLoadingSubmit(false)
                }
            }else if (formType === "login"){
                if (getEmailError === "" && getPasswordError === "") {
                    setLoadingSubmit(true)
                    try {
                        const loginResponse = await logIn(emailInput.current?.value, passwordInput.current?.value)
                        setUserId(loginResponse.user.id)
                        setUserTodos(await getUserTodos(loginResponse.user.uid))
                        router.push("/")
                    } catch (error: any) {
                        if (error.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
                            setEmailError("You failed too many times, your account is temporaly disabled. Try again later")
                        }else if (error.message === "Firebase: Error (auth/wrong-password)." || error.message === "Firebase: Error (auth/user-not-found).") {
                            setEmailError("Your email or password is incorrect")
                        }else{
                            setEmailError("Something went wrong...")
                        }
                    }
                    setLoadingSubmit(false)
                }
            }
        }
    }

    return(
        
        <form className='login-form' onSubmit={(e)=>handleSubmit(e)}>
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
                        <button type='submit' className='login-send'>{loadingSubmit ? <div className='loading'></div> : "Login"}</button>
                        <p className='switch-form'>You don't have an account ? <button type='button' onClick={switchForm}>Sign Up !</button></p>
                    </Fragment>
                :
                    <Fragment>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input ref={confirmPasswordInput} type="password" name="confirm-password" id="confirm-password" placeholder='Re-enter your Password'/>
                        <p className='error-message'>{confirmPasswordError}</p>
                        <button type='submit' className='signup-send'>{loadingSubmit ? <div className='loading'></div> : "Sign Up"}</button>
                        <p className='switch-form'>You already have an account ? <button type='button' onClick={switchForm}>Log in !</button></p>
                    </Fragment>

            }
        </form>
    )

}