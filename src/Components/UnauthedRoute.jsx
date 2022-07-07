import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {Outlet, Navigate} from 'react-router-dom'
import { auth, db } from '../firebase/firebase'

const UnauthedRoute = () => {
    const { user, checkRole } = useAuth()
    const [isPractitioner, setIsPractitioner] = useState(false)
    useEffect(()=>{
        getRole()
    })

    const getRole = async () =>{
        setIsPractitioner(await checkRole())
    }
  return (
    <>
      {user ? <Navigate to="/dashboard"/> : <Outlet/>}

    </>


  )
}

export default UnauthedRoute