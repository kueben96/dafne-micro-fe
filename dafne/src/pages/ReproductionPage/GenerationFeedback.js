import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LinearProgressEpochs from '../../components/LinearProgressEpochs';
import { useTheme } from '@emotion/react';
import { reproductionEpochCount } from '../../utils/constants';

const GenerationFeedback = () => {

    const theme = useTheme()
    const [progress, setProgress] = React.useState(0);
    const [completed, setCompleted] = useState(false)

    const progressRef = React.useRef(() => { });
    useEffect(() => {
        progressRef.current = () => {
            for (let i = 0; i < reproductionEpochCount; i++) {
                setProgress(progress + 1)
                setCompleted(true)
            }
        };
    });
    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <Box display="flex" flexDirection="column" >
                <Box display="flex" flexDirection="row" width="100%" justifyContent="center" padding={2}>
                    <CircularProgress sx={{ color: theme.palette.primary.dark }} />
                </Box>
                <Box display="flex" flexDirection="row" width="100%" justifyContent="center" paddingBottom={2}>
                    <Typography >Learning your data...</Typography>
                </Box>
                <LinearProgressEpochs progress={progress} />
            </Box>
        </>
    )
}

export default GenerationFeedback

