import React, { useEffect, useState } from 'react';
import { Stepper, Box, Step, StepLabel, StepContent, Typography, Button, Paper, useTheme } from '@mui/material';
import CustomStepIcon from '../../components/CustomStepIcon';
import { isStepCompleted, isStepSkipped } from '../../utils/stepperUtils';
import { DataSourceSelectionStep, DropDownSelectionStep, ParameterSettingsStep, StepSummaryField } from './steps';
import { getMetricDisplayName } from '../../utils/constants';
import { IDatasetItem, IMetric, IMetricServiceInstruction, IModel, IModelInstruction, IPathInstruction, InstructionOptionDropdown } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectInitialPublicDataset, setInstruction } from '../../redux/features/jobsSlice';
import { useGetMetricsQuery, useGetModelsQuery } from '../../redux/apiGatewaySlice';
import { selectDatasets } from '../../redux/features/userSlice';


const GenerationSettingsForm: React.FC = () => {

    const dispatch = useDispatch();
    const instruction = useSelector((state: RootState) => state.jobs.instruction);
    // TODO: implement setCompleted logic 
    // TODO: implement setSkipped logic
    // each step content component should get the set completed function after it is selected


    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set<number>());
    const [skipped, setSkipped] = useState(new Set<number>());

    const dataSets = useSelector(selectDatasets) ?? [];
    const { data: metrics, isLoading: isLoadingMetrics, error: metricError } = useGetMetricsQuery();
    const { data: models, isLoading: isLoadingModels, error: modelsError } = useGetModelsQuery();

    const [selectedSource, setSelectedSource] = useState<{ variant: string; file: File | null }>({
        variant: 'catalogue',
        file: null,
    });


    const initialSelectedInputDatasetPath = useSelector(selectInitialPublicDataset)

    useEffect(() => {
        if (initialSelectedInputDatasetPath !== null && initialSelectedInputDatasetPath !== undefined) {
            setSelectedInputDatasetPath(initialSelectedInputDatasetPath);
        }
    }, [initialSelectedInputDatasetPath]);

    const [selectedInputDatasetPath, setSelectedInputDatasetPath] = useState<string | null>(null);
    const [selectedMetrics, setSelectedMetric] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');

    let metricSelectionItems: InstructionOptionDropdown[] = [];
    let modelSelectionItems: InstructionOptionDropdown[] = [];



    if (metrics) {
        metricSelectionItems = (metrics as IMetric[]).flatMap((metric: IMetric) => {
            return Object.keys(metric.endpoints).map((keyName) => ({
                value: keyName + ',' + metric.identifier,
                label: getMetricDisplayName(keyName, metric.identifier),
                identifier: metric.identifier,
                info: metric.description,
            }));
        });
    }

    if (models) {
        modelSelectionItems = (models as IModel[]).map((model: IModel) => {
            return {
                value: model.weightsPath ? model.identifier + "," + model.weightsPath : model.identifier,
                label: model.name,
                identifier: model.identifier,
                info: model.description,
            };
        });
    }

    if (selectedInputDatasetPath) {
        const selectedDataset = dataSets.find((dataset) => dataset.objectName === selectedInputDatasetPath);
        console.log("selectedDataset in generations setting form")
        console.log(selectedDataset)
    }

    const setPathInstruction = (selectedRowPath: string): IPathInstruction => {
        const selectedDataset: IDatasetItem | undefined = dataSets.find((dataset) => dataset.objectName === selectedRowPath);
        return {
            ...instruction.paths,
            download: {
                bucket: selectedDataset?.bucketName || '',
                path: selectedDataset?.objectName || ''
            }
        }
    }
    const setMetricInstructions = (selectedMetrics: string[]): IMetricServiceInstruction[] => {
        const metricInstructions: IMetricServiceInstruction[] = selectedMetrics.map((metric) => {
            const [endpoint, identifier] = metric.split(',');
            return {
                identifier: identifier,
                metric: endpoint,
                params: {}
            };
        });
        return metricInstructions;
    };
    const setModelInstructions = (selectedModel: string): IModelInstruction => {
        const [identifier, weightsPath] = selectedModel.split(',');
        const modelInstruction: IModelInstruction = {
            ...instruction.model,
            identifier: identifier,
            weightsPath: weightsPath,
        };
        return modelInstruction;
    }
    useEffect(() => {
        dispatch(setInstruction({
            ...instruction,
            metrics: setMetricInstructions(selectedMetrics),
            model: setModelInstructions(selectedModel),
            paths: setPathInstruction(selectedInputDatasetPath!),
        }));
    }, [selectedMetrics, selectedModel, selectedInputDatasetPath]);

    const steps = [
        {
            label: 'Select source dataset',
            content: (
                <DataSourceSelectionStep
                    setSelectedRowPath={setSelectedInputDatasetPath}
                    setSelectedSource={setSelectedSource}
                    selectedRowPath={selectedInputDatasetPath!} />
            ),
            completedContent: <StepSummaryField label={selectedSource.file?.name || ''} />
        },
        {
            label: 'Select metric',
            content: (
                <DropDownSelectionStep
                    setSelectedMultipleHook={setSelectedMetric}
                    selectionItems={metricSelectionItems!}
                    multipleSelection={true}
                />
            ),
            completedContent: <StepSummaryField label={selectedMetrics?.toString() ?? ''} />
        },
        {
            label: 'Select model',
            content: (
                <DropDownSelectionStep
                    setSelectedHook={setSelectedModel}
                    selectionItems={modelSelectionItems!}
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
