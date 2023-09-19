import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import Layout from './Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import ReproductionPage from './pages/ReproductionPage/index';
import DashboardPage from './pages/DashboardPage';
import { JWT_TOKEN_KEY, ROUTES } from './utils/constants';
import { useAppDispatch } from './redux/hooks';
import { setUser, setUserJobs } from './redux/features/userSlice';
import { useFetchAllJobsQuery } from './redux/apiGatewaySlice';

function App(): JSX.Element {

  const dispatch = useAppDispatch()



  const { data, error, isLoading } = useFetchAllJobsQuery();


  useEffect(() => {
    // Fetch token from local storage
    const token = localStorage.getItem(JWT_TOKEN_KEY);

    dispatch(setUser(token as string))

  }, [dispatch]);


  useEffect(() => {
    if (data) {
      dispatch(setUserJobs(data));
    }
  }, [data, dispatch]);






  return (
    <></>
  );
}

export default App;
