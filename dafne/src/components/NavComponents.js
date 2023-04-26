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
import { useNavigate } from 'react-router-dom';

// TODO: Add Active Color to List Item

const IconListItem = ({ icon, text, children }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
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

const ChildListItem = ({ text, path }) => {
    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate(path)
    };

    return (
        <ListItemButton onClick={handleNavigation}>
            <ListItemIcon />
            <ListItemText primary={text} />
        </ListItemButton>
    )
}
const NavComponents = () => {
    const CollapsableNavList = styled(List)(({ theme }) => ({
        width: 250,
        padding: theme.spacing(2),
        fontSize: 10
    }));

    return (
        <CollapsableNavList>
            <IconListItem icon={<SpeedOutlinedIcon />} text="Dashboard" children={
                <div>
                    <ChildListItem text="Processes" path='/dashboard/processes' />
                    <ChildListItem text="Processes" path="/dashboard/processes" />
                    <ChildListItem text="Data" path="/dashboard/data" />
                    <ChildListItem text="Models" path="/dashboard/models" />
                </div>
            } />
            <IconListItem icon={<DashboardOutlinedIcon />} text="Methods" children={
                <div>
                    <ChildListItem text="Reproduction" path="/reproduction" />
                    <ChildListItem text="Fusion" path="/fusion" />
                    <ChildListItem text="Rule Based" path="/rule-based" />
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