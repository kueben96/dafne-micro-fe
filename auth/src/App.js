import React, { useState } from 'react'
import { Paper, Container, ThemeProvider, Typography, Grid, Stack, Box, TextField, FormControl, InputLabel, MenuItem, Button, styled, Select } from '@mui/material'

import Navbar from './components/Navbar'

import { theme } from './theme'
import RegistrationForm from './components/RegistrationForm'


const App = () => {


    const LeftContainer = styled(Paper)(({ theme }) => ({
        height: '100vh',
        background: `linear-gradient(180deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.lighter})`,
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
                        <LeftContainer />
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
