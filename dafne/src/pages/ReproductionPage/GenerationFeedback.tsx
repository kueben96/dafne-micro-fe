import { Box, CircularProgress, Theme, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LinearProgressEpochs from '../../components/LinearProgressEpochs';

import CheckIcon from '@mui/icons-material/Check';
import { SizedBoxVertical } from '../../assets/theme/dafneStyles';


// TODO: replace by IJobStatus
interface JobStatusResponse {
    lastMessage: string;
    run: number;
    runs: number;
    status: "running" | "completed";
    taskNum: number;
}

interface GenerationFeedbackProps {
    completed: boolean;
    setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

//completed, set completed! --> ist das ein delete call????

const GenerationFeedback: React.FC<GenerationFeedbackProps> = ({ completed, setCompleted }) => {
    const theme = useTheme();
    const [progress, setProgress] = useState(0);
    const reproductionEpochCount = 10;


    useEffect(() => {
        const simulateAPI = () => {
            // Simulate an API response
            const jobStatus: JobStatusResponse = {
                lastMessage: "Sample has been uploaded.",
                run: progress + 1,
                runs: reproductionEpochCount,
                status: progress + 1 === reproductionEpochCount ? "completed" : "running",
                taskNum: 5,
            };

            // Update progress based on the API response
            setProgress(jobStatus.run);

            // Check for completion
            if (jobStatus.run === jobStatus.runs && jobStatus.status === "completed") {

                setCompleted(true);
                window.dispatchEvent(new Event("generationCompleted"));
            }
        };

        // Simulate the API call every 5 seconds
        const apiInterval = setInterval(() => {
            if (!completed) {
                simulateAPI();
            }

            //TODO: set interval to 30 seconds when doing the real API call
        }, 50);

        return () => {
            // Cleanup: clear the interval when the component unmounts
            clearInterval(apiInterval);
        };
    }, [setCompleted, completed, progress]);

    return (
        <>
            <ProgressSection progress={progress} totalepochs={reproductionEpochCount} completed={completed} theme={theme} />
            <SizedBoxVertical />
        </>
    )
}

export default GenerationFeedback;


interface ProgressSectionProps {
    progress: number;
    totalepochs: number;
    completed: boolean;
    theme: Theme;
}
const ProgressSection: React.FC<ProgressSectionProps> = ({ progress, totalepochs, completed, theme }) => {


    return (
        <Box display="flex" flexDirection="column" >
            <Box display="flex" flexDirection="row" width="100%" justifyContent="center" padding={2}>
                {completed ?
                    <CheckIcon style={{ fontSize: 50, color: theme.palette?.primary?.dark }} />
                    : <CircularProgress sx={{ color: theme.palette?.primary?.dark }} />}
            </Box>
            <Box display="flex" flexDirection="row" width="100%" justifyContent="center" paddingBottom={2}>
                <Typography >{completed ? "Completed" : "Training your model..."}</Typography>
            </Box>
            <LinearProgressEpochs progress={progress} epochsCount={totalepochs} />
        </Box>
    )
}
