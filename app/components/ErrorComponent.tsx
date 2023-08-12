import React from 'react'
import "../css/components/errorComponent.css"

export const ErrorComponent = ({message}: {message: string}) => {
  return (
    <p className='global-error-message'>{message}</p>
  )
}