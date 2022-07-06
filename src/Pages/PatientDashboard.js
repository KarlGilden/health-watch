import { Box, Button, Stack, Typography } from '@mui/material';
import * as React from 'react';

import SwipeableTemporaryDrawer from "../Components/Navbar.tsx"

const PatientDashboard = () => {

import { useAuth } from '../context/AuthContext';


const PatientDashboard = () => {

    const { user } = useAuth()

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
}}

export default PatientDashboard;