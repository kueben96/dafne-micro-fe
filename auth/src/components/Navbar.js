import { AppBar, useTheme, } from '@mui/material'
import React from 'react'
import LogoImg from '../assets/images/logo.png'
import { CustomToolbar, Logo } from '../styles/authStyles'

const Navbar = () => {
    const theme = useTheme()
    const navigateBackToShell = () => {
        console.log('TODO: Implement navigateBackToShell homepage in marketing app')
    }
    return (
        <AppBar sx={{ backgroundColor: theme.palette.neutral.white }} position='relative'>
            {/* Solution with react-router-dom Link  */}
            {/* <CustomToolbar component={Link} to="/"></CustomToolbar> */}
            <CustomToolbar>
                <Logo src={LogoImg} alt="Logo" onClick={navigateBackToShell} />
            </CustomToolbar>

        </AppBar>
    )
}

export default Navbar