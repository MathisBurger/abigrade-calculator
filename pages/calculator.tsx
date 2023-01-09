import {NextPage} from "next";
import {Grid, Typography} from "@mui/material";
import {useState} from "react";
import StepperProcess, {StepperProcessStep} from "../components/calculator/StepperProcess";
import ProvinceSelect from "../components/calculator/inputs/ProvinceSelect";


const Calculator: NextPage = () => {
    const steps: StepperProcessStep[] = [
        {
            label: 'Bundesland auswählen',
            component: <ProvinceSelect />

        },
        {
            label: 'Zeugnisse hinterlegen',
            component: <div />
        },
        {
            label: 'Prüfungsfächer auswählen',
            component: <div />
        },
        {
            label: 'Vorabi Ergebnisse angeben',
            component: <div />
        }
    ];

    const [activeStep, setActiveStep] = useState<number>(0);

    return (
        <Grid container direction="row" justifyContent="center" style={{width: '95vw'}}>
            <Grid item xs={12}>
                <Typography variant="h3" textAlign="center">
                    Abi-Noten Rechner
                </Typography>
            </Grid>
            <StepperProcess activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />
        </Grid>
    )
}

export default Calculator;
