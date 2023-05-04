import { Stepper, Box, Step, StepLabel, StepContent, Typography, Button, Paper, useTheme, TextField } from '@mui/material';
import React from 'react'
import CustomStepIcon from '../../components/CustomStepIcon';
import { isStepCompleted, isStepSkipped } from '../../utils/stepperUtils';
import { DataSourceSelectionStep, StepSummaryField } from './steps';
import { SizedBoxVertical } from '../../styles/dafneStyles';




const GenerationSettingsForm = () => {


    const [selectedSource, setSelectedSource] = React.useState({
        variant: 'catalogue',
        file: "DemoData.csv"
    });
    const theme = useTheme()
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const [skipped, setSkipped] = React.useState(new Set());

    const steps = [
        {
            label: 'Select source dataset',
            content: () => {
                if (isStepCompleted(0, completed)) {
                    return <StepSummaryField label={selectedSource} />;
                } else {
                    return (
                        <DataSourceSelectionStep
                            setSelectedSource={setSelectedSource}
                        />
                    );
                }
            }
        },
        {
            label: 'Select metric',
            content: <div> Hi</div>,
            completedContent: <StepSummaryField label="selectedMetric" />
        },
        {
            label: 'Select model',
            content: <div> Hi</div>,
        },
        {
            label: 'Set parameters',
            content: <div> Hi</div>,
        },
    ];


    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep, skipped)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        const newCompleted = new Set(completed);
        if (!isStepCompleted(activeStep, completed)) {
            newCompleted.add(activeStep);
        } else {
            newCompleted.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCompleted(newCompleted);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ maxWidth: "70%" }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => {
                    const stepProps = {};

                    if (isStepSkipped(index, skipped)) {
                        stepProps.completed = false;
                    }
                    if (isStepCompleted(index, completed)) {
                        stepProps.completed = true;
                    }

                    return (
                        <Step key={step.label} >
                            <StepLabel
                                optional={
                                    index === 2 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                                StepIconComponent={props => (
                                    <CustomStepIcon {...stepProps} icon={index + 1} completed={stepProps.completed} active={activeStep === index} theme={theme}></CustomStepIcon>
                                )

                                }
                            >
                                {step.label}
                            </StepLabel>

                            <StepContent>
                                {step.content}
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    )
                })}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

export default GenerationSettingsForm