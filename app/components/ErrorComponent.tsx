import React from 'react'
import "../css/components/errorComponent.css"
import { Header } from './Header'

export const ErrorComponent = ({message}: {message: string}) => {
  return (
    <>
    <Header/>
    <p className='global-error-message'>{message}</p>
    </>
  )
}