// Import necessary modules and components
import React from 'react';
import { Box } from "@mui/material";
import PageHeaderDashboard from "../../components/PageHeaderDashboard";
import { selectJobsCount, selectUser } from '../../redux/features/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const DashboardPage = () => {

  const navigate = useNavigate();
  const location = useLocation()
  const locationAfterDashboardRoute = location.pathname.split('/dashboard/')[1]

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    navigate(newValue);
  };

  const user = useSelector(selectUser);

  const jobsCount = useSelector(selectJobsCount);
  const datasetsCount = useSelector((state: RootState) => state?.user?.datasetsCount);
  const modelsCount = useSelector((state: RootState) => state?.user?.modelsCount);



  return (
    <>
      <PageHeaderDashboard title="Dashboard" path={locationAfterDashboardRoute} onChange={handleChange} user={user!} jobsCount={jobsCount} datasetsCount={datasetsCount} modelsCount={modelsCount} />
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
};

export default DashboardPage;
