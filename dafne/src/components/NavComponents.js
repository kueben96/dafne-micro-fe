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

// TODO: Add Active Color to List Item
// TODO: Add Sub Menus
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
const NavComponents = () => {
    const CollapsableNavList = styled(List)(({ theme }) => ({
        width: 250,
        padding: theme.spacing(2),
    }));

    return (
        <CollapsableNavList>
            <IconListItem icon={<SpeedOutlinedIcon />} text="Dashboard" />
            <IconListItem icon={<DashboardOutlinedIcon />} text="Methods" children={
                <div>
                    <ListItemButton>
                        <ListItemText primary="Child 1" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Child 2" />
                    </ListItemButton>
                </div>
            } />
            <IconListItem icon={<LightbulbOutlinedIcon />} text="Use Case Explorer" />
            <IconListItem icon={<ExtensionOutlinedIcon />} text="Contribute" />
            <IconListItem icon={<ArticleOutlinedIcon />} text="Documentation" />
            <IconListItem icon={<PersonOutlineOutlinedIcon />} text="Account" children={
                <div>
                    <ListItemButton>
                        <ListItemText primary="Child 1" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Child 2" />
                    </ListItemButton>
                </div>
            } />
        </CollapsableNavList>
    )
}

export default NavComponents