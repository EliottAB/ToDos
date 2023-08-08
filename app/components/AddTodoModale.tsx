'use client'

import React, { Dispatch } from 'react'
import "../css/components/addTodoModale.css"

export const AddTodoModale = ({setModaleOpened}: {setModaleOpened: Dispatch<boolean>}) => {

    window.addEventListener("keydown", (e)=>{
        e.key === "Escape" && setModaleOpened(false)
    })

  return (
    <div className='modale-container'>
        <div className='addtodo-modale'>
                <h2>Add a Todo</h2>
            <form>
                <input type="text" placeholder="Enter a new Todo's text"/>
                <button type='button' onClick={()=>setModaleOpened(false)} className='canceltodo-button'>Cancel</button>
                <button type='button' className='savetodo-button'>Save</button>
            </form>
        </div>
    </div>
  )
}