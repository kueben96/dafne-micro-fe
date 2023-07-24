import React from 'react';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './assets/theme/theme';
import Layout from './Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import ReproductionPage from './pages/ReproductionPage/index';
import DashboardPage from './pages/DashboardPage';
import { ROUTES } from './utils/constants';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={ROUTES.DASHBOARD.PROCESSES} />} />
          <Route path={ROUTES.DASHBOARD.PROCESSES} element={<DashboardPage />} />
          <Route path={ROUTES.METHODS.REPRODUCTION} element={<ReproductionPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
