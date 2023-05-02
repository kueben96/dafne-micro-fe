import React from 'react'
import PageHeader from '../components/PageHeader'
import { ContentPaper } from '../styles/dafneStyles'
import { Box, Button, Container, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import CustomStepIcon from '../components/CustomStepIcon';
import HorizontalStepper from '../components/HorizontalStepper';


const steps = ['Set generation settings', 'Set row number', 'View results'];



const ReproductionPage = () => {

    const theme = useTheme()

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [completed, setCompleted] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const isStepCompleted = (step) => {
        return completed.has(step);
    };

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

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted(new Set())
    };


    return (
        <>
            <PageHeader title="MyReproductionProcess1" />
            <ContentPaper>
                <Container>
                    <Box sx={{ width: '100%' }}>
                        <Box display="flex" flexDirection="row" sx={{ width: '100%' }} justifyContent="center" >
                            <HorizontalStepper activeStep={activeStep} isStepCompleted={isStepCompleted} isStepOptional={isStepOptional} isStepSkipped={isStepSkipped} steps={steps} theme={theme} width="100%"></HorizontalStepper>
                        </Box>

                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {isStepOptional(activeStep) && (
                                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                            Skip
                                        </Button>
                                    )}

                                    <Button onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
                </Container>
            </ContentPaper>
        </>
    )
}

export default ReproductionPage