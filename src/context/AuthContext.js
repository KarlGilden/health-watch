import React, { useState, useContext, useEffect, FC} from 'react'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import { setDoc, collection, doc, getDoc} from "firebase/firestore";


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

    // variable to ref patients table

    const patientRef = collection(db, "Patients");
    const practitionerRef = collection(db, "Practitioners");

    // Simple function to test adding a patient works
    // Eventually pass in a patient object I think, then add it
    const addPatient = async(patient) => {
        setAuthLoading(true)
        try {
            await setDoc(doc(patientRef, patient.email), {
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
            const doc = await getDoc(patientRef, email);
            if (!doc.exists()) {
                throw 'Patient does not exist';
            }

            const returnPatient = {
                name: doc.data().name,
                email: doc.data().email,
                DOB: doc.data().DOB,
                NHI: doc.data().NHI
            }

            return returnPatient;
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
