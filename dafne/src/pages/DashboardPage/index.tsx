// Import necessary modules and components
import React, { useState } from 'react';
import { Box } from "@mui/material";
import PageHeaderDashboard from "../../components/PageHeaderDashboard";
import JobsView from "./JobsView";
import DataView from './DataView';
import { useFetchAllJobsQuery } from '../../redux/apiGatewaySlice';
import { useAppDispatch } from '../../redux/hooks';
import { selectJobsCount, selectUser } from '../../redux/features/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const DashboardPage = () => {
  const [value, setValue] = useState<string>('jobs');
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };


  const { data: userJobs, isLoading, isError } = useFetchAllJobsQuery();

  const user = useSelector(selectUser);
  const userJobsArray = userJobs ?? [];
  const jobsCount = useSelector(selectJobsCount);
  const datasetsCount = useSelector((state: RootState) => state.user.datasetsCount);
  const modelsCount = useSelector((state: RootState) => state.user.modelsCount);


  // Render the view based on the selected tab value
  const renderView = () => {
    switch (value) {
      case 'jobs':
        return <JobsView userJobs={userJobsArray} />;
      case 'models':
        return <h1>models view</h1>;
      case 'data':
        return <DataView />
      default:
        return null;
    }
  };

  return (
    <>
      <PageHeaderDashboard title="Dashboard" value={value} onChange={handleChange} user={user!} jobsCount={jobsCount} datasetsCount={datasetsCount} modelsCount={modelsCount} />
      <Box component="main">
        {renderView()}
      </Box>
    </>
  );
};

export default DashboardPage;
