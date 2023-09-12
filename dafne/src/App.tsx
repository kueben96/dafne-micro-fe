import React from 'react';
import { ThemeProvider } from '@mui/material';
import Layout from './Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import ReproductionPage from './pages/ReproductionPage/index';
import DashboardPage from './pages/DashboardPage';

function App(): JSX.Element {

  const [theme, setTheme] =
    React.useState(null);

  React.useEffect(() => {
    let isMounted = true; // This flag tracks whether the component is mounted

    import('theme/theme')
      .then((sharedTheme) => {
        if (isMounted) {
          // Only set the state if the component is still mounted
          setTheme(sharedTheme.default);
        }
      })
      .catch((error) =>
        console.error('Error loading shared theme', error)
      );

    // Return a cleanup function that sets isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);



  if (!theme) {
    return (
      <div>
        Loading theme...
      </div>
    );
  }


  return (
    <ThemeProvider theme={theme}>
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
