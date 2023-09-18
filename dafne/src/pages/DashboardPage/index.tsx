// Import necessary modules and components
import React, { useState } from 'react';
import { Box } from "@mui/material";
import PageHeaderDashboard from "../../components/PageHeaderDashboard";
import JobsView from "./JobsView";
import DataView from './DataView';
import { useFetchAllJobsQuery } from '../../redux/apiGatewaySlice';
import { useAppDispatch } from '../../redux/hooks';
import { setUserJobs } from '../../redux/features/userSlice';

const DashboardPage = () => {
  const [value, setValue] = useState<string>('jobs');
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  // Fetch userJobs data
  const { data: userJobs, isLoading, isError } = useFetchAllJobsQuery();
  // Provide a default value (an empty array) when userJobs is undefined
  const userJobsArray = userJobs ?? [];
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
      <PageHeaderDashboard title="Dashboard" value={value} onChange={handleChange} />
      <Box component="main">
        {renderView()}
      </Box>
    </>
  );
};

export default DashboardPage;
