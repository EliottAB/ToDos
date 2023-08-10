'use client'

import React, { Dispatch, Fragment, useContext, useState } from 'react'
import { Todo } from './Todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddTodoModale } from './AddTodoModale';
import { UserContext } from '../context/userContext';

type Todo = {
  id: number;
  title: string;
  favorite: boolean;
};

const todos: Todo[] = [
  {title: "Faire les courses et prendre le chien du voisin dans le petit parc sans faire attention aux voitures qui pourraient passer", id: 1, favorite: false},
  {title: "Créer une ToDoList", id: 2, favorite: false},
  {title: "Faire les courses", id: 3, favorite: false},
  {title: "Créer une ToDoList", id: 4, favorite: false},
  {title: "Créer une ToDoList", id: 5, favorite: false},
  {title: "Faire les courses", id: 6, favorite: false},
  {title: "Créer une ToDoList", id: 7, favorite: false},
  {title: "Créer une ToDoList", id: 8, favorite: false},
  {title: "Faire les courses", id: 9, favorite: false},
]

export const Todos = () => {
  
  const [modaleOpened, setModaleOpened]: [boolean, Dispatch<boolean>] = useState(false)
  const {loggedin} = useContext(UserContext)

  return (
    loggedin ?
    <Fragment>
      {modaleOpened && <AddTodoModale setModaleOpened={setModaleOpened} />}
        <ul className='todos'>{todos.map(todo => <Todo title={todo.title} key={todo.id}/>)}</ul>
        <button className='add-button' onClick={()=>setModaleOpened(true)}><FontAwesomeIcon icon={faPlus}/></button>
        <ul className='completed-todos'>{todos.map(todo => <Todo title={todo.title} key={todo.id}/>)}</ul>
    </Fragment>
    :
    <p className='ask-login'>Please Login or Signup to use the Todos</p>
  )
}
