import React from 'react'
import { styled } from '@mui/material/styles';
import { ListItemButton, ListItemText, List, ListItemIcon } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const IconListItem = ({ icon, text }) => {
    return (
        <ListItemButton>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
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
            <IconListItem icon={<DashboardOutlinedIcon />} text="Methods" />
            <IconListItem icon={<LightbulbOutlinedIcon />} text="Use Case Explorer" />
            <IconListItem icon={<ExtensionOutlinedIcon />} text="Contribute" />
            <IconListItem icon={<ArticleOutlinedIcon />} text="Documentation" />
            <IconListItem icon={<PersonOutlineOutlinedIcon />} text="Account" />
        </CollapsableNavList>
    )
}

export default NavComponents