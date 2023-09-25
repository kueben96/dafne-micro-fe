import { Box, Typography, styled, useTheme, Theme } from '@mui/material';
import React from 'react';

interface CustomLinearProgressProps {
  progress: number;
  totalepochs: number;
  current: number;
  theme: Theme;
}

const CustomLinearProgress = styled(Box)<CustomLinearProgressProps>(({ theme, progress, current, totalepochs }) => ({
  marginRight: theme.spacing(0.5),
  padding: theme.spacing(2, 0),
  backgroundColor: current <= progress ? theme.palette?.primary?.dark : theme.palette?.gray?.lighter,
  display: 'inline-block',
  width: `calc(100% / ${totalepochs})`,
  height: '18px',
  borderRadius: '1px',
}));

interface LinearProgressEpochsProps {
  progress: number;
  label?: boolean;
  epochsCount: number;
}

const LinearProgressEpochs: React.FC<LinearProgressEpochsProps> = ({ progress, label = true, epochsCount }) => {

  const theme = useTheme();
  const blocks = [];

  for (let i = 1; i <= epochsCount; i++) {
    blocks.push(<CustomLinearProgress key={i} current={i} progress={progress} theme={theme} totalepochs={epochsCount} />);
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box sx={{ display: 'flex' }}>{blocks}</Box>
      {label && (
        <Typography sx={{ padding: 1 }} variant="subtitle1" alignSelf="center">{`${progress}/${epochsCount} epochs completed`}</Typography>
      )}
    </Box>
  );
};

export default LinearProgressEpochs;
