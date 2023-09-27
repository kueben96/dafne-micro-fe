import React, { useEffect, useState } from 'react';
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
import { RootState } from '../../redux/store';
import { useCreateServiceWithInstructionMutation, useGetJobStatusByIdQuery } from '../../redux/apiGatewaySlice';
import { IJobStatus } from '../../types';


const ReproductionPage: React.FC = () => {

  const horizontalSteps = reproductionHorizontalSteps;
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [stepCompleted, setStepCompleted] = useState(new Set<number>());
  const [rowNumber, setSelectedRowNumber] = useState(300);
  const [stepsCompleted, setStepsCompleted] = useState(false);
  const [showProcessSteps, setShowProcessSteps] = useState(true);

  const generationInstruction = useSelector((state: RootState) => state.jobs.instruction);
  const [createService, { isLoading, isError, isSuccess }] = useCreateServiceWithInstructionMutation();

  const isLastStep = (activeStep: number, steps: string[]) => activeStep === steps.length - 2;

  const isGeneratingStep = (activeStep: number, steps: string[]) => activeStep === steps.length - 1;

  const [jobStatus, setJobStatus] = useState<IJobStatus | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleCreateService = async () => {
    try {
      handleNext();
      const response = await createService(generationInstruction); // Await the mutation call
      //TODO: Type the service created Response
      console.log('Service created:', response); // Access response data property

      const id = response.data[0].content.jobId
      console.log('Job ID:', id);
      setJobId(id);
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleNext = () => {
    const newCompleted = new Set(stepCompleted);
    if (!isStepCompleted(activeStep, stepCompleted)) {
      newCompleted.add(activeStep);
    } else if (isLastStep(activeStep, horizontalSteps)) {
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
    setStepsCompleted(false);
  };



  function renderStepContent(step: number) {
    switch (step) {
      case 0:
        return <GenerationSettingsForm />;
      case 1:
        return <RowNumberSelectionStep defaultRowNumber={rowNumber} setSelectedRowNumber={setSelectedRowNumber} />;
      case 2:
        return <GenerationFeedback completed={stepsCompleted} setCompleted={setStepsCompleted} />;
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
    if (stepsCompleted) {
      return (
        <Button variant="outlined" onClick={() => setShowProcessSteps(false)}>
          Close
        </Button>
      );
    }

    if (activeStep === horizontalSteps.length - 1 && !stepsCompleted) {
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
      <PageHeader editable={true} title="Create New Reproduction Job" subtitle='Follow the steps to generate a synthetic dataset from an already existing dataset' />
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
      {stepsCompleted && jobId !== null && (
        <ProcessDetail jobId={jobId} />
      )}
    </>
  );
};
export default ReproductionPage;
