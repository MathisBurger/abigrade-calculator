import {Testimony} from "./TestimonyTopLayer";
import React, {useMemo} from "react";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";

export interface TestimonyGradeRegisterProps {
    testimonies: Testimony[];
    testimonyIndex: number;
    setTestimonys: (testimonies: Testimony[]) => void;
}

const TestimonyGradeRegister: React.FC<TestimonyGradeRegisterProps> = ({testimonies, testimonyIndex, setTestimonys}) => {

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

    const updateGrade = (index: number, subject: string, grade: number) => {
        let testimony = testimonies[testimonyIndex];
        testimony.grades[index] = {subject, grade};
        updateTestimony(testimony);
    }

    const addGrade = () => {
        let testimony = testimonies[testimonyIndex];
        testimony.grades.push({subject: '', grade: 0});
        updateTestimony(testimony);
    }


    if (testimony === undefined) return null;

    return (
        <Grid item xs={9}>
            <Typography variant="h4">{testimony.name} ({testimony.semester})</Typography>
            {testimony.grades.map((grade, i) => (
                <Grid container direction="row" spacing={2} key={grade.subject} sx={{marginTop: '20px'}}>
                    <Grid item xs={6}>
                        <TextField
                            value={grade.subject}
                            type="text"
                            label="Subject"
                            onChange={(e) => updateGrade(i, `${e.target.value}`, grade.grade)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={grade.grade}
                            type="number"
                            label="Grade"
                            onChange={(e) => updateGrade(i, grade.subject, parseInt(`${e.target.value}`, 10))}
                        />
                    </Grid>
                </Grid>
            ))}
            <Button sx={{marginTop: '20px'}} variant="contained" color="primary" onClick={addGrade}>
                <Add /> &nbsp; Add
            </Button>
        </Grid>
    );
}

export default TestimonyGradeRegister;
