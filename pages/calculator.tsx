import {NextPage} from "next";
import {Grid, Typography} from "@mui/material";
import {useState} from "react";
import StepperProcess from "../components/calculator/StepperProcess";


const Calculator: NextPage = () => {
    const steps = ['Bundesland auswählen', 'Zeugnisse hinterlegen', 'Prüfungsfächer auswählen', 'Vorabi Ergebnisse angeben'];

    const [activeStep, setActiveStep] = useState<number>(0);

    return (
        <Grid container direction="row" justifyContent="center" style={{width: '95vw'}}>
            <Grid item xs={12}>
                <Typography variant="h3" textAlign="center">
                    Abi-Noten Rechner
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <StepperProcess activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />
            </Grid>
        </Grid>
    )
}

export default Calculator;
