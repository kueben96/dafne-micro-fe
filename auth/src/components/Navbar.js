import { AppBar, useTheme, } from '@mui/material'
import React from 'react'
import LogoImg from '../assets/images/logo.png'
import { CustomToolbar, Logo } from '../styles/authStyles'

const Navbar = () => {
    const theme = useTheme()
    // TODO: differentiate if isolation mode or not
    // TODO: if isolation, then only refresh the page
    const navigateBackToShell = () => {
        window.dispatchEvent(
            new CustomEvent("[external] navigated",
                { detail: '/marketing/' })
        );
    }
    return (
        <AppBar sx={{ backgroundColor: theme?.palette.common.white }} position='relative'>
            {/* Solution with react-router-dom Link  */}
            {/* <CustomToolbar component={Link} to="/"></CustomToolbar> */}
            <CustomToolbar>
                <Logo src={LogoImg} alt="Logo" onClick={navigateBackToShell} />
            </CustomToolbar>

        </AppBar>
    )
}

export default Navbar