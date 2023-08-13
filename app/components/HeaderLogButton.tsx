'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../context/userContext'
import Link from 'next/link'

export const HeaderLogButton = () => {
    const { loggedin, logOut } = useUserContext()
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
    !loggedin ?
      <Link href="login" className='log-in-link'><FontAwesomeIcon icon={faUser}/>Log in</Link>
    :
      <button className='log-out' onClick={()=>handleLogout()}><FontAwesomeIcon icon={faSignOut}/>{confirmLogout ? "Confirm? " + logoutTimer : "Log out"}</button>
  )
}
