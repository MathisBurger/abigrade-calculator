import React, {Dispatch, SetStateAction, useState} from "react";
import {Step, StepButton, Stepper} from "@mui/material";


interface StepperProcessProps {
    activeStep: number;
    setActiveStep: Dispatch<SetStateAction<number>>;
    steps: string[];
}

const StepperProcess: React.FC<StepperProcessProps> = ({activeStep, setActiveStep, steps}) => {

    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const handleStep = (step: number) => () => setActiveStep(step);

    const isCompleted = (step: number) => completedSteps.indexOf(step) > -1;

    return (
        <Stepper activeStep={activeStep} nonLinear>
            {steps.map((label, index) => (
                <Step key={label} completed={isCompleted(index)}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                        {label}
                    </StepButton>
                </Step>
            ))}
        </Stepper>
    );
}

export default StepperProcess;
