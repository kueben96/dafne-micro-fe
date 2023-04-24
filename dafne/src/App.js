import React, { useRef, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';

import NavComponents from './components/NavComponents'
import { theme } from './styles/theme'
import { Container } from '@mui/material';
import AppBarHeader from './components/Header';
import { drawerStyles } from './styles/dafneStyles';
import DafneDrawer from './components/DafneDrawer';



// App component
function App() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarHeader handleDrawerToggle={handleNavToggle} />
            <DafneDrawer handleDrawerToggle={handleNavToggle} isNavOpen={isNavOpen} />
            <Container>
                <h1>DaFne App</h1>
            </Container>
        </ThemeProvider>
    );
}

export default App;
