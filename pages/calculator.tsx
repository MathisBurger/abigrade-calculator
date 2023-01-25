import {NextPage} from "next";
import {Button, Grid, Typography} from "@mui/material";
import {useState} from "react";
import StepperProcess, {StepperProcessStep} from "../components/calculator/StepperProcess";
import ProvinceSelect, {Province} from "../components/calculator/inputs/ProvinceSelect";
import TestimonyTopLayer, {Testimony} from "../components/calculator/testimony/TestimonyTopLayer";
import ExamSubjectSelection, {ExamSubjects} from "../components/calculator/ExamSubjectSelection";
import ALevelsResultsDisplay, {ALevelsResults} from "../components/calculator/ALevelsResultsDisplay";
import SaveDialog from "../components/calculator/storage/SaveDialog";
import LoadDialog from "../components/calculator/storage/LoadDialog";
import FinalResultDisplay from "../components/calculator/FinalResultDisplay";
import {ValidateExamSubjectsComplete} from "../utils/examSubject";
import { useIntl } from "react-intl";

export interface CalculationValues {
    province?: Province;
    testomonies?: Testimony[];
    examSubjects?: ExamSubjects;
    aLevelsResults: ALevelsResults;
}

const Calculator: NextPage = () => {

    const {formatMessage} = useIntl();

    const [calculationValues, setCalculationValues] = useState<CalculationValues>({
        province: Province.SchleswigHolstein,
        testomonies: [],
        examSubjects: undefined,
        aLevelsResults: {
            pre: [0, 0, 0],
            real: [0, 0, 0, 0]
        }
    });
    const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);
    const [loadDialogOpen, setLoadDialogOpen] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState<number>(0);

    const steps: StepperProcessStep[] = [
        {
            label: formatMessage({id: 'tab.select-province'}),
            component: <ProvinceSelect
                province={calculationValues.province ?? Province.SchleswigHolstein}
                setProvince={(province) => setCalculationValues({...calculationValues, province})}
            />,
            checkCanSubmit: () => calculationValues.province !== undefined

        },
        {
            label: formatMessage({id: 'tab.add-testimony'}),
            component: <TestimonyTopLayer
                testimonies={calculationValues.testomonies ?? []}
                setTestimonies={(testomonies) => setCalculationValues({...calculationValues, testomonies})}
            />,
            checkCanSubmit: () => (calculationValues?.testomonies ?? []).length > 0,
        },
        {
            label: formatMessage({id: 'tab.select-exam-subjects'}),
            component: <ExamSubjectSelection
                testimonies={calculationValues.testomonies ?? []}
                examSubjects={calculationValues.examSubjects}
                setExamSubjects={(examSubjects) => setCalculationValues({...calculationValues, examSubjects})}
            />,
            checkCanSubmit: () => ValidateExamSubjectsComplete(calculationValues.examSubjects ?? {}),
        },
        {
            label: formatMessage({id: 'tab.written-exams'}),
            component: <ALevelsResultsDisplay
                aLevelResults={calculationValues.aLevelsResults}
                setALevelsResults={(aLevelsResults) => setCalculationValues({...calculationValues, aLevelsResults})}
                examSubjects={calculationValues.examSubjects}
            />,
            checkCanSubmit: () => calculationValues.aLevelsResults.pre[0] !== 0,
        },
        {
            label: formatMessage({id: 'tab.view-results'}),
            component: activeStep === 4 ? (
                <FinalResultDisplay values={calculationValues} />
                ) : null,
            checkCanSubmit: () => true,
        }
    ];

    return (
        <>
            <Grid container direction="row" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3" textAlign="center">
                        {formatMessage({id: 'main-header'})}
                    </Typography>
                </Grid>
                <StepperProcess activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />
                <Grid item xs={5} container direction="row" justifyContent="center" spacing={2}>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" onClick={() => setSaveDialogOpen(true)}>
                            {formatMessage({id: 'action.save'})}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" onClick={() => setLoadDialogOpen(true)}>
                            {formatMessage({id: 'action.load'})}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            {saveDialogOpen && (
                <SaveDialog
                    data={calculationValues}
                    open={saveDialogOpen}
                    onClose={() => setSaveDialogOpen(false)}
                />
            )}
            {loadDialogOpen && (
                <LoadDialog
                    setPreset={(preset) => setCalculationValues(preset)}
                    open={loadDialogOpen}
                    onClose={() => setLoadDialogOpen(false)}
                />
            )}
        </>
    )
}

export default Calculator;
