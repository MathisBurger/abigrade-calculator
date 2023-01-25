import React, {Dispatch, SetStateAction, useState} from "react";
import {Button, Grid, Step, StepButton, Stepper} from "@mui/material";
import {ArrowBack, ArrowCircleRight, ArrowLeft, ArrowRight} from "@mui/icons-material";
import { useIntl } from "react-intl";

export interface StepperProcessStep {
    label: string;
    component: JSX.Element|null;
    checkCanSubmit: () => boolean;
}

interface StepperProcessProps {
    activeStep: number;
    setActiveStep: Dispatch<SetStateAction<number>>;
    steps: StepperProcessStep[];
}

const StepperProcess: React.FC<StepperProcessProps> = ({activeStep, setActiveStep, steps}) => {

    const {formatMessage} = useIntl();
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const handleStep = (step: number) => () => setActiveStep(step);

    const handleNextClick = () => {
        if (activeStep+1 <= steps.length-1 && steps[activeStep].checkCanSubmit()) {
            setCompletedSteps([...completedSteps, activeStep]);
            setActiveStep(activeStep+1);
        }
    }

    const handleBackClick = () => {
        if (activeStep-1 >= 0) {
            setActiveStep(activeStep-1);
        }
    }

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
            <Grid item xs={8} container direction="row" justifyContent="center">
                {steps[activeStep]?.component ?? null}
            </Grid>
            <Grid item xs={8} container direction="row" justifyContent="space-between">
                <Grid item xs={3}>
                    <Button color="primary" variant="contained" onClick={handleBackClick}>
                        <ArrowLeft />&nbsp;
                        {formatMessage({id: 'action.back'})}
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button color="primary" variant="contained" onClick={handleNextClick}>
                        <ArrowRight />&nbsp;
                        {formatMessage({id: 'action.next'})}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default StepperProcess;
