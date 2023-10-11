import { Box, useTheme } from '@mui/material';
import React from 'react';
import { JobState, mapStatusToReadable } from '../types/enums';


const ProcessStatus: React.FC<{ status: JobState }> = ({ status }) => {
  const theme = useTheme();
  let color = '';
  let label = '';
  switch (status) {
    case JobState.Completed:
      color = theme.palette.success?.main || '';
      label = mapStatusToReadable(JobState.Completed);
      break;
    case JobState.Running:
      color = theme.palette.primary?.main || '';
      label = mapStatusToReadable(JobState.Running)
      break;
    case JobState.Error:
      color = theme.palette.error?.main || '';
      label = mapStatusToReadable(JobState.Error);
      break;
    case JobState.Queued:
      color = theme.palette.gray?.light || '';
      label = mapStatusToReadable(JobState.Queued);
      break;
    default:
      color = 'default';
      label = status;
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
