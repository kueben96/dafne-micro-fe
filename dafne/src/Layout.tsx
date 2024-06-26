import React, { useEffect, useState } from 'react'
import AppBarHeader from './components/Header'
import DafneDrawer from './components/DafneDrawer'
import { CssBaseline, Theme, ThemeProvider, createTheme, CircularProgress } from '@mui/material'
import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Notification from './components/Notification';

const Main = styled('main')(

    ({ theme, open }: { theme: Theme; open: boolean }) => ({
        marginTop: 60,
        ... (open && {
            marginLeft: theme?.layout?.drawerWidth,

        }),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

    }),
);

const Layout = () => {

    const [isNavOpen, setIsNavOpen] = useState(true);
    const defaultTheme = createTheme({});
    const [theme, setTheme] = useState(defaultTheme);


    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    // const [theme, setTheme] =
    //     React.useState(null);

    useEffect(() => {
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
            <CssBaseline />
            <DafneDrawer handleDrawerToggle={handleNavToggle} isNavOpen={isNavOpen} />
            <AppBarHeader handleDrawerToggle={handleNavToggle} />
            <Notification />
            <Main theme={theme} open={isNavOpen}>
                <Outlet />
            </Main>
        </ThemeProvider>
    )
}

export default Layout