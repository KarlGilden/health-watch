import { Avatar, Container, Button,Grid, Stack, Typography, Card, CardMedia, CardContent, CardActions, CardActionArea} from '@mui/material';
import * as React from 'react';
import SOSButton from '../Components/SOSButton'
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
        <div>
            <Stack direction="row" justifyContent="space-evenly" spacing={10} sx={{padding:5}}>
                <SwipeableTemporaryDrawer />
                <Typography variant="h4" sx={{paddingBottom: 4, paddingLeft: 15, color: '#FE675D'}}>
                            Dashboard
                </Typography>
                <Button></Button>
            </Stack>

            <Container>

                <Stack direction="column" spacing={1}>
                    <Card fullWidth sx={{ padding: 3, background: '#FE675D'}}>
                    <Stack direction="row" spacing={5} >
                        <Avatar sx={{width:100, height: 100, padding: 2}} />
                        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                            <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                Name: {patientData?.name}
                            </Typography>
                            <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                NHI: {patientData?.NHI}
                            </Typography>
                            <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                DOB: {patientData?.DOB}
                            </Typography>
                            <Typography variant="h8" sx={{color: '#FFFFFF'}}>
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

                    <Stack direction="row" spacing={1} >
                        <Card sx={{width:'40%', padding: 3, background: '#FE675D'}} >
                            <Stack direction="row" spacing={5} >
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                                    <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                        Blood Type: O+ 
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                        Height: 168cm
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                        Weight: 80kg
                                    </Typography>
                                </Stack>
                            </Stack>
                            </Card>

                            <Card sx={{width:'60%', padding: 3, background: '#FE675D'}}>
                            <Stack direction="row" spacing={5} >
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                                    <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                        Emergency Contacts 
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                        - Karen Doe
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                        - Joe Doe
                                    </Typography>
                                </Stack>
                            </Stack>
                            </Card>
                    </Stack>


                    <Card fullWidth sx={{padding: 3, background: '#FE675D'}}>
                        <Stack direction="row" spacing={5} >
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                                <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                    Allergies And Reactions
                                </Typography>
                                <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                    - Bees
                                </Typography>
                                <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                    - Swelling of entire body
                                </Typography>
                            </Stack>
                        </Stack>
                        </Card>


                        <Stack direction="row" spacing={1}>
                        <Card sx={{width:'50%', padding: 3, background: '#FE675D'}}>
                            <Stack direction="row" spacing={5} >
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                                    <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                        Current Medication
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                        - Lisinoprli
                                    </Typography>
                                    <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                        - Glyburide
                                    </Typography>
                                </Stack>
                            </Stack>
                            </Card>

                            <Card sx={{width:'50%', padding: 3, background: '#FE675D'}}>
                            <Stack direction="row" spacing={5} >
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                                    <Typography variant="h8" sx={{color: '#FFFFFF'}}>
                                        Heart Rate
                                    </Typography>
                                    <Typography variant="h4" sx={{color: '#FFFFFF'}}>
                                        100bpm
                                    </Typography>
                                </Stack>
                            </Stack>
                            </Card>
                    </Stack>

                    <Grid sx={{paddingTop: 5, paddingBottom:5}}>
                        <SOSButton />
                    </Grid>

                    

                </Stack>
            </Container>
        </div>
    )
}

export default PatientDashboard;