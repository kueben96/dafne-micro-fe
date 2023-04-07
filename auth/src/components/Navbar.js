import { AppBar, useTheme, } from '@mui/material'
import React, { useState } from 'react'
import LogoImg from '../assets/images/logo.png'
import { CustomToolbar, Logo } from '../styles/authStyles'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const theme = useTheme()

    const [open, setOpen] = useState(false)
    return (
        <AppBar sx={{ backgroundColor: theme.palette.neutral.white }} position='relative'>
            {/* Solution with react-router-dom Link  */}
            {/* <CustomToolbar component={Link} to="/"></CustomToolbar> */}
            <CustomToolbar>
                <Logo src={LogoImg} alt="Logo" />
            </CustomToolbar>

        </AppBar>
    )
}

export default Navbar