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
import { useTranslation } from "next-export-i18n";

export interface CalculationValues {
    /**
     * province
     */
    province?: Province;
    /**
     * All testimonies
     */
    testomonies?: Testimony[];
    /**
     * All exam subjects
     */
    examSubjects?: ExamSubjects;
    /**
     * All a level results
     */
    aLevelsResults: ALevelsResults;
}

/**
 * Calculator page
 *
 * @constructor
 */
const Calculator: NextPage = () => {

    const {t} = useTranslation();

    const [calculationValues, setCalculationValues] = useState<CalculationValues>({
        province: Province.SchleswigHolstein,
        testomonies: [],
        examSubjects: undefined,
        aLevelsResults: {
            pre: [],
            real: []
        }
    });
    const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);
    const [loadDialogOpen, setLoadDialogOpen] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState<number>(0);

    const steps: StepperProcessStep[] = [
        {
            label: t('tab.select-province'),
            component: <ProvinceSelect
                province={calculationValues.province ?? Province.SchleswigHolstein}
                setProvince={(province) => setCalculationValues({...calculationValues, province})}
            />,
            checkCanSubmit: () => calculationValues.province !== undefined

        },
        {
            label: t('tab.add-testimony'),
            component: <TestimonyTopLayer
                testimonies={calculationValues.testomonies ?? []}
                setTestimonies={(testomonies) => setCalculationValues({...calculationValues, testomonies})}
            />,
            checkCanSubmit: () => (calculationValues?.testomonies ?? []).length > 0,
        },
        {
            label: t('tab.select-exam-subjects'),
            component: <ExamSubjectSelection
                testimonies={calculationValues.testomonies ?? []}
                examSubjects={calculationValues.examSubjects}
                setExamSubjects={(examSubjects) => setCalculationValues({...calculationValues, examSubjects})}
            />,
            checkCanSubmit: () => ValidateExamSubjectsComplete(calculationValues.examSubjects ?? {}),
        },
        {
            label: t('tab.written-exams'),
            component: <ALevelsResultsDisplay
                aLevelResults={calculationValues.aLevelsResults}
                setALevelsResults={(aLevelsResults) => setCalculationValues({...calculationValues, aLevelsResults})}
                examSubjects={calculationValues.examSubjects}
            />,
            checkCanSubmit: () => calculationValues.aLevelsResults.pre.length > 0,
        },
        {
            label: t('tab.view-results'),
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
                        {t('main-header')}
                    </Typography>
                </Grid>
                <StepperProcess activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />
                <Grid item xs={5} container direction="row" justifyContent="center" spacing={2}>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" onClick={() => setSaveDialogOpen(true)}>
                            {t('action.save')}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" onClick={() => setLoadDialogOpen(true)}>
                            {t('action.load')}
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
