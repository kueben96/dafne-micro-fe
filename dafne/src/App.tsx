import React from 'react';
import { ThemeProvider } from '@mui/material';
import { customTheme }  from './styles/theme';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import ProcessesPage from './pages/ProcessesPage';
import ReproductionPage from './pages/ReproductionPage/index';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProcessesPage />} />
          <Route path="/dashboard/processes" element={<ProcessesPage />} />
          <Route path="/methods/reproduction" element={<ReproductionPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
