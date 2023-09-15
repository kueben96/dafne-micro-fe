import React from 'react'
import { Box } from "@mui/material";
import PageHeaderDashboard from "../../components/PageHeaderDashboard";
import { useState } from "react";
import JobsView from "./JobsView";
import DataView from './DataView';
// TODO: switch tabs based on url after router decision made
// e.g. /dashboard/Jobs -> Jobs tab
// e.g. /dashboard/models -> models tab
// e.g. /dashboard/data -> data tab
// const match = useMatch('/dashboard/:tab');
// const tab = match?.params.tab;

const DashboardPage = () => {
  const [value, setValue] = useState<string>('jobs');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  // Render the view based on the selected tab value
  const renderView = () => {
    switch (value) {
      case 'jobs':
        return <JobsView />;
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