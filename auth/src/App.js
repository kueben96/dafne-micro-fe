import React, { useState } from 'react'
import { Button, createTheme, Container, ThemeProvider, Typography, Grid, Stack, Box } from '@mui/material'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Rightbar from './components/Rightbar'
import Feed from './components/Feed'
import styled from '@emotion/styled'
import { theme } from './theme'
import Add from './components/Add'

const App = () => {

    const [mode, setMode] = useState("dark")
    const darkTheme = createTheme({
        palette: {
            mode: mode
        }
    })

    const PinkButton = styled(Button)(({ theme }) => ({
        backgroundColor: theme.palette.neutral.black,
        color: theme.palette.neutral.white,
    }));
    return (
        <ThemeProvider theme={darkTheme}>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar />
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Sidebar setMode={setMode} mode={mode} />
                    <Feed />
                    <Rightbar />
                </Stack>
                <Add />
            </Box>
        </ThemeProvider>
    )
}

export default App