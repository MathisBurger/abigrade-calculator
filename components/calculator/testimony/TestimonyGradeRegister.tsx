import {Testimony} from "./TestimonyTopLayer";
import React, {useMemo} from "react";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import SubjectSelect from "../inputs/SubjectSelect";
import {GetAllSubjects, Subject} from "../../../utils/subject";
import { useTranslation } from "next-export-i18n";

export interface TestimonyGradeRegisterProps {
    /**
     * All testimonies
     */
    testimonies: Testimony[];
    /**
     * The current testimony index
     */
    testimonyIndex: number;
    /**
     * Sets all testimonies
     *
     * @param testimonies The testimonies
     */
    setTestimonys: (testimonies: Testimony[]) => void;
}

/**
 * Detailed view for adding new grades to a testimony
 *
 * @constructor
 */
const TestimonyGradeRegister: React.FC<TestimonyGradeRegisterProps> = ({testimonies, testimonyIndex, setTestimonys}) => {

    const {t} = useTranslation();
    const testimony = useMemo<Testimony|undefined>(
        () => {
            if (testimonyIndex > -1 && testimonies.length > 0) {
                return testimonies[testimonyIndex];
            }
            return undefined;
        },
        [testimonyIndex, testimonies]
    );

    const updateTestimony = (testimony: Testimony) => {
        let all = [...testimonies];
        all[testimonyIndex] = testimony;
        setTestimonys(all);
    }

    const updateGrade = (index: number, subject: Subject|null, grade: number) => {
        let testimony = testimonies[testimonyIndex];
        testimony.grades[index] = {subject, grade};
        updateTestimony(testimony);
    }

    const addGrade = () => {
        let testimony = testimonies[testimonyIndex];
        testimony.grades.push({subject: GetAllSubjects()[0], grade: 0});
        updateTestimony(testimony);
    }


    if (testimony === undefined) return null;

    return (
        <Grid item xs={9}>
            <Typography variant="h4">{testimony.name} ({testimony.semester})</Typography>
            {testimony.grades.map((grade, i) => (
                <Grid container direction="row" spacing={2} key={`key-${i}`} sx={{marginTop: '20px'}}>
                    <Grid item xs={6}>
                        <SubjectSelect
                            subject={grade.subject}
                            setSubject={(s) => updateGrade(i, s, grade.grade)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={grade.grade}
                            type="number"
                            label={t('common.grade')}
                            onChange={(e) => updateGrade(i, grade.subject, parseInt(`${e.target.value}`, 10))}
                        />
                    </Grid>
                </Grid>
            ))}
            <Button sx={{marginTop: '20px'}} variant="contained" color="primary" onClick={addGrade}>
                <Add /> &nbsp; {t('action.create')}
            </Button>
        </Grid>
    );
}

export default TestimonyGradeRegister;
