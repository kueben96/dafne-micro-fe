import React from 'react'
import PageHeader from '../../components/PageHeader'
import { ContentPaper, SizedBoxVertical } from '../../styles/dafneStyles'
import { Box, Button, Container, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import HorizontalStepper from '../../components/HorizontalStepper';
import GenerationSettingsForm from './GenerationSettingsForm';
import { isStepCompleted, } from '../../utils/stepperUtils';
import { RowNumberSelectionStep } from './steps';
import GenerationFeedback from './GenerationFeedback';
import { reproductionHorizontalSteps } from '../../utils/constants';

const ReproductionPage = () => {

    const horizontalSteps = reproductionHorizontalSteps

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

    const handleReset = () => {
        setActiveStep(0);
        setCompleted(new Set())
    };

    const isLastStep = (activeStep, steps) => {
        return activeStep === steps.length - 2
    }

    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <GenerationSettingsForm />
            case 1:
                return <RowNumberSelectionStep defaultRowNumber={rowNumber} setSelectedRowNumber={setSelectedRowNumber} />
            case 2:
                return <GenerationFeedback />
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
                                steps={horizontalSteps}
                                theme={theme}
                                width="75%"
                            />
                        </Box>

                        {/* case if horizontal steps finished */}
                        {/* {activeStep === horizontalSteps.length ? ( */}

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
                                {activeStep === horizontalSteps.length - 1 ? (
                                    <Button variant='outlined' color="secondary" onClick={handleReset}>
                                        Cancel
                                    </Button>)
                                    : (<Button variant='contained' onClick={handleNext}>
                                        {isLastStep(activeStep, horizontalSteps) ? 'Generate' : 'Next'}
                                    </Button>)}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </ContentPaper>
            <SizedBoxVertical />
            <ContentPaper>
                <Box>Results here</Box>
            </ContentPaper>
        </>
    )
}

export default ReproductionPage