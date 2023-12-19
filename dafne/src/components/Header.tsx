import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoImg from '../assets/images/logo.png';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/userSlice';
import { useNotification } from '../useNotification';
import { RootState } from '../redux/store';

const Logo = styled('img')({
  height: '20px',
  cursor: 'pointer',
});

const UserContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const AppBarHeader: React.FC<{ handleDrawerToggle: () => void }> = ({ handleDrawerToggle }) => {
  const theme = useTheme();

  const user = useSelector(selectUser)
  const notificationsCount = useSelector((state: RootState) => state.notifications.notifications.length);
  const { displayNotification } = useNotification()

  return (
    <AppBar sx={{ backgroundColor: theme.palette?.common?.white, zIndex: theme.zIndex.drawer + 1 }} position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" onClick={handleDrawerToggle}>
            <MenuOpenIcon />
          </IconButton>
          <Logo src={LogoImg} alt="Logo" />
        </Box>
        <UserContainer>
          <IconButton sx={{ color: theme.palette?.gray?.main }}>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton sx={{ color: theme.palette?.gray?.main }}>
            <HelpOutlineOutlinedIcon />
          </IconButton>
          <IconButton sx={{ color: theme.palette?.gray?.main }}
            onClick={() =>
              displayNotification(
                {
                  type: "success",
                  header: "Your dataset is ready!",
                  message: "You can download it from your dashboard.",
                  timeout: 10000,
                }
              )}>
            <Badge badgeContent={notificationsCount} color="secondary">
              <NotificationsOutlinedIcon sx={{ color: theme.palette?.gray?.main }} />
            </Badge>
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => { console.log('User Info Clicked') }}>
            <IconButton>
              <Avatar sx={{ width: 30, height: 30 }} alt="User" />
            </IconButton>
            {user &&
              <Typography variant="body1">{user?.firstName + ' ' + user?.lastName}</Typography>
            }
          </Box>
        </UserContainer>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarHeader;
