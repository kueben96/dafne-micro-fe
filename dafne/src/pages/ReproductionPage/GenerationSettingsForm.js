import { Stepper, Box, Step, StepLabel, StepContent, Typography, Button, Paper, useTheme } from '@mui/material';
import React from 'react'
import CustomStepIcon from '../../components/CustomStepIcon';
import StorageSharpIcon from '@mui/icons-material/StorageSharp';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

const CustomIcon = ({ icon, theme }) => {
    const IconComponent = icon;
    return <IconComponent sx={{ color: theme.palette.primary.dark }} />;
};
const DataSourceSelectionComponent = ({ variant, selected, onClick }) => {
    const theme = useTheme()

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const getIcon = () => {
        if (variant === 'catalogueSelection') {
            return <CustomIcon icon={StorageSharpIcon} theme={theme} />;
        } else if (variant === 'computerSelection') {
            return <CustomIcon icon={FileUploadRoundedIcon} theme={theme} />;
        } else {
            return null;
        }
    };

    const getTitle = () => {
        if (variant === 'catalogueSelection') {
            return 'Select source dataset';
        } else if (variant === 'computerSelection') {
            return 'Click or drag file to this area to upload';
        } else {
            return '';
        }
    };

    const getSubtitle = () => {
        if (variant === 'catalogueSelection') {
            return 'Selected: DemoData.csv';
        } else if (variant === 'computerSelection') {
            return 'Upload your own data set (.csv, .xlsx, .xls and json types are supported)';
        } else {
            return '';
        }
    };

    return (
        <Box
            sx={{
                borderRadius: 1,
                width: 400,
                margin: theme.spacing(0.5),
                padding: theme.spacing(4, 1),
                border: `1px solid ${theme.palette.primary.dark}`,
                backgroundColor: selected ? `${theme.palette.primary.main}20` : `${theme.palette.grey.lighter}40`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
            }}
            onClick={handleClick}
        >
            {getIcon()}
            <Typography>{getTitle()}</Typography>
            <Typography variant="subtitle1">{getSubtitle()}</Typography>
        </Box>
    );
};

const steps = [
    {
        label: 'Select source dataset',
        content: <Box display="flex" flexDirection="row" >
            <DataSourceSelectionComponent variant="catalogueSelection" selected={true} />
            <DataSourceSelectionComponent variant="computerSelection" />
        </Box>
    },
    {
        label: 'Create an ad group',
        content: <div> Hi</div>,
    },
    {
        label: 'Create an ad',
        content: <div> Hi</div>,
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
        <Box sx={{ maxWidth: "70%" }}>
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
                                {step.content}
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