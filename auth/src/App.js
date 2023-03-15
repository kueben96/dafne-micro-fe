import React, { useState } from 'react'
import { Paper, Container, ThemeProvider, Typography, Grid, Stack, Box, TextField, FormControl, InputLabel, MenuItem, Button, styled, Select } from '@mui/material'

import Navbar from './components/Navbar'

import { theme } from './styles/theme'
import RegistrationForm from './components/RegistrationForm'


const App = () => {


    const LeftContainer = styled(Paper)(({ theme }) => ({
        height: '100vh',
        background: `linear-gradient(120deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} , ${theme.palette.neutral.white})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: theme.spacing(30, 30),
    }));


    const Header = styled(Typography)(({ theme }) => ({
        fontSize: theme.typography.h3.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.common.white,
    }));

    const Subline = styled(Typography)(({ theme }) => ({
        fontSize: theme.typography.subtitle1.fontSize,
        color: theme.palette.neutral.white,
        marginTop: theme.spacing(5),
    }));

    const LoginButton = styled(Button)(({ theme }) => ({
        marginTop: theme.spacing(5),
        color: theme.palette.common.white,
        borderColor: theme.palette.common.white,
    }));

    const RightContainer = styled(Paper)({
        height: '100%',
        padding: '40px',
    });

    return (
        <ThemeProvider theme={theme}>
            <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
                <Navbar />
                <Grid container>
                    <Grid item xs={6}>
                        <LeftContainer>
                            <Header>Create an account</Header>
                            <Subline>Already Have an Account?</Subline>
                            <LoginButton variant="outlined">Login</LoginButton></LeftContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <RightContainer>

                            <RegistrationForm />
                        </RightContainer>
                    </Grid>
                </Grid>
            </Box>


        </ThemeProvider>
    )
}

export default App
