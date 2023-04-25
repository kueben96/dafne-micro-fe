import React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme'
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import ProcessesPage from './pages/ProcessesPage';


function App() {

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<ProcessesPage />} />
                </Route>
            </Routes>
            {/* <Layout /> */}
        </ThemeProvider>
    );
}

export default App;
