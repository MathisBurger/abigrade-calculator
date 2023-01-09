import React, {Dispatch, SetStateAction, useState} from "react";
import {Grid, Step, StepButton, Stepper} from "@mui/material";

export interface StepperProcessStep {
    label: string;
    component: JSX.Element;
}

interface StepperProcessProps {
    activeStep: number;
    setActiveStep: Dispatch<SetStateAction<number>>;
    steps: StepperProcessStep[];
}

const StepperProcess: React.FC<StepperProcessProps> = ({activeStep, setActiveStep, steps}) => {

    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const handleStep = (step: number) => () => setActiveStep(step);

    const isCompleted = (step: number) => completedSteps.indexOf(step) > -1;

    return (
        <>
            <Grid item xs={12}>
                <Stepper activeStep={activeStep} nonLinear>
                    {steps.map((step, index) => (
                        <Step key={step.label} completed={isCompleted(index)}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {step.label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
            <Grid item xs={12} container direction="row" justifyContent="center">
                {steps[activeStep]?.component ?? null}
            </Grid>
        </>
    );
}

export default StepperProcess;
