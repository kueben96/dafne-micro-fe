import React, { useState } from 'react'
import AppBarHeader from './components/Header'
import DafneDrawer from './components/DafneDrawer'
import { Container, CssBaseline } from '@mui/material'

const Layout = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };
    return (
        <>
            <CssBaseline />
            <AppBarHeader handleDrawerToggle={handleNavToggle} />
            <DafneDrawer handleDrawerToggle={handleNavToggle} isNavOpen={isNavOpen} />
            <Container>
                <h1>DaFne App</h1>
                <h1>DaFne App</h1>
                <h1>DaFne App</h1>
                <h1>DaFne App</h1>
                <h1>DaFne App</h1>
                <h1>DaFne App</h1>
                <h1>DaFne App</h1>
            </Container>
        </>
    )
}

export default Layout