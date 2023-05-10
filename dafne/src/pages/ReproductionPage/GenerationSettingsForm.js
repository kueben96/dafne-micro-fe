import { Stepper, Box, Step, StepLabel, StepContent, Typography, Button, Paper, useTheme, TextField, Fade } from '@mui/material';
import React from 'react'
import CustomStepIcon from '../../components/CustomStepIcon';
import { isStepCompleted, isStepSkipped } from '../../utils/stepperUtils';
import { DataSourceSelectionStep, DropDownSelectionStep, ParameterSettingsStep, StepSummaryField } from './steps';
import { metricOptionsReproduction, modelOptionsReproduction } from '../../utils/constants';

// TODO: go to step on click -> gesture detector! and mark completed
const GenerationSettingsForm = () => {


    // TODO: save all states in an reproduction settings object
    const [selectedSource, setSelectedSource] = React.useState({
        variant: 'catalogue',
        file: "DemoData.csv"
    });
    const [selectedMetric, setSelectedMetric] = React.useState(null)
    const [selectedModel, setSelectedModel] = React.useState(null)
    const theme = useTheme()
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const [skipped, setSkipped] = React.useState(new Set());



    const steps = [
        {
            label: 'Select source dataset',
            content:
                <DataSourceSelectionStep
                    setSelectedSource={setSelectedSource}
                />,
            completedContent: <StepSummaryField label={selectedSource.file} />
        },
        {
            label: 'Select metric',
            content: <DropDownSelectionStep setSelectedHook={setSelectedMetric} selectionItems={metricOptionsReproduction} />,
            completedContent: <StepSummaryField label="selectedMetric" />
        },
        {
            label: 'Select model',
            content: <DropDownSelectionStep setSelectedHook={setSelectedModel} selectionItems={modelOptionsReproduction} />,
            completedContent: <StepSummaryField label={selectedModel} />
        },
        {
            label: 'Set parameters',
            content: <ParameterSettingsStep />
        },
    ];


    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep, skipped)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        const newCompleted = new Set(completed);

        newCompleted.add(activeStep);

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
                        <Step key={step.label}  >
                            <StepLabel
                                sx={{ marginTop: theme.spacing(2) }}
                                StepIconComponent={props => (
                                    <CustomStepIcon {...stepProps} icon={index + 1} completed={stepProps.completed} active={activeStep === index} theme={theme}></CustomStepIcon>
                                )
                                }
                            >
                                {step.label}

                            </StepLabel>



                            <StepContent TransitionProps={{ in: true }} >
                                {isStepCompleted(index, completed) && activeStep !== index ? (step.completedContent) : step.content}
                                {/* {index === activeStep ? (
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
                                ) : null} */}

                            </StepContent>
                        </Step>
                    )
                })}
            </Stepper>
            {
                activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )
            }
        </Box >
    );
}

export default GenerationSettingsForm