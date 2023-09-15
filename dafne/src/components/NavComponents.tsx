import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  ListItemButton,
  ListItemText,
  List,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { useAppDispatch } from '../redux/hooks';
import { logOut } from '../redux/userSlice';

const IconListItem = ({
  icon,
  text,
  children,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  children?: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setOpen(!open);
    }

  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{ color: isActive ? 'primary.main' : 'inherit' }}
      >
        <ListItemIcon
          sx={{ color: isActive ? 'primary.main' : 'inherit' }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
        {children && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      )}
    </>
  );
};

const ChildListItem = ({
  text,
  path,
  isActive,
}: {
  text: string;
  path: string;
  isActive: boolean;
}) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(path);
  };

  return (
    <ListItemButton
      onClick={handleNavigation}
      sx={{
        bgcolor: isActive ? 'primary.main' : 'transparent',
        opacity: isActive ? 0.7 : 1,
      }}
    >
      <ListItemIcon />
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

const NavComponents = () => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useAppDispatch();
  const CollapsableNavList = styled(List)(({ theme }) => ({
    width: 250,
    padding: theme.spacing(2),
    fontSize: 10,
  }));

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <CollapsableNavList>
      <IconListItem
        icon={<SpeedOutlinedIcon />}
        text="Dashboard"
        isActive={pathname.startsWith(ROUTES.DASHBOARD.PATH)}
        children={
          <div>
            <ChildListItem
              text="Processes"
              path={ROUTES.DASHBOARD.PROCESSES}
              isActive={pathname === ROUTES.DASHBOARD.PROCESSES}
            />
            <ChildListItem
              text="Data"
              path={ROUTES.DASHBOARD.DATA}
              isActive={pathname === ROUTES.DASHBOARD.DATA}
            />
            <ChildListItem
              text="Models"
              path={ROUTES.DASHBOARD.MODELS}
              isActive={pathname === ROUTES.DASHBOARD.MODELS}
            />
          </div>
        }
      />
      <IconListItem
        icon={<DashboardOutlinedIcon />}
        text="Methods"
        isActive={pathname.startsWith(ROUTES.METHODS.PATH)}
        children={
          <div>
            <ChildListItem
              text="Reproduction"
              path={ROUTES.METHODS.REPRODUCTION}
              isActive={pathname === ROUTES.METHODS.REPRODUCTION}
            />
            <ChildListItem
              text="Fusion"
              path={ROUTES.METHODS.FUSION}
              isActive={pathname === ROUTES.METHODS.FUSION}
            />
            <ChildListItem
              text="Rule Based"
              path={ROUTES.METHODS.RULE_BASED}
              isActive={pathname === ROUTES.METHODS.RULE_BASED}
            />
          </div>
        }
      />
      <IconListItem
        icon={<LightbulbOutlinedIcon />}
        text="Use Case Explorer"
        children={<div>
          <ChildListItem text="Neighborhood Generation" path={''} isActive={false} />
        </div>} isActive={false} />
      <IconListItem icon={<ExtensionOutlinedIcon />} text="Contribute" isActive={false} />
      <IconListItem icon={<ArticleOutlinedIcon />} text="Documentation" isActive={false} />
      <IconListItem icon={<PersonOutlineOutlinedIcon />} text="Account" isActive={false} />
      <IconListItem icon={<LogoutIcon />} text="Logout" isActive={false} onClick={handleLogout} />
    </CollapsableNavList>
  );
};

export default NavComponents;
