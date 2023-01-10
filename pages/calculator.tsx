import {NextPage} from "next";
import {Grid, Typography} from "@mui/material";
import {useState} from "react";
import StepperProcess, {StepperProcessStep} from "../components/calculator/StepperProcess";
import ProvinceSelect, {Province} from "../components/calculator/inputs/ProvinceSelect";

interface CalculationValues {
    province?: Province;
}

const Calculator: NextPage = () => {

    const [calculationValues, setCalculationValues] = useState<CalculationValues>({
        province: Province.SchleswigHolstein
    });

    const steps: StepperProcessStep[] = [
        {
            label: 'Bundesland auswählen',
            component: <ProvinceSelect
                province={calculationValues.province ?? Province.SchleswigHolstein}
                setProvince={(province) => setCalculationValues({...calculationValues, province})}
            />

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
