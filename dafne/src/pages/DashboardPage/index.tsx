import React from 'react'
import { Box } from "@mui/material";
import PageHeaderDashboard from "../../components/PageHeaderDashboard";
import { useState } from "react";
import ProcessesView from "./ProcessView";
// TODO: switch tabs based on url after router decision made
// e.g. /dashboard/processes -> processes tab
// e.g. /dashboard/models -> models tab
// e.g. /dashboard/data -> data tab
// const match = useMatch('/dashboard/:tab');
// const tab = match?.params.tab;

const DashboardPage = () => {
  const [value, setValue] = useState<string>('processes');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  // Render the view based on the selected tab value
  const renderView = () => {
    switch (value) {
      case 'processes':
        return <ProcessesView />;
      case 'models':
        return <h1>models view</h1>;
      case 'data':
        return <h1>data view</h1>;
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