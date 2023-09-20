import React, { useEffect, useState } from 'react'
import AppBarHeader from './components/Header'
import DafneDrawer from './components/DafneDrawer'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Main = styled('main')(
    // TODO: check if there is still enough space for content only add margin if overlaps
    // TODO: think of layout concept after implementing main content
    ({ theme, open }: { theme: Theme; open: boolean }) => ({
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

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    const [theme, setTheme] =
        React.useState(null);

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
            <div>
                Loading theme...
            </div>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarHeader handleDrawerToggle={handleNavToggle} />
            <DafneDrawer handleDrawerToggle={handleNavToggle} isNavOpen={isNavOpen} />
            <Main theme={theme} open={isNavOpen}>
                <Outlet />
            </Main>
        </ThemeProvider>
    )
}

export default Layout