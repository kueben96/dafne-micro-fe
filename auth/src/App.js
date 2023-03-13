import React from 'react'
import { Button, createTheme, ThemeProvider, Typography } from '@mui/material'
import DataArrayIcon from '@mui/icons-material/DataArray';
import { Box, Container } from '@mui/system'
import styled from '@emotion/styled'

import { theme } from './theme'
const App = () => {
    const PinkButton = styled(Button)(({ theme }) => ({
        backgroundColor: theme.palette.neutral.black,
        color: theme.palette.neutral.white,
    }));
    return (
        <ThemeProvider theme={theme}>
            <Container >
                <h1>Auth App</h1>
                <Button variant='outlined' >Button outlined</Button>
                <Box>Box</Box>
                <Button color="neutral" startIcon={<DataArrayIcon />} variant='contained'>Button contained</Button>
                <Typography variant='h2'>h1 </Typography>
                <Button variant='contained' sx={{
                    backgroundColor: "pink",
                    margin: 5,
                    "&:hover": {
                        backgroundColor: "red"
                    }
                }}>custom button</Button>
                <PinkButton variant='contained'>CompPink</PinkButton>
            </Container>
        </ThemeProvider>
    )
}

export default App