import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../assets/logo.png"
import '../css/components/header.css'
import { HeaderLogButton } from './HeaderLogButton'

export const Header = () => {

  return (
    <header className='header'>
        <Link href={"/"}><Image src={logo} alt='ToDos Logo' className='logo'/></Link>
        <h1>My T⊙D⊙s</h1>
        <HeaderLogButton/>
    </header>
  )
}
