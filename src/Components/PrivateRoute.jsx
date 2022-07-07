import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoute = () => {
    const { user } = useAuth()

  return (
    <>

      {user ? <Outlet/> : <Navigate to="/"/>}

    </>


  )
}

export default PrivateRoute