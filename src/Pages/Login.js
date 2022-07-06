import * as React from 'react';

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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const theme = createTheme();
const Login = () => {
    return (
            <Container component="main" fullWidth>
            
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        
                    }}
                >
                    <Typography component="h1" variant="h2" sx ={{paddingTop: 2, paddingBottom: 5}}>
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
                                />
                            </Grid>
                            <Grid item>
                                <Stack sx={{paddingRight: 10}} direction='row'>
                                    <Checkbox {...label} defaultChecked />
                                    <Typography sx={{paddingTop: 1}}>Remember Me</Typography>
                                </Stack>
                            </Grid>


                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2, background: '#9DD9F3'}}
                        >
                            Log in
                        </Button>
                        <Grid container justifyContent="center">
                            <Stack direction={'column'}>
                                <Grid item>
                                    <Link href="" variant="body2">
                                        Forgot Password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="" variant="body2">
                                        Don't have an account? Sign up
                                    </Link>
                                </Grid>

                            </Stack>   
                        </Grid>

                        <Grid sx={{marginTop: 7}}>
                            <SOSButton/>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    );
}
export default Login;