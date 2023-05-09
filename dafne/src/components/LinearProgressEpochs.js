import { Box, styled } from '@mui/material';
import React from 'react'

const CustomLinearProgress = styled(Box)(({ theme, progress, activeEpoch }) => ({
    marginRight: theme.spacing(1),
    padding: theme.spacing(2, 0),
    backgroundColor: activeEpoch <= progress ? theme.palette.primary.dark : theme.palette.grey.lighter,
    display: 'inline-block',
    width: 'calc(100% / 15)',
    height: '20px',
    borderRadius: '2px',
}));

const LinearProgressEpochs = ({ progress }) => {
    const blocks = [];
    for (let i = 1; i <= 15; i++) {
        blocks.push(
            <CustomLinearProgress key={i} activeEpoch={i} progress={progress} />
        );
    }

    return <Box sx={{ display: 'flex' }}>{blocks}</Box>;
};

export default LinearProgressEpochs