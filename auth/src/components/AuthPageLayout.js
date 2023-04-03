import { Box, Grid, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import { Header, LeftContainer, ButtonDaFne, RightContainer, Subline } from '../styles/authStyles'
import Navbar from './Navbar'
import { theme } from '../styles/theme'

const AuthPageLayout = ({ isLoginMode, onToggleMode, children }) => {

    return (
        <ThemeProvider theme={theme}>
            <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
                <Navbar />
                <Grid container height="100%">
                    <Grid item xs={isLoginMode ? 4 : 3} sm={isLoginMode ? 7 : 6}>
                        <LeftContainer>
                            <Header>{isLoginMode ? "Log in to DaFne" : "Create an account"}</Header>
                            <Subline>
                                {isLoginMode ? "Don't have an account yet?" : "Already Have an Account?"}
                            </Subline>
                            <ButtonDaFne onClick={onToggleMode} variant="outlined">
                                {isLoginMode ? "Register" : "Login"}
                            </ButtonDaFne>
                        </LeftContainer>
                    </Grid>
                    <Grid item xs={isLoginMode ? 8 : 9} sm={isLoginMode ? 5 : 6}>
                        <RightContainer>{children}</RightContainer>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}

export default AuthPageLayout