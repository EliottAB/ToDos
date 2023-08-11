'use client'

import React, { Dispatch, useRef, useState } from 'react'
import "../css/components/addTodoModale.css"

export const AddTodoModale = ({setModaleOpened, submitAddTodo}: {setModaleOpened: Dispatch<boolean>, submitAddTodo: Function}) => {

    const [closeModaleClassName, setCloseModaleClassName] = useState("")
    const [errorAddTodo, setErrorAddTodo] = useState(false)
    const todoTextInput = useRef<HTMLInputElement>(null)

    window.addEventListener("keydown", (e)=>{
        e.key === "Escape" && setModaleOpened(false)
    })

    function closeModale() {
        setCloseModaleClassName("close-modale")
        setTimeout(() => {
            setModaleOpened(false)
        }, 200);
    }

    function createTodo() {
        if (todoTextInput.current?.value) {
            const newTodo = {
                title: todoTextInput.current.value,
                fav: false,
                completed: false
            }
            submitAddTodo(newTodo)
            closeModale()
            setErrorAddTodo(false)
        }else{
            setErrorAddTodo(true)
        }
    }

  return (
    <div className={'modale-container ' + closeModaleClassName}>
        <div className='addtodo-modale'>
                <h2>Add a Todo</h2>
            <form>
                <input ref={todoTextInput} type="text" placeholder="Enter a new Todo's text" className={errorAddTodo ? "error-add" : ""}/>
                <button type='button' onClick={()=>closeModale()} className='canceltodo-button'>Cancel</button>
                <button type='button' onClick={()=>createTodo()} className='savetodo-button'>Save</button>
            </form>
        </div>
    </div>
  )
}