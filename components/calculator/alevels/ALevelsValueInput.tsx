import React, {useMemo} from "react";
import {ExamSubjects} from "../ExamSubjectSelection";
import {Grid, TextField, Typography} from "@mui/material";
import {Subject} from "../../../utils/subject";
import { useIntl } from "react-intl";
import { Grade } from "../testimony/TestimonyTopLayer";

export interface ALevelsValueInputProps {
    /**
     * All A level results
     */
    results: Grade[];
    /**
     * All exam subjects that have been selected
     */
    examSubjects?: ExamSubjects;
    /**
     *
     * Sets the new a level results
     *
     * @param results The new A level results
     */
    setALevelsResults: (results: Grade[]) => void;
    /**
     * The title of the component
     */
    title: string;
    /**
     * Indicates whether it is the real A levels or just testing a levels
     */
    pre: boolean;
}

/**
 * Wraps a row of inputs together to let the user input his results of the a level exams.
 *
 * @constructor
 */
const ALevelsValueInput: React.FC<ALevelsValueInputProps> = ({examSubjects, setALevelsResults, title, results, pre}) => {

    const {formatMessage} = useIntl();
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
            {subjects?.map((subject, index) => (
                <Grid container spacing={2} direction="row" key={subject?.name} sx={{marginTop: '10px'}}>
                    <Grid item xs={6}>
                        <Typography paragraph>{subject?.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={results[index]?.grade ?? 0}
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
