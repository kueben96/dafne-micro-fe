import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { setDatasets, setUser, setUserJobs } from './redux/features/userSlice';
import { useFetchAllJobsQuery, useFetchDatasetsQuery } from './redux/apiGatewaySlice';
import { JWT_TOKEN_KEY } from './utils/constants';

const AppInitializer: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data: userJobs } = useFetchAllJobsQuery();
  const { data: datasets } = useFetchDatasetsQuery();


  useEffect(() => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);

    if (token) {
      dispatch(setUser(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userJobs) {
      dispatch(setUserJobs(userJobs));
    }
  }, [userJobs, dispatch]);
  useEffect(() => {
    if (datasets) {
      dispatch(setDatasets(datasets));
    }
  }, [datasets, dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
