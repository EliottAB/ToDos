'use client'

import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faStar, faCheck } from '@fortawesome/free-solid-svg-icons'
import "../css/components/todo.css"
import { UserContext } from '../context/userContext'

export const Todo = React.memo(({title, fav, index}: {title: string, fav: boolean, index: number}) => {

  const {setUserTodos, userTodos, editTodo} = useContext(UserContext)

  function addToFav(){
      const todoEdited = [...userTodos]
      todoEdited[index].fav = !todoEdited[index].fav
      editTodo(todoEdited)
      setUserTodos(todoEdited)
  }

  function complete(){
      const todoEdited = [...userTodos]
      todoEdited[index].completed = !todoEdited[index].completed
      editTodo(todoEdited)
      setUserTodos(todoEdited)
  }

  function deleteTodo(){
      const todoEdited = [...userTodos]
      todoEdited.splice(index, 1)
      editTodo(todoEdited)
      setUserTodos(todoEdited)
  }

  return (
    <li className='todo'>
        <button className={fav ? 'fav-button activate' : "fav-button"} onClick={()=>addToFav()}><FontAwesomeIcon icon={faStar}/></button>
        <p>{title}</p>
        <button className='check-button' onClick={()=>complete()}><FontAwesomeIcon icon={faCheck}/></button>
        <button className='delete-button' onClick={()=>deleteTodo()}><FontAwesomeIcon icon={faTrash}/></button>
    </li>
  )
})
