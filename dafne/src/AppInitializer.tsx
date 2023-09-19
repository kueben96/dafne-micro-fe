import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { setUser, setUserJobs } from './redux/features/userSlice';
import { useFetchAllJobsQuery } from './redux/apiGatewaySlice';
import { JWT_TOKEN_KEY } from './utils/constants';

const AppInitializer: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data } = useFetchAllJobsQuery();

  useEffect(() => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);

    if (token) {
      dispatch(setUser(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setUserJobs(data));
    }
  }, [data, dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
