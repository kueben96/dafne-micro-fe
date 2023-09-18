import { Box, capitalize, useTheme } from '@mui/material';
import React from 'react';
import { JobStatus, mapStatusToReadable } from '../types/enums';

interface JobStatus {
  status: string;
}

const ProcessStatus: React.FC<JobStatus> = (props) => {
  const theme = useTheme();
  let color = '';
  let label = '';
  switch (props.status) {
    case JobStatus.Completed:
      color = theme.palette.success?.main || '';
      label = mapStatusToReadable(JobStatus.Completed);
      break;
    case JobStatus.Running:
      color = theme.palette.primary?.main || '';
      label = mapStatusToReadable(JobStatus.Running)
      break;
    case JobStatus.Error:
      color = theme.palette.error?.main || '';
      label = mapStatusToReadable(JobStatus.Error);
      break;
    case JobStatus.Queued:
      color = theme.palette.gray?.light || '';
      label = mapStatusToReadable(JobStatus.Queued);
      break;
    default:
      color = 'default';
      label = props.status;
      break;
  }
  return (
    <Box display="flex" alignItems="center">
      <Box
        sx={{
          borderRadius: '50%',
          backgroundColor: color,
          height: '7px',
          width: '7px',
          marginRight: '10px',
        }}
      ></Box>
      {label}
    </Box>
  );
};

export default ProcessStatus;
