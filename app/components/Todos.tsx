'use client'

import React, { Dispatch, Fragment, useContext, useEffect, useState } from 'react'
import { Todo } from './Todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddTodoModale } from './AddTodoModale';
import { UserContext } from '../context/userContext';
import { TodoType } from '../context/userContext';

// const todos: object[] = [
//   {title: "Faire les courses et prendre le chien du voisin dans le petit parc sans faire attention aux voitures qui pourraient passer", id: 1, favorite: false},
//   {title: "Créer une ToDoList", id: 2, favorite: false},
//   {title: "Faire les courses", id: 3, favorite: false},
//   {title: "Créer une ToDoList", id: 4, favorite: false},
//   {title: "Créer une ToDoList", id: 5, favorite: false},
//   {title: "Faire les courses", id: 6, favorite: false},
//   {title: "Créer une ToDoList", id: 7, favorite: false},
//   {title: "Créer une ToDoList", id: 8, favorite: false},
//   {title: "Faire les courses", id: 9, favorite: false},
// ]

export const Todos = () => {
  
  const [modaleOpened, setModaleOpened]: [boolean, Dispatch<boolean>] = useState(false)
  const {loggedin, setUserTodos, userTodos, editTodo} = useContext(UserContext)
  const [filteredTodos, setFilteredTodos] = useState(
    [...userTodos].reverse().sort((todoA, todoB) => {
      if (todoA.fav && !todoB.fav) {
        return -1
      }else if(!todoA.fav && todoB.fav){
        return 1
      }else{
        return 0
      }
    })
  )
  const todos = filteredTodos.filter(todo => !todo.completed)
  const completedTodos = filteredTodos.filter(todo => todo.completed)

  function submitAddTodo(newTodo: TodoType){
    const todoEdited = [...userTodos]
    todoEdited.push(newTodo)
    editTodo(todoEdited)
    setUserTodos(todoEdited)
  }

  useEffect(()=>{
    setFilteredTodos(
      [...userTodos].reverse().sort((todoA, todoB) => {
        if (todoA.fav && !todoB.fav) {
          return -1
        }else if(!todoA.fav && todoB.fav){
          return 1
        }else{
          return 0
        }
      })
    )
  }, [userTodos])
  
  return (
    loggedin 
    ?
    <Fragment>
        {todos.length !== 0 ?
        <ul className='todos'>
          {todos.map(todo =>
          <Todo key={todos.indexOf(todo)} title={todo.title} fav={todo.fav} index={userTodos.indexOf(todo)}/>)}
        </ul>
        :
        <p className='no-todo'>Nothing Todo</p>
        }

        <button className='add-button' onClick={()=>setModaleOpened(true)}><FontAwesomeIcon icon={faPlus}/></button>
        <div className="between-lists"></div>
        
        {completedTodos.length !== 0 ?
        <ul className='completed-todos'>
          {completedTodos.map(todo =>
          <Todo key={completedTodos.indexOf(todo)} title={todo.title} fav={todo.fav} index={userTodos.indexOf(todo)}/>)}
        </ul>
        :
        <p className='no-todo'>No Todo completed</p>
        }
        {modaleOpened && <AddTodoModale setModaleOpened={setModaleOpened} submitAddTodo={submitAddTodo}/>}
    </Fragment>
    :
    <p className='ask-login'>Please Login or Signup to use the Todos</p>
  )
}
