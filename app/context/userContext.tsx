'use client';

import { createContext, Dispatch, ReactNode, useEffect, useState, useContext } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { auth, database } from "../firebase/config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { Loader } from "../components/Loader";
import { ErrorComponent } from "../components/ErrorComponent"
import { usePathname } from "next/navigation";

export type TodoType = {
    title: string
    fav: boolean
    completed: boolean
}

type UserContextType = {
    userId: string
    setUserId: Dispatch<string>
    loggedin: boolean
    setLoggedin: Dispatch<boolean>
    userTodos: TodoType[]
    setUserTodos: Dispatch<Array<TodoType>>
    loadingDatas: boolean
    setLoadingDatas: Dispatch<boolean>
    signUp: Function
    logIn: Function
    logOut: Function
    createUserInDatabase: Function
    getUserTodos: Function
    editTodo: Function
}

export const UserContext = createContext<UserContextType>({
    userId: "",
    setUserId: ()=>{},
    loggedin: false, 
    setLoggedin: ()=>{}, 
    userTodos: [],
    setUserTodos: ()=>{},
    loadingDatas: true,
    setLoadingDatas: ()=>{},
    signUp: ()=>{},
    logIn: ()=>{},
    logOut: ()=>{},
    createUserInDatabase: ()=>{},
    getUserTodos: ()=>{},
    editTodo: ()=>{}
})

export function UserContextProvider({children}: {children: ReactNode}){

    const urlPath = usePathname()
    const [userId, setUserId] = useState("")
    const [loggedin, setLoggedin] = useState(false)
    const [userTodos, setUserTodos] = useState<TodoType[]>([])
    const [loadingDatas, setLoadingDatas] = useState(urlPath === "/" ? true : false)
    const [globalError, setGlobalError] = useState(false)
    const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
    const logIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
    const logOut = () => signOut(auth)

    //this function write the user in the collection "users" in the database
    const createUserInDatabase = async (userId: string | number) =>{
        const userRef = doc(database, "users", userId.toString())
        const userSnapshot = await getDoc(userRef)
        if (!userSnapshot.exists()) {
            await setDoc(userRef, {todos: []})
        }
    }

    const getUserTodos = async (userId: string | number): Promise<Array<TodoType>> => {
        // await getDocs(collection(database, "users", userId.toString(), "todos"))
        const userRef = doc(database, "users", userId.toString())
        const userSnapshot =  await getDoc(userRef);
        if (userSnapshot.data()?.todos) {
            return userSnapshot.data()?.todos
        }else{
            return []
        }
    }

    const editTodo = async (newTodos: Array<TodoType>) => {
        try {
            const userRef = doc(database, "users", userId)
            await updateDoc(userRef, {
                todos: newTodos
            })
        } catch (error) {
            setGlobalError(true)
        }
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async(currentUser)=>{
            if (currentUser && (urlPath === "/" ||urlPath === "/login")) {
                setUserTodos(await getUserTodos(currentUser.uid))
                setUserId(currentUser.uid)
                setLoggedin(true)
            }else{
                setUserId("")
                setLoggedin(false)
            }
            setLoadingDatas(false)
        })
        return unsubscribe
    }, [])

    return (
        <UserContext.Provider value={{
            userId,
            setUserId,
            loggedin, 
            setLoggedin, 
            userTodos,
            setUserTodos,
            loadingDatas,
            setLoadingDatas,
            signUp,
            logIn,
            logOut,
            createUserInDatabase,
            getUserTodos,
            editTodo
        }}>
            {globalError ? 
            <ErrorComponent message="Sorry, something went wrong..."/>
            :
            loadingDatas ? 
            <Loader/>
            :
            children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)