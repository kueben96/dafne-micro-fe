import React, { useState } from 'react'
import { Paper, Container, ThemeProvider, Typography, Grid, Stack, Box, TextField, FormControl, InputLabel, MenuItem, Button, styled, Select } from '@mui/material'

import Navbar from './components/Navbar'

import { theme } from './styles/theme'
import RegistrationForm from './components/RegistrationForm'
import { Header, LoginButton, RightContainer, LeftContainer, Subline } from './styles/authStyles'
import LoginForm from './components/LoginForm'



const App = () => {


    // TODO: Handle ROUTING based on state!
    // /auth/login
    // /auth/signup

    const [isLoginMode, setisLoginMode] = useState(false)


    return (

        <ThemeProvider theme={theme}>
            <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
                <Navbar />
                <Grid container>
                    <Grid item xs={isLoginMode ? 7 : 6}>
                        <LeftContainer>
                            <Header>{isLoginMode ? "Log in to DaFne" : "Create an account"}</Header>
                            <Subline> {isLoginMode ? "Don't have an account yet?" : "Already Have an Account?"} </Subline>
                            <LoginButton onClick={() => setisLoginMode(!isLoginMode)} variant="outlined">{isLoginMode ? "Register" : "Login"}</LoginButton>
                        </LeftContainer>
                    </Grid>
                    <Grid item xs={isLoginMode ? 5 : 6}>
                        <RightContainer>
                            {isLoginMode ? <LoginForm /> : <RegistrationForm />}

                        </RightContainer>
                    </Grid>
                </Grid>
            </Box>


        </ThemeProvider>
    )
}

export default App
