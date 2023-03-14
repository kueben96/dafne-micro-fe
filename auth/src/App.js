import React, { useState } from 'react'
import { Button, createTheme, Container, ThemeProvider, Typography, Grid, Stack, Box } from '@mui/material'

import Navbar from './components/Navbar'

import { theme } from './theme'


const App = () => {


    return (
        <ThemeProvider theme={theme}>


            <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
                <Navbar />
                <Stack direction="row" >
                    <Box flex={1} sx={{ height: "100vh", backgroundColor: "primary.dark" }}>Leftededed</Box>
                    <Box flex={1} sx={{ height: "100vh", backgroundColor: "neutral.white" }}  >Right</Box>
                </Stack>
            </Box>


        </ThemeProvider>
    )
}

export default App