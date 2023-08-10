'use client'

import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../context/userContext'
import '../css/components/header.css'

export const Header = () => {
  const { loggedin, logOut } = useContext(UserContext)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [logoutTimer, setLogoutTimer] = useState(0)

  function handleLogout(){
    if (confirmLogout) {
      logOut()
    }else{
      setConfirmLogout(true)
      setLogoutTimer(3)
      setTimeout(() => {
        setConfirmLogout(false)
      }, 3000);
    }
  }

  useEffect(()=>{
    if(logoutTimer !== 0){
      setTimeout(() => {
        setLogoutTimer(logoutTimer - 1)
      }, 1000);
    }
  }, [logoutTimer])

  return (
    <header className='header'>
        <Link href={"/"}><Image src={logo} alt='ToDos Logo' className='logo'/></Link>
        <h1>My T⊙D⊙s</h1>
        {!loggedin ?
          <Link href="login" className='log-in-link'><FontAwesomeIcon icon={faUser}/>Log in</Link>
          :
          <button className='log-out' onClick={()=>handleLogout()}><FontAwesomeIcon icon={faSignOut}/>{confirmLogout ? "Confirm? " + logoutTimer : "Log out"}</button>
        }
    </header>
  )
}
