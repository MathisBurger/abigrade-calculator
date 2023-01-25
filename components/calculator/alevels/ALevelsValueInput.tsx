import React, {useMemo} from "react";
import {ExamSubjects} from "../ExamSubjectSelection";
import {Grid, TextField, Typography} from "@mui/material";
import {Subject} from "../../../utils/subject";
import { useIntl } from "react-intl";
import { Grade } from "../testimony/TestimonyTopLayer";

export interface ALevelsValueInputProps {
    results: Grade[];
    subjects?: (Subject|null)[];
    setALevelsResults: (results: Grade[]) => void;
    title: string;
}

const ALevelsValueInput: React.FC<ALevelsValueInputProps> = ({subjects, setALevelsResults, title, results}) => {

    const {formatMessage} = useIntl();

    return (
        <Grid item xs={6}>
            <Typography variant="h4">{title}</Typography>
            {subjects?.map((subject, index) => (
                <Grid container spacing={2} direction="row" key={subject?.name} sx={{marginTop: '10px'}}>
                    <Grid item xs={6}>
                        <Typography paragraph>{subject?.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={results[index]}
                            type="number"
                            label={formatMessage({id: 'common.grade'})}
                            onChange={(e) => {
                                let res = [...results];
                                res[index] = {subject, grade: parseInt(e.target.value, 10)};
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
