import React, { useRef, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';

import NavComponents from './components/NavComponents'
import { theme } from './styles/theme'
import Layout from './Layout';


// App component
function App() {

    return (
        <ThemeProvider theme={theme}>
            <Layout />
        </ThemeProvider>
    );
}

export default App;
