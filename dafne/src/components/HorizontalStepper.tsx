import { Stepper, Step, StepLabel, Theme, StepProps, StepLabelProps } from '@mui/material';
import React from 'react';
import CustomStepIcon from './CustomStepIcon';

interface HorizontalStepperProps {
  activeStep: number;
  isStepCompleted: (step: number) => boolean;
  steps: string[];
  theme: Theme;
  width: string;
}

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({
  activeStep,
  isStepCompleted,
  steps,
  theme,
  width,
}) => {
  return (
    <Stepper sx={{ width: width }} activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps: StepProps = {};
        const labelProps: StepLabelProps = {};

        if (isStepCompleted(index)) {
          stepProps.completed = true;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel
              {...labelProps}
              StepIconComponent={() => (
                <CustomStepIcon
                  {...stepProps}
                  icon={index + 1}
                  completed={stepProps.completed || false}
                  active={activeStep === index}
                  theme={theme}
                >
                  {index + 1}
                </CustomStepIcon>
              )}
            >
              {label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default HorizontalStepper;
