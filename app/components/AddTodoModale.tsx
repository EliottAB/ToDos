'use client'

import React, { Dispatch, useState } from 'react'
import "../css/components/addTodoModale.css"

export const AddTodoModale = ({setModaleOpened}: {setModaleOpened: Dispatch<boolean>}) => {

    const [closeModaleClassName, setCloseModaleClassName] = useState("")

    window.addEventListener("keydown", (e)=>{
        e.key === "Escape" && setModaleOpened(false)
    })

    function closeModale() {
        setCloseModaleClassName("close-modale")
        setTimeout(() => {
            setModaleOpened(false)
        }, 200);
    }

  return (
    <div className={'modale-container ' + closeModaleClassName}>
        <div className='addtodo-modale'>
                <h2>Add a Todo</h2>
            <form>
                <input type="text" placeholder="Enter a new Todo's text"/>
                <button type='button' onClick={closeModale} className='canceltodo-button'>Cancel</button>
                <button type='button' className='savetodo-button'>Save</button>
            </form>
        </div>
    </div>
  )
}