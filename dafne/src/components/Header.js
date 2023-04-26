import { AppBar, Avatar, IconButton, ListItemText, Toolbar, useTheme, Badge, Box, Typography } from '@mui/material'
import React from 'react'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoImg from '../assets/images/logo.png'
import { styled } from '@mui/material/styles';

const Logo = styled('img')({
    height: '20px',
    cursor: 'pointer',
})


const UserContainer = styled('div')({
    display: 'flex',
    alignItems: 'center'
})



const AppBarHeader = ({ handleDrawerToggle }) => {

    const theme = useTheme()
    return (
        <AppBar sx={{ backgroundColor: theme.palette.neutral.white, zIndex: theme.zIndex.drawer + 1 }} position="relative">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton color="primary" onClick={handleDrawerToggle}>
                        <MenuOpenIcon />
                    </IconButton>
                    <Logo src={LogoImg} alt="Logo" />
                </Box>
                <UserContainer>
                    <IconButton color={theme.palette.grey.regular}>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton color={theme.palette.grey.regular}>
                        <HelpOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton color={theme.palette.grey.regular}>
                        <Badge badgeContent={1} color="secondary">
                            <NotificationsOutlinedIcon sx={{ color: theme.palette.grey.regular }}></NotificationsOutlinedIcon>
                        </Badge>
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => { console.log('User Info Clicked') }}  >
                        <IconButton>
                            <Avatar sx={{ width: 30, height: 30 }} alt="User" src="/avatar.jpg" />
                        </IconButton>
                        <Typography variant="body1" >Hanna Schmidt</Typography>
                    </Box>
                </UserContainer>
            </Toolbar>
        </AppBar>
    )
}

export default AppBarHeader