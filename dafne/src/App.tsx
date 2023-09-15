import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import Layout from './Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import ReproductionPage from './pages/ReproductionPage/index';
import DashboardPage from './pages/DashboardPage';
import { JWT_TOKEN_KEY } from './utils/constants';
import { useAppDispatch } from './redux/hooks';
import { setUser } from './redux/features/userSlice';

function App(): JSX.Element {

  const dispatch = useAppDispatch()

  const [theme, setTheme] =
    React.useState(null);

  useEffect(() => {
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

  useEffect(() => {
    // Fetch token from local storage
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    dispatch(setUser(token as string))
  }, [dispatch]);



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
