import React, { useState } from 'react'
import AppBarHeader from './components/Header'
import DafneDrawer from './components/DafneDrawer'
import { Container, CssBaseline, Theme } from '@mui/material'
import { styled } from '@mui/styles';
import { Outlet } from 'react-router-dom';

const Main = styled('main')(
    // TODO: check if there is still enough space for content only add margin if overlaps
    // TODO: think of layout concept after implementing main content
    ({ theme, open }: { theme: any; open: boolean }) => ({
        ... (open && {
            marginLeft: theme.layout.drawerWidth,
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
    return (
        <>
            <CssBaseline />
            <AppBarHeader handleDrawerToggle={handleNavToggle} />
            <DafneDrawer handleDrawerToggle={handleNavToggle} isNavOpen={isNavOpen} />
            <Main open={isNavOpen}>
                <Outlet />
            </Main>
        </>
    )
}

export default Layout