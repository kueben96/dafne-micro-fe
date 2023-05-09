import { Box, CircularProgress, LinearProgress } from '@mui/material'
import React, { useEffect } from 'react'

const GenerationFeedback = () => {
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);
    const progressRef = React.useRef(() => { });
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
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
        <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row" width="100%" justifyContent="center">
                <CircularProgress color="primary" />
            </Box>
            <LinearProgress variant="determinate" value={progress} valueBuffer={buffer} />
        </Box>
    )
}

export default GenerationFeedback