import React, { useState } from 'react';
import { Box, Button, Collapse, Container, useTheme } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import { ContentPaper, SizedBoxVertical } from '../../assets/theme/dafneStyles';
import HorizontalStepper from '../../components/HorizontalStepper';
import GenerationSettingsForm from './GenerationSettingsForm';
import { isStepCompleted } from '../../utils/stepperUtils';
import { RowNumberSelectionStep } from './steps';
import GenerationFeedback from './GenerationFeedback';
import { reproductionHorizontalSteps } from '../../utils/constants';
import ProcessDetail from './JobDetail';
import { useSelector } from 'react-redux';
import { setInstruction } from '../../redux/features/jobsSlice';
import { RootState } from '../../redux/store';
import { useCreateServiceWithInstructionMutation } from '../../redux/apiGatewaySlice';
import { ICreateServiceInstruction } from '../../types';




const ReproductionPage: React.FC = () => {

  const horizontalSteps = reproductionHorizontalSteps;
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [stepCompleted, setStepCompleted] = useState(new Set<number>());
  const [rowNumber, setSelectedRowNumber] = useState(300);
  const [generationCompleted, setGenerationCompleted] = useState(false);
  const [showProcessSteps, setShowProcessSteps] = useState(true);


  const generationInstruction: ICreateServiceInstruction = useSelector((state: RootState) => state.jobs.instruction);
  const instruction = useSelector((state: RootState) => state.jobs.instruction);
  const [createService, { isLoading, isError, isSuccess }] = useCreateServiceWithInstructionMutation();
  const handleCreateService = async () => {
    console.log('handleCreateService');
    console.log("instruction");
    console.log(instruction);

    try {
      const response = await createService(instruction); // Await the mutation call
      // Handle successful response here
      console.log('Service created:', response); // Access response data property
    } catch (error) {
      // Handle error here
      console.error('Error creating service:', error);
    }
  };
  const handleNext = () => {
    // TODO: handle generate button click
    // TODO: if button is last buttond or of type generate? 
    // 
    const newCompleted = new Set(stepCompleted);
    if (!isStepCompleted(activeStep, stepCompleted)) {
      newCompleted.add(activeStep);
    } else if (isLastStep(activeStep, horizontalSteps)) {
      console.log("createService")
      handleCreateService();
    }
    else {
      newCompleted.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStepCompleted(newCompleted);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    setGenerationCompleted(false);
  };

  const isLastStep = (activeStep: number, steps: string[]) => activeStep === steps.length - 2;

  const isGeneratingStep = (activeStep: number, steps: string[]) => activeStep === steps.length - 1;

  function renderStepContent(step: number) {
    switch (step) {
      case 0:
        return <GenerationSettingsForm />;
      case 1:
        return <RowNumberSelectionStep defaultRowNumber={rowNumber} setSelectedRowNumber={setSelectedRowNumber} />;
      case 2:
        return <GenerationFeedback completed={generationCompleted} setCompleted={setGenerationCompleted} />;
      default:
        return <div>Not Found</div>;
    }
  }

  const renderBackButton = () => {
    if (!isGeneratingStep(activeStep, horizontalSteps)) {
      return (
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
      );
    }
  };

  const renderNextButton = () => {
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

    if (isLastStep(activeStep, horizontalSteps)) {
      return (
        <Button variant="contained" onClick={handleCreateService}>
          Generate
        </Button>
      );
    }

    return (
      <Button variant="contained" onClick={handleNext}>
        Next
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
              <Box display="flex" flexDirection="row" sx={{ width: '100%' }} justifyContent="center">
                <HorizontalStepper
                  activeStep={activeStep}
                  isStepCompleted={(step) => isStepCompleted(step, stepCompleted)}
                  steps={horizontalSteps}
                  theme={theme}
                  width="75%"
                />
              </Box>
              <Box>
                {renderStepContent(activeStep)}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  {renderBackButton()}
                  <Box sx={{ flex: '1 1 auto' }} />
                  {renderNextButton()}
                </Box>
              </Box>
            </Box>
          </Container>
        </ContentPaper>
      </Collapse>
      <SizedBoxVertical />
      {generationCompleted && (
        <ProcessDetail />
      )}
    </>
  );
};

export default ReproductionPage;
