import {React, useState} from 'react'

import {Link} from '@mui/material'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4" sx ={{paddingTop: 2, paddingBottom: 5}}>
                        Health Watch
                    </Typography>

                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
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
                                    <Typography sx={{paddingTop: 1}}>Remember me</Typography>
                                </Stack>
                            </Grid>


                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                            onClick={()=>{
                                handleLogin()
                            }}
                        >
                            Log in
                        </Button>
                        <Grid container justifyContent="center">
                            <Stack direction={'column'} spacing={1}>
                                <Grid item>
                                    <Link href="" variant="body2">
                                        Forgot Password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="" variant="body2">
                                        Don't have an account? Sign up!
                                    </Link>
                                </Grid>
                            </Stack>
                           
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default Login;