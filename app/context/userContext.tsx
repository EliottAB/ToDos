'use client';

import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { auth, database } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Loader } from "../components/Loader";

type TodoType = {
    id: number,
    title: string,
    fav: boolean,
    finished: boolean
}

type UserContextType = {
    loggedin: boolean, 
    setLoggedin: Dispatch<boolean>, 
    userTodos: TodoType[],
    setUserTodos: Dispatch<Array<TodoType>>,
    loadingDatas: boolean,
    setLoadingDatas: Dispatch<boolean>,
    signUp: Function,
    logIn: Function,
    logOut: Function
    createUserInDatabase: Function
}

export const UserContext = createContext<UserContextType>({
    loggedin: false, 
    setLoggedin: ()=>{}, 
    userTodos: [],
    setUserTodos: ()=>{},
    loadingDatas: true,
    setLoadingDatas: ()=>{},
    signUp: ()=>{},
    logIn: ()=>{},
    logOut: ()=>{},
    createUserInDatabase: ()=>{}
})

export function UserContextProvider({children}: {children: ReactNode}){

    const [loggedin, setLoggedin] = useState(false)
    const [userTodos, setUserTodos] = useState<TodoType[]>([])
    const [loadingDatas, setLoadingDatas] = useState(true)
    const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
    const logIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
    const logOut = () => signOut(auth)

    //this function write the user in the collection "users" in the database
    const createUserInDatabase = async (userId: string | number) =>{
        const userRef = doc(database, "users", userId.toString())
        const userSnapshot = await getDoc(userRef)
        if (!userSnapshot.exists()) {
            await setDoc(userRef, {})
        }
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            if (currentUser) {
                setLoggedin(true)
            }else{
                setLoggedin(false)
            }
            setLoadingDatas(false)
        })
        return unsubscribe
    }, [])

    const values = {
        loggedin, 
        setLoggedin, 
        userTodos,
        setUserTodos,
        loadingDatas,
        setLoadingDatas,
        signUp,
        logIn,
        logOut,
        createUserInDatabase
    }

    return (
        <UserContext.Provider value={values}>
            {!loadingDatas ? children : <Loader/>}
        </UserContext.Provider>
    )
}

export const useUserContextProvider = () => useContext(UserContext)