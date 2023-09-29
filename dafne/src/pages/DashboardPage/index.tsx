// Import necessary modules and components
import React, { useState } from 'react';
import { Box } from "@mui/material";
import PageHeaderDashboard from "../../components/PageHeaderDashboard";
import JobsView from "./JobsView";
import DataView from './DataView';
import { useFetchAllJobsQuery, useFetchDatasetsQuery } from '../../redux/apiGatewaySlice';
import { useAppDispatch } from '../../redux/hooks';
import { selectJobsCount, selectUser } from '../../redux/features/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [tabValue, setTabValue] = useState<string>('jobs');
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };


  const { data: userJobs, isLoading, isError } = useFetchAllJobsQuery();
  const { data: datasets, isLoading: isLoadingDatasets, isError: isErrorDatasets } = useFetchDatasetsQuery();

  const user = useSelector(selectUser);
  const userJobsArray = userJobs ?? [];
  const datasetsObject = datasets ?? [];
  const jobsCount = useSelector(selectJobsCount);
  const datasetsCount = useSelector((state: RootState) => state?.user.datasetsCount);
  const modelsCount = useSelector((state: RootState) => state?.user.modelsCount);


  // Render the view based on the selected tab value
  const renderView = () => {
    switch (tabValue) {
      case 'jobs':
        return <JobsView userJobs={userJobsArray} />;
      case 'models':
        return <h1>models view</h1>;
      case 'data':
        return <DataView dataSets={datasetsObject} />
      default:
        return null;
    }
  };

  return (
    <>
      <PageHeaderDashboard title="Dashboard" path={tabValue} onChange={handleChange} user={user!} jobsCount={jobsCount} datasetsCount={datasetsCount} modelsCount={modelsCount} />
      <Box component="main">
        {renderView()}
      </Box>
    </>
  );
};

export default DashboardPage;
