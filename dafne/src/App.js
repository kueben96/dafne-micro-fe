import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import { theme } from './styles/theme'
import { Container, ListItemButton } from '@mui/material';
import Header from './components/Header';


const CollapsableNavList = styled(List)(({ theme }) => ({
    width: 250,
    padding: theme.spacing(2),
}));

// App component
function App() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header handleDrawerToggle={handleNavToggle} />
            <Drawer anchor="left" open={isNavOpen} onClose={handleNavToggle}>
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
            </Drawer>
            <Container>
                <h1>DaFne App</h1>
            </Container>
        </ThemeProvider>
    );
}

export default App;
