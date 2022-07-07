import {React, useState} from 'react'

import {Link} from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import SOSButton from '../Components/SOSButton';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const theme = createTheme();
const Login = () => {

    const { login } = useAuth()

    // init navigation hook
    const navigate = useNavigate()

    // login form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if(email.length > 0 && password.length > 0){
            const e = await login(email, password)
            setError(e)
        }

    }

    return (
            <Container component="main" maxWidth sx={{background: '#FE675D', height: '100vh'}}>
            
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        
                    }}
                >
                    <Typography component="h1" variant="h2" sx ={{paddingTop: 2, paddingBottom: 5, color: '#FFFFFF'}}>
                        Health Watch
                    </Typography>

                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    variant="filled"
                                    type="email"
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"

                                    onChange={(e)=>{
                                        setEmail(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    variant="filled"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={"password"}
                                    id="password"
                                    autoComplete="new-password"

                                    onChange={(e)=>{
                                        setPassword(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Stack sx={{paddingRight: 10}} direction='row'>
                                    <Checkbox {...label} defaultChecked />
                                    <Typography sx={{paddingTop: 1, color: '#FFFFFF'}}>Remember Me</Typography>
                                </Stack>
                            </Grid>


                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2, background: '#FFFFFF', color:'#FE675D'}}
                            onClick={()=>{
                                handleLogin()
                            }}
                        >
                            Log in
                        </Button>
                        <Grid container justifyContent="center">
                            <Stack direction={'column'}>
                                <Grid item>
                                    <Link href="" variant="body2" sx={{color: '#FFFFFF'}}>
                                        Forgot Password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="" variant="body2" sx={{color: '#FFFFFF'}}>
                                        Don't have an account? Sign up
                                    </Link>
                                </Grid>

                            </Stack>   
                        </Grid>
                    </Box>
                </Box>
            </Container>
    );
}
export default Login;