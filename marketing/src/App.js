import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Button, ThemeProvider, Typography, CircularProgress, createTheme } from '@mui/material'

const App = () => {
    const defaultTheme = createTheme({});
    const [theme, setTheme] = useState(defaultTheme);

    const navigateToAuthApp = () => {
        window.dispatchEvent(
            new CustomEvent("[external] navigated",
                { detail: '/auth/login' })
        );
    }
    React.useEffect(() => {
        let isMounted = true; // This flag tracks whether the component is mounted

        import('theme/theme')
            .then((sharedTheme) => {
                if (isMounted) {
                    // Only set the state if the component is still mounted
                    setTheme(sharedTheme.default);
                }
            })
            .catch((error) =>
                console.error('Error loading shared theme', error)
            );

        // Return a cleanup function that sets isMounted to false when the component unmounts
        return () => {
            isMounted = false;
        };
    }, []);

    if (!theme) {
        return (
            <CircularProgress />
        );
    }



    return (
        <ThemeProvider theme={theme}>
            <h1>Marketing App</h1>
            <p>{theme.palette.primary.main}</p>
            <Typography variant='h1'>Marketing App</Typography>
            <Button onClick={navigateToAuthApp}>auth</Button>
            <Link to='/contribute'>Contribute</Link>
            <Link to='/about'>About</Link>
            <Link to='/documentation'>Documentation</Link>
            <Outlet />
        </ThemeProvider>
    )
}

export default App