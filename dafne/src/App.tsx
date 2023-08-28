import React from 'react';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './assets/theme/theme';
import Layout from './Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import ReproductionPage from './pages/ReproductionPage/index';
import DashboardPage from './pages/DashboardPage';

function App(): JSX.Element {
  // const theme = importTheme();
  // console.log(theme)
  return (
    <ThemeProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard/processes" />} />
          <Route path="/dashboard/processes" element={<DashboardPage />} />
          <Route path="/methods/reproduction" element={<ReproductionPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
