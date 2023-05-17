import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LinearProgressEpochs from '../../components/LinearProgressEpochs';
import { useTheme } from '@emotion/react';
import { reproductionEpochCount } from '../../utils/constants';
import CheckIcon from '@mui/icons-material/Check';
import { ContentPaper, SizedBoxVertical } from '../../assets/theme/dafneStyles';

const GenerationFeedback = ({ completed, setCompleted }) => {
    const theme = useTheme()
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        let epoch = 0;
        const simulateEpoch = () => {
            epoch += 1;
            setProgress(epoch);
            setCompleted(epoch === reproductionEpochCount);
            setTimeout(() => {
                if (epoch === reproductionEpochCount) {
                    return;
                }
                simulateEpoch();
            }, 100);
        };
        // start the simulation
        simulateEpoch();
    }, [setCompleted]);

    return (
        <>
            <ProgressSection progress={progress} completed={completed} theme={theme} />
            <SizedBoxVertical />
        </>
    )
}

export default GenerationFeedback

const ProgressSection = ({ progress, completed, theme }) => {
    return (
        <Box display="flex" flexDirection="column" >
            <Box display="flex" flexDirection="row" width="100%" justifyContent="center" padding={2}>
                {completed ? <CheckIcon style={{ fontSize: 50, color: theme.palette.primary.dark }} /> : <CircularProgress sx={{ color: theme.palette.primary.dark }} />}
            </Box>
            <Box display="flex" flexDirection="row" width="100%" justifyContent="center" paddingBottom={2}>
                <Typography >{completed ? "Completed" : "Learning your data..."}</Typography>
            </Box>
            <LinearProgressEpochs progress={progress} />
        </Box>
    )
}
