import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { LoginForm } from '../components/LoginForm'
import "../css/pages/login.css"

const Login = () => {
  return (
    <main className='login-main'>
        <Link href={"/"} className='back-link'>
          <h1>My T⊙D⊙s</h1>
          <FontAwesomeIcon icon={faArrowLeft}/>
        </Link>
        <LoginForm/>
    </main>
  )
}

export default Login