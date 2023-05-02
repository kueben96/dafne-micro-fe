import { Stepper, Box, Step, StepLabel, StepContent, Typography, Button, Paper } from '@mui/material';
import React from 'react'
import CustomStepIcon from './CustomStepIcon';
import { useTheme } from '@emotion/react';

const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
];

const GenerationSettingsForm = () => {
    const theme = useTheme()
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const [skipped, setSkipped] = React.useState(new Set());

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        const newCompleted = new Set(completed);
        if (!isStepCompleted(activeStep)) {
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

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const isStepCompleted = (step) => {
        return completed.has(step);
    };



    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => {
                    const stepProps = {};

                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    if (isStepCompleted(index)) {
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
                                <Typography>{step.description}</Typography>
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