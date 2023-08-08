'use client';

import { createContext, Dispatch, ReactNode, useContext, useState } from "react";

type TodoType = {
    title: string,
    id: number
}

type UserContextType = {
    loggedin: boolean,
    setLoggedin: Dispatch<boolean>
    userTodos: TodoType[],
    setUserTodos: Dispatch<TodoType[]>
}

export const UserContext = createContext<UserContextType>({
    loggedin: false,
    setLoggedin: ()=>{},
    userTodos: [],
    setUserTodos: ()=>{}
})

export function UserContextProvider({children}: {children: ReactNode}){

    const [loggedin, setLoggedin] = useState(false)
    const [userTodos, setUserTodos] = useState<TodoType[]>([])
    const values = {
        loggedin, 
        setLoggedin, 
        userTodos,
        setUserTodos
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContextProvider = () => useContext(UserContext)