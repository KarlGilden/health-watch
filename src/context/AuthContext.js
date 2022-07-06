import React, { useState, useContext, useEffect, FC} from 'react'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDocs} from "firebase/firestore";


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

    // Simple function to test adding a patient works
    // Eventually pass in a patient object I think, then add it
    const addPatient = async() => {
        setAuthLoading(true)
        try {
            const docRef = await addDoc(collection(db, "Patients"), {
            name: "Yeran",
            last: "Edmonds",
            born: 1881
            });
            console.log("added patient: ", docRef.id);
        } catch (e) {
            console.error("Error added patient: ", e);
        }}
    
    // Simple function to retrieve a patient
    // Currently just prints each patient's data according to id
    // Also returns the first doc for testing purposes
    const retrievePatient = async() => {
        setAuthLoading(true)
        try {
            const querySnapshot = await getDocs(collection(db, "Patients"));
            var toReturn;
            querySnapshot.forEach((doc) => {
                if (doc.id == 0) {
                    toReturn = doc;
                }
                console.log(`${doc.id} => ${doc.data()}`);
            });
            return toReturn;
        } catch (e) {
            console.error("error retrieving patienr: ", e);
        }
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
