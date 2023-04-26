import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { ListItemButton, ListItemText, List, ListItemIcon, Collapse } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from 'react-router-dom';

// TODO: Add Active Color to List Item

const IconListItem = ({ icon, text, children, isActive }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>

            <ListItemButton onClick={handleClick} sx={{ color: isActive ? 'primary.main' : 'inherit' }}>
                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'inherit' }}>
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
    )
}

const ChildListItem = ({ text, path, isActive }) => {
    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate(path)
    };

    return (
        <ListItemButton onClick={handleNavigation} sx={{ bgcolor: isActive ? 'primary.main' : 'transparent', opacity: isActive ? 0.7 : 1 }}>
            <ListItemIcon />
            <ListItemText primary={text} />
        </ListItemButton>
    )
}
const NavComponents = () => {

    const location = useLocation();
    const { pathname } = location;

    const CollapsableNavList = styled(List)(({ theme }) => ({
        width: 250,
        padding: theme.spacing(2),
        fontSize: 10
    }));

    return (
        <CollapsableNavList>
            <IconListItem icon={<SpeedOutlinedIcon />} text="Dashboard" isActive={pathname.startsWith('/dashboard')} children={
                <div>
                    <ChildListItem text="Processes" path='/dashboard/processes' isActive={pathname === '/dashboard/processes'} />
                    <ChildListItem text="Data" path="/dashboard/data" />
                    <ChildListItem text="Models" path="/dashboard/models" />
                </div>
            } />
            <IconListItem icon={<DashboardOutlinedIcon />} text="Methods" isActive={pathname.startsWith('/methods')} children={
                <div>
                    <ChildListItem text="Reproduction" path="/methods/reproduction" isActive={pathname === '/methods/reproduction'} />
                    <ChildListItem text="Fusion" path="/methods/fusion" isActive={pathname === '/methods/fusion'} />
                    <ChildListItem text="Rule Based" path="/methods/rule-based" isActive={pathname === '/methods/rule-based'} />

                </div>
            } />
            <IconListItem icon={<LightbulbOutlinedIcon />} text="Use Case Explorer" children={
                <div>
                    <ChildListItem text="Neighborhood Generation" />
                </div>
            } />
            <IconListItem icon={<ExtensionOutlinedIcon />} text="Contribute" />
            <IconListItem icon={<ArticleOutlinedIcon />} text="Documentation" />
            <IconListItem icon={<PersonOutlineOutlinedIcon />} text="Account" />
        </CollapsableNavList>
    )
}

export default NavComponents