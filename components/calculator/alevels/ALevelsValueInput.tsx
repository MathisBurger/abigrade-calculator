import React, {useMemo} from "react";
import {ExamSubjects} from "../ExamSubjectSelection";
import {Grid, TextField, Typography} from "@mui/material";
import {Subject} from "../../../utils/subject";

export interface ALevelsValueInputProps {
    results: number[];
    examSubjects?: ExamSubjects;
    setALevelsResults: (results: number[]) => void;
    title: string;
    pre: boolean;
}

const ALevelsValueInput: React.FC<ALevelsValueInputProps> = ({examSubjects, setALevelsResults, title, results, pre}) => {

    const subjects = useMemo<(Subject|null)[]>(
        () => {
            let subj = [
                examSubjects?.profileSubject ?? null,
                ...(examSubjects?.coreSubjects ?? [])
            ];
            if (!pre) {
                subj.push(examSubjects?.oralSubject ?? null)
            }

            return subj;
        },
        [examSubjects, pre]
    );

    return (
        <Grid item xs={6}>
            <Typography variant="h4">{title}</Typography>
            {subjects.map((subject, index) => (
                <Grid container spacing={2} direction="row" key={subject?.name} sx={{marginTop: '10px'}}>
                    <Grid item xs={6}>
                        <Typography paragraph>{subject?.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={results[index]}
                            type="number"
                            label="Grade"
                            onChange={(e) => {
                                let res = [...results];
                                res[index] = parseInt(e.target.value, 10);
                                setALevelsResults(res);
                            }}
                        />
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}

export default ALevelsValueInput;
