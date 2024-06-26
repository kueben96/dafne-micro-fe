import { Box, Grid, ThemeProvider, createTheme, CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Header, LeftContainer, ButtonDaFne, RightContainer, Subline } from '../styles/authStyles'
import Navbar from './Navbar'

const AuthPageLayout = ({ isLoginMode, onToggleMode, children }) => {
    const defaultTheme = createTheme({});
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        import('theme/theme')
            .then((sharedTheme) => setTheme(sharedTheme.default))
            .catch((error) => console.error('Error loading shared theme', error));
    }, []);


    if (!theme) {
        return (
            <CircularProgress />
        );
    }

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