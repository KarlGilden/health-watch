import { Avatar, Container, Button, Stack, Typography, Card, CardMedia, CardContent, CardActions, CardActionArea} from '@mui/material';
import * as React from 'react';

import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase'
import SwipeableTemporaryDrawer from "../Components/Navbar.tsx"
import { collection, where, getDocs, query } from 'firebase/firestore';

const PatientDashboard = () => {

    const { user, retrievePatient } = useAuth()

    const [patientData, setPatientData] = React.useState({});

    React.useEffect(()=>{
        if(user != undefined){
            getPatientData()
        }
    }, [user])

    const getPatientData = async () => {
        const d = await retrievePatient(user.email)
        console.log(d)
        setPatientData(d)
    }

    return (
        <div style={{background: '#FE675D', height: "100%"}}>
            <Stack direction="row" spacing={10} sx={{padding:5}}>
                <SwipeableTemporaryDrawer />
                <Typography variant="h5" sx={{paddingBottom: 4, paddingLeft: 10, color: '#FFFFFF'}}>
                            Patient Profile
                </Typography>
            </Stack>

            <Container>

                <Stack direction="column" spacing={1}>
                    <Card fullWidth sx={{ padding: 3}}>
                    <Stack direction="row" spacing={5} >
                        <Avatar sx={{width:100, height: 100, padding: 2}} />
                        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                            <Typography variant="h8" sx={{color: '#FE675D'}}>
                                Name: {patientData?.name}
                            </Typography>
                            <Typography variant="h8" sx={{color: '#FE675D'}}>
                                NHI: {patientData?.NHI}
                            </Typography>
                            <Typography variant="h8" sx={{color: '#FE675D'}}>
                                DOB: {patientData?.DOB}
                            </Typography>
                            <Typography variant="h8" sx={{color: '#FE675D'}}>
                                    Age: 21
                            </Typography>
                        </Stack>
                    </Stack>
                    </Card>

                    <Card fullWidth>
                        <CardMedia
                            component="img"
                            sx={{
                                1:1,
                                width: '100%',
                                objectFit: 'cover',
                                height: 300,
                            }}
                            image={'https://www.seoshark.co.nz/wp-content/uploads/2018/11/local-seo.png'}
                            />
                    </Card>

                    <Stack direction="row" spacing={1}>
                        <Card sx={{width:'40%', padding: 3}}>
                            <Stack direction="row" spacing={5} >
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                                    <Typography variant="h8" sx={{color: '#FE675D'}}>
                                        Blood Type: O+ 
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FE675D'}}>
                                        Height: 168cm
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FE675D'}}>
                                        Weight: 80kg
                                    </Typography>
                                </Stack>
                            </Stack>
                            </Card>

                            <Card sx={{width:'60%', padding: 3}}>
                            <Stack direction="row" spacing={5} >
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                                    <Typography variant="h8" sx={{color: '#FE675D'}}>
                                        Emergency Contacts 
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FE675D'}}>
                                        - Karen Doe
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FE675D'}}>
                                        - Joe Doe
                                    </Typography>
                                </Stack>
                            </Stack>
                            </Card>
                    </Stack>


                    <Card fullWidth sx={{padding: 3}}>
                        <Stack direction="row" spacing={5} >
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                                <Typography variant="h8" sx={{color: '#FE675D'}}>
                                    Allergies And Reactions
                                </Typography>
                                <Typography variant="h8" sx={{color: '#FE675D'}}>
                                    - Bees
                                </Typography>
                                <Typography variant="h8" sx={{color: '#FE675D'}}>
                                    - Swelling of entire body
                                </Typography>
                            </Stack>
                        </Stack>
                        </Card>


                        <Stack direction="row" spacing={1}>
                        <Card sx={{width:'50%', padding: 3}}>
                            <Stack direction="row" spacing={5} >
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                                    <Typography variant="h8" sx={{color: '#FE675D'}}>
                                        Current Medication
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FE675D'}}>
                                        - Lisinoprli
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FE675D'}}>
                                        - Glyburide
                                    </Typography>
                                </Stack>
                            </Stack>
                            </Card>

                            <Card sx={{width:'50%', padding: 3}}>
                            <Stack direction="row" spacing={5} >
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                                    <Typography variant="h8" sx={{color: '#FE675D'}}>
                                        Heart Rate
                                    </Typography>
                                    <Typography variant="h4" sx={{color: '#FE675D'}}>
                                        100bpm
                                    </Typography>
                                </Stack>
                            </Stack>
                            </Card>
                    </Stack>

                    <Button fullWidth variant="contained" sx={{color: '#FE675D', background: 'white'}}>
                        Back
                    </Button>



                </Stack>
            </Container>
            
            





            {/* <Box m={5} pt={3} container>
                <Stack justifyContent="center" alignItems="center" direction="column" spacing={1} >
                    <Typography variant="h5" sx={{paddingBottom: 4}}>
                        Patient Profile
                    </Typography>
                    <Card fullWidth>
                        <Avatar />
                        <Typography>
                            Name: 
                        </Typography>

                    </Card>


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
            </Box> */}
        </div>
    )
}

export default PatientDashboard;