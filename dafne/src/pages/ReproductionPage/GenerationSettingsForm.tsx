import React, { useEffect, useState } from 'react';
import { Stepper, Box, Step, StepLabel, StepContent, Typography, Button, Paper, useTheme } from '@mui/material';
import CustomStepIcon from '../../components/CustomStepIcon';
import { isStepCompleted, isStepSkipped } from '../../utils/stepperUtils';
import { DataSourceSelectionStep, DropDownSelectionStep, ParameterSettingsStep, StepSummaryField } from './steps';
import { metricOptionsReproduction, modelOptionsReproduction } from '../../utils/constants';
import { ICreateServiceInstruction } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setInstruction } from '../../redux/features/jobsSlice';


const GenerationSettingsForm: React.FC = () => {

    const dispatch = useDispatch();
    const instruction = useSelector((state: RootState) => state.jobs.instruction);
    // TODO: implement setCompleted logic 
    // TODO: implement setSkipped logic
    // each step content component should get the set completed function after it is selected
    const [selectedSource, setSelectedSource] = useState<{ variant: string; file: File | null }>({
        variant: 'catalogue',
        file: null,
    });
    const [selectedMetric, setSelectedMetric] = useState<string[] | null>(null);
    const [selectedModel, setSelectedModel] = useState<string[] | null>(null);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set<number>());
    const [skipped, setSkipped] = useState(new Set<number>());

    // TODO: Lösung dafür, wenn weitere Metriken hinzugefügt werden können
    useEffect(() => {
        dispatch(setInstruction({
            ...instruction,
            // source: selectedSource, // Assuming 'source' is the property in the instruction for selectedSource
            metrics: [
                {
                    identifier: selectedMetric,
                    name: 'standard',
                    params: {}
                }
            ],
            model: {
                ...instruction.model,
                identifier: selectedModel,
            }
        }));
    }, [selectedSource, selectedMetric, selectedModel]);

    console.log("instruction")
    console.log(instruction)

    const steps = [
        {
            label: 'Select source dataset',
            content: (
                <DataSourceSelectionStep setSelectedSource={setSelectedSource} />
            ),
            completedContent: <StepSummaryField label={selectedSource.file?.name || ''} />
        },
        {
            label: 'Select metric',
            content: (
                <DropDownSelectionStep
                    setSelectedHook={setSelectedMetric}
                    selectionItems={metricOptionsReproduction}
                    multipleSelection={true}
                />
            ),
            completedContent: <StepSummaryField label={selectedMetric?.toString() ?? ''} />
        },
        {
            label: 'Select model',
            content: (
                <DropDownSelectionStep
                    setSelectedHook={setSelectedModel}
                    selectionItems={modelOptionsReproduction}
                />
            ),
            completedContent: <StepSummaryField label={selectedModel ? selectedModel[0] : ''} />
        },
        {
            label: 'Set parameters',
            content: <ParameterSettingsStep />
        }
    ];


    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ maxWidth: '70%' }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {};

                    if (isStepSkipped(index, skipped)) {
                        stepProps.completed = false;
                    }
                    if (isStepCompleted(index, completed)) {
                        stepProps.completed = true;
                    }

                    return (
                        <Step key={step.label}>
                            <StepLabel
                                sx={{ marginTop: theme.spacing(2) }}
                                StepIconComponent={() => (
                                    <CustomStepIcon
                                        {...stepProps}
                                        icon={index + 1}
                                        completed={stepProps.completed ?? false}
                                        active={activeStep === index}
                                        theme={theme}
                                    />
                                )}
                            >
                                {step.label}
                            </StepLabel>

                            <StepContent TransitionProps={{ in: true }}>
                                {isStepCompleted(index, completed) && activeStep !== index ? (
                                    step.completedContent
                                ) : (
                                    step.content
                                )}
                            </StepContent>
                        </Step>
                    );
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
};

export default GenerationSettingsForm;
