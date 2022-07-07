import React, { useState, useContext, useEffect, FC} from 'react'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDocs, getDoc, setDoc, query, where} from "firebase/firestore";


export const AuthContext = React.createContext();

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
    const [isPractitioner, setIsPractitioner] = useState(undefined) 
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
        }catch (error){
            console.log(error)
        }
        setAuthLoading(false)
    }
    const checkRole = async (email) => {
        const docRef = doc(db, "practitioners", email);
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            navigate('/dashboards')

        }else{
            navigate('/dashboard')
        }
    }

    const login = async (email, password) => {
        setAuthLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setIsPractitioner(await checkRole(email))
            // if(isPractitioner == true){
                
            //     navigate('/dashboards')
    
            // }else if(isPractitioner == false){
            //     navigate('/dashboard')
            // }
        }catch(error){
            return error.message
        }
        setAuthLoading(false)

     }



    const logout = async () => {
         await signOut(auth)
     }

    // variable to ref patients table

    const practitionerRef = collection(db, "practitioners");

    // Simple function to test adding a patient works
    // Eventually pass in a patient object I think, then add it
    const addPatient = async(patient) => {
        setAuthLoading(true)
        try {
            await setDoc(doc(db, "patients", patient.email), {
                name: patient.name,
                email: patient.email,
                DOB: patient.DOB,
                NHI: patient.NHI
            });
            
            console.log("added patient: ", patient.name);
        } catch (e) {
            console.error("Error added patient: ", e);
        }}
    
    // Simple function to retrieve a patient
    // Currently just prints each patient's data according to id
    // Also returns the first doc for testing purposes
    const retrievePatient = async(email) => {
        try {
            const q = query(collection(db, "patients"), where("email", "==", email));

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs[0].data()
        } catch (e) {
            console.error("error retrieving patient: ", e);
        }
    }

    const addPractitioner = async(practitioner) => {
        try {
            await setDoc(doc(practitionerRef, practitioner.email), {
                name: practitioner.name,
                email: practitioner.email,
                DOB: practitioner.DOB,
                HPI: practitioner.HPI
            });
            
            console.log("added practitioner: ", practitioner.name);
        } catch (e) {
            console.error("Error added patient: ", e);
        }}

    const retrievePractitioner = async(email) => {
        setAuthLoading(true)
        try {
            const doc = await getDoc(practitionerRef, email);
            if (!doc.exists()) {
                throw 'Practitioer does not exist';
            }

            const returnPract = {
                name: doc.data().name,
                email: doc.data().email,
                DOB: doc.data().DOB,
                HPI: doc.data().HPI
            }
            return returnPract
        } catch (e) {
            console.error("error retrieving practitioner: ", e);
        }
    }

     const value = {
        user,
        isPractitioner,
        signup,
        authLoading,
        retrievePatient,
        login,
        logout,
        checkRole
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
