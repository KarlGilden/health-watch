import React, { useState, useContext, useEffect, FC} from 'react'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

// useAuth hook

export function useAuth(){
    const context = useContext(AuthContext)
    if (context === undefined) {
      throw new Error("useAuthContext must be within AuthProvider")
    }
    return context
}

// create auth provider

const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(undefined)    
    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        setAuthLoading(true)
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser)
        });
        setAuthLoading(false)
    }

    const signup = async (email, password) => {
        setAuthLoading(true)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('/courses')
        }catch (error){
            console.log(error)
        }
        setAuthLoading(false)
    }

    const login = async (email, password) => {
        setAuthLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/courses')
        }catch(error){
            return error.message
        }
        setAuthLoading(false)

     }

     const logout = async () => {
         await signOut(auth)
     }

     const value = {
        user,
        signup,
        authLoading,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
