import React from 'react'
import PageHeader from '../../components/PageHeader'
import { ContentPaper, SizedBoxVertical } from '../../assets/styles/dafneStyles'
import { Box, Button, Collapse, Container, IconButton, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';
import HorizontalStepper from '../../components/HorizontalStepper';
import GenerationSettingsForm from './GenerationSettingsForm';
import { isStepCompleted, } from '../../utils/stepperUtils';
import { RowNumberSelectionStep } from './steps';
import GenerationFeedback from './GenerationFeedback';
import { reproductionHorizontalSteps } from '../../utils/constants';
import styled from '@emotion/styled';

const ReproductionPage = () => {

    const horizontalSteps = reproductionHorizontalSteps

    const theme = useTheme()
    const [activeStep, setActiveStep] = React.useState(0);
    const [stepCompleted, setStepCompleted] = React.useState(new Set());
    const [rowNumber, setSelectedRowNumber] = React.useState(300)
    const [generationCompleted, setGenerationCompleted] = React.useState(false)
    const [showProcessSteps, setShowProcessSteps] = React.useState(true)

    const handleNext = () => {

        const newCompleted = new Set(stepCompleted);
        if (!isStepCompleted(activeStep, stepCompleted)) {
            newCompleted.add(activeStep);
        } else {
            newCompleted.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setStepCompleted(newCompleted);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleCancel = () => {
        setGenerationCompleted(false)
    };

    const isLastStep = (activeStep, steps) => activeStep === steps.length - 2

    const isGeneratingStep = (activeStep, steps) => activeStep === steps.length - 1

    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <GenerationSettingsForm />
            case 1:
                return <RowNumberSelectionStep defaultRowNumber={rowNumber} setSelectedRowNumber={setSelectedRowNumber} />
            case 2:
                return <GenerationFeedback completed={generationCompleted} setCompleted={setGenerationCompleted} />
            default:
                return <div>Not Found</div>;
        }
    }

    const _renderBackButton = () => {
        if (!isGeneratingStep(activeStep, horizontalSteps)) {
            return (
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
            )
        }

    };
    const _renderNextButton = () => {
        if (generationCompleted) {
            return (
                <Button variant="outlined" onClick={() => setShowProcessSteps(false)}>
                    Close
                </Button>
            );
        }

        if (activeStep === horizontalSteps.length - 1 && !generationCompleted) {
            return (
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            );
        }

        return (
            <Button variant="contained" onClick={handleNext}>
                {isLastStep(activeStep, horizontalSteps) ? 'Generate' : 'Next'}
            </Button>
        );
    };

    return (
        <>
            <PageHeader title="MyReproductionProcess1" />
            <Collapse in={showProcessSteps} timeout="auto" unmountOnExit>
                <ContentPaper>
                    <Container>
                        <Box sx={{ width: '100%' }}>
                            <Box display="flex" flexDirection="row" sx={{ width: '100%' }} justifyContent="center" >
                                <HorizontalStepper
                                    activeStep={activeStep}
                                    isStepCompleted={step => isStepCompleted(step, stepCompleted)}
                                    steps={horizontalSteps}
                                    theme={theme}
                                    width="75%"
                                />
                            </Box>
                            <Box>
                                {_renderStepContent(activeStep)}
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    {_renderBackButton()}
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {_renderNextButton()}
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </ContentPaper>
            </Collapse>
            <SizedBoxVertical />
            {generationCompleted &&
                (
                    <Container>
                        <CardContainer>
                            <MyCard title="Settings overview" flex={4} />
                            <MyCard title="Metric Score" flex={2} />
                            <MyCard title="Quality Report" flex={4} />
                        </CardContainer>
                    </Container>
                )
            }

        </>
    )
}

export default ReproductionPage

const CardContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
});

const Card = styled(Box)(({ theme }) => ({
    flex: 1,
    border: `1px solid ${theme.palette.gray.light}`,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    background: theme.palette.common.white,
}));

const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
    borderBottom: `1px solid ${theme.palette.gray.light}`,
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    padding: theme.spacing(1, 0)
}));

const ActionButtonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

const ActionButtonIcon = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1),
}));

const Divider = styled(Box)(({ theme }) => ({
    width: 1,
    height: '100%',
    backgroundColor: theme.palette.gray.light,
}));

const CardContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const MyCard = ({ title, actions, children, flex }) => {
    const theme = useTheme()
    return (
        <Card style={{ flex }}>
            <Header>
                <HeaderTitle>{title}</HeaderTitle>
                {actions && (
                    <ActionButtonContainer>
                        {actions.map((action, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <Divider />}
                                <ActionButtonIcon>{action.icon}</ActionButtonIcon>
                            </React.Fragment>
                        ))}
                    </ActionButtonContainer>
                )}
            </Header>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

const MyCardRow = () => {
    return (
        <CardContainer>
            <MyCard title="Settings overview" flex={4} />
            <MyCard title="Metric Score" flex={2} />
            <MyCard title="Quality Report" flex={4} />
        </CardContainer>
    );
};