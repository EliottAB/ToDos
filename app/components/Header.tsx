import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../css/components/header.css'

export const Header = () => {
  return (
    <header className='header'>
        <Link href={"/"}><Image src={logo} alt='ToDos Logo' className='logo'/></Link>
        <h1>My T⊙D⊙s</h1>
        <Link href="login" className='log-in-link'><FontAwesomeIcon icon={faUser}/>Log in</Link>
    </header>
  )
}
