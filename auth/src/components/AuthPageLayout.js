import { Box, Grid, ThemeProvider } from '@mui/material'
import React from 'react'
import { Header, LeftContainer, LoginButton, RightContainer, Subline } from '../styles/authStyles'
import Navbar from './Navbar'
import { theme } from '../styles/theme'

const AuthPageLayout = ({ isLoginMode, onToggleMode, children }) => {
    console.log("Authpagelaou")
    console.log(isLoginMode)
    return (
        <ThemeProvider theme={theme}>
            <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
                <Navbar />
                <Grid container>
                    <Grid item xs={isLoginMode ? 4 : 3} sm={isLoginMode ? 7 : 6}>
                        <LeftContainer>
                            <Header>{isLoginMode ? "Log in to DaFne" : "Create an account"}</Header>
                            <Subline>
                                {isLoginMode ? "Don't have an account yet?" : "Already Have an Account?"}
                            </Subline>
                            <LoginButton onClick={onToggleMode} variant="outlined">
                                {isLoginMode ? "Register" : "Login"}
                            </LoginButton>
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