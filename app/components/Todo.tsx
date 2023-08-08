'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faStar, faCheck } from '@fortawesome/free-solid-svg-icons'
import "../css/components/todo.css"

export const Todo = React.memo(({title}: {title: string}) => {
  return (
    <li className='todo'>
        <button className='fav-button'><FontAwesomeIcon icon={faStar}/></button>
        <p>{title}</p>
        <button className='check-button'><FontAwesomeIcon icon={faCheck}/></button>
        <button className='delete-button'><FontAwesomeIcon icon={faTrash}/></button>
    </li>
  )
})
