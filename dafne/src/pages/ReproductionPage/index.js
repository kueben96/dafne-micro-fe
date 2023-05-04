import React from 'react'
import PageHeader from '../../components/PageHeader'
import { ContentPaper } from '../../styles/dafneStyles'
import { Box, Button, Container, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import HorizontalStepper from '../../components/HorizontalStepper';
import GenerationSettingsForm from './GenerationSettingsForm';
import { isStepCompleted, } from '../../utils/stepperUtils';
import { RowNumberSelectionStep } from './steps';


const steps = ['Set generation settings', 'Set row number', 'View results'];


const ReproductionPage = () => {

    const theme = useTheme()

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const [rowNumber, setSelectedRowNumber] = React.useState(300)

    const handleNext = () => {

        const newCompleted = new Set(completed);
        if (!isStepCompleted(activeStep, completed)) {
            newCompleted.add(activeStep);
        } else {
            newCompleted.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCompleted(newCompleted);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleSkip = () => {
    //     // if (!isStepOptional(activeStep)) {
    //     //     // You probably want to guard against something like this,
    //     //     // it should never occur unless someone's actively trying to break something.
    //     //     throw new Error("You can't skip a step that isn't optional.");
    //     // }

    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted(new Set())
    };

    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <GenerationSettingsForm />
            case 1:
                return <RowNumberSelectionStep defaultRowNumber={rowNumber} setSelectedRowNumber={setSelectedRowNumber} />
            case 2:
                return <div>Vert slider {step}</div>
            default:
                return <div>Not Found</div>;
        }
    }

    return (
        <>
            <PageHeader title="MyReproductionProcess1" />
            <ContentPaper>
                <Container>
                    <Box sx={{ width: '100%' }}>
                        <Box display="flex" flexDirection="row" sx={{ width: '100%' }} justifyContent="center" >
                            <HorizontalStepper
                                activeStep={activeStep}
                                isStepCompleted={step => isStepCompleted(step, completed)}
                                steps={steps}
                                theme={theme}
                                width="75%"
                            />
                        </Box>

                        {/* case if horizontal steps finished */}
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
                            <Box>
                                {_renderStepContent(activeStep)}

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
                                    {/* {isStepOptional(activeStep) && (
                                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                            Skip
                                        </Button>
                                    )} */}

                                    <Button variant='contained' onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Container>
            </ContentPaper>
        </>
    )
}

export default ReproductionPage