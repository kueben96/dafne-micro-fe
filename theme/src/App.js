import { Button, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import customTheme from './shared-theme'

const App = () => {
    return (
        <ThemeProvider theme={customTheme}>
            <Typography variant="h6">Theme</Typography>
            <Button variant="contained" color='primary'>Button</Button>
        </ThemeProvider>
    )
}

export default App