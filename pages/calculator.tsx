import {NextPage} from "next";
import {Grid, Typography} from "@mui/material";
import {useState} from "react";
import StepperProcess, {StepperProcessStep} from "../components/calculator/StepperProcess";
import ProvinceSelect, {Province} from "../components/calculator/inputs/ProvinceSelect";
import TestimonyTopLayer, {Testimony} from "../components/calculator/testimony/TestimonyTopLayer";
import ExamSubjectSelection, {ExamSubjects} from "../components/calculator/ExamSubjectSelection";
import ALevelsResultsDisplay, {ALevelsResults} from "../components/calculator/ALevelsResultsDisplay";

interface CalculationValues {
    province?: Province;
    testomonies?: Testimony[];
    examSubjects?: ExamSubjects;
    aLevelsResults: ALevelsResults;
}

const Calculator: NextPage = () => {

    const [calculationValues, setCalculationValues] = useState<CalculationValues>({
        province: Province.SchleswigHolstein,
        testomonies: [],
        aLevelsResults: {
            pre: [0, 0, 0],
            real: [0, 0, 0, 0]
        }
    });

    const steps: StepperProcessStep[] = [
        {
            label: 'Bundesland auswählen',
            component: <ProvinceSelect
                province={calculationValues.province ?? Province.SchleswigHolstein}
                setProvince={(province) => setCalculationValues({...calculationValues, province})}
            />,
            checkCanSubmit: () => calculationValues.province !== undefined

        },
        {
            label: 'Zeugnisse hinterlegen',
            component: <TestimonyTopLayer
                testimonies={calculationValues.testomonies ?? []}
                setTestimonies={(testomonies) => setCalculationValues({...calculationValues, testomonies})}
            />,
            checkCanSubmit: () => (calculationValues?.testomonies ?? []).length > 0,
        },
        {
            label: 'Prüfungsfächer auswählen',
            component: <ExamSubjectSelection
                testimonies={calculationValues.testomonies ?? []}
                examSubjects={calculationValues.examSubjects}
                setExamSubjects={(examSubjects) => setCalculationValues({...calculationValues, examSubjects})}
            />,
            checkCanSubmit: () => calculationValues.examSubjects !== undefined,
        },
        {
            label: 'Vorabi und Abi Ergebnisse hinterlegen',
            component: <ALevelsResultsDisplay
                aLevelResults={calculationValues.aLevelsResults}
                setALevelsResults={(aLevelsResults) => setCalculationValues({...calculationValues, aLevelsResults})}
                examSubjects={calculationValues.examSubjects}
            />,
            checkCanSubmit: () => calculationValues.aLevelsResults.pre[0] !== 0,
        },
        {
            label: 'Vorabi Ergebnisse angeben',
            component: <div />,
            checkCanSubmit: () => true,
        }
    ];

    const [activeStep, setActiveStep] = useState<number>(0);

    return (
        <Grid container direction="row" justifyContent="center" spacing={2}>
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
