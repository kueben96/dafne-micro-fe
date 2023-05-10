import { Stepper, Step, StepLabel, Typography } from '@mui/material';
import React from 'react'
import CustomStepIcon from './CustomStepIcon';

const HorizontalStepper = ({
    activeStep,
    isStepCompleted,
    steps,
    theme,
    width,
}) => {
    return (
        <Stepper sx={{ width: width }} activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                if (isStepCompleted(index)) {
                    stepProps.completed = true;
                }

                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps} StepIconComponent={props => (
                            <CustomStepIcon {...stepProps} icon={index + 1} completed={stepProps.completed} active={activeStep === index} theme={theme}>
                                {index + 1}
                            </CustomStepIcon>
                        )}>
                            {label}
                        </StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    )
}

export default HorizontalStepper