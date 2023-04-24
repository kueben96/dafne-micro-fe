import React from 'react'
import { styled } from '@mui/material/styles';
import { ListItemButton, ListItemText, List } from '@mui/material';

const NavComponents = () => {
    const CollapsableNavList = styled(List)(({ theme }) => ({
        width: 250,
        padding: theme.spacing(2),
    }));

    return (
        <CollapsableNavList>
            <ListItemButton>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton>
                <ListItemText primary="Methods" />
            </ListItemButton>
            <ListItemButton >
                <ListItemText primary="Use Case Explorer" />
            </ListItemButton>
            <ListItemButton >
                <ListItemText primary="Contribute" />
            </ListItemButton>
            <ListItemButton >
                <ListItemText primary="Documentation" />
            </ListItemButton>
            <ListItemButton >
                <ListItemText primary="Account" />
            </ListItemButton>
        </CollapsableNavList>
    )
}

export default NavComponents