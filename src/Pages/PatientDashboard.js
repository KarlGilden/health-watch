import { Box, Button, Stack, Typography } from '@mui/material';
import * as React from 'react';

import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase'
import SwipeableTemporaryDrawer from "../Components/Navbar.tsx"
import { collection, where, getDocs, query } from 'firebase/firestore';

const PatientDashboard = () => {

    const { user, retrievePatient } = useAuth()

    const [patientData, setPatientData] = React.useState();

    React.useEffect(()=>{
        if(user){
            getPatientData()
        }
    })

    const getPatientData = async () => {
        retrievePatient(user.email)
    }

    const btn = {
        width: 500, background:"#9DD9F3"
    }

    return (
        <div >
            <SwipeableTemporaryDrawer />
            <Box m={5} pt={3}>
                <Stack justifyContent="center" alignItems="center" direction="column" spacing={3} >
                    <Typography variant="h4" sx={{paddingBottom: 4}}>
                        Dashboard
                    </Typography>

                    <Button variant="contained" sx={{...btn}}>
                        Emergency
                    </Button>
                    <Button variant="contained" sx={{...btn}}>
                        My Health Records
                    </Button>
                    <Button sx={{...btn}} variant="contained">
                        Contact Health Professional
                    </Button>
                    <Button variant="contained" sx={{...btn}}>
                        Book Appointment
                    </Button>
                    <Button variant="contained" sx={{...btn}}>
                        Reminders
                    </Button>
                </Stack>
            </Box>
        </div>
    )
}

export default PatientDashboard;