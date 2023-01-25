import { Grid } from "@mui/material";
import React, { useMemo } from "react";
import { ExamSubjects } from "./ExamSubjectSelection";
import ALevelsValueInput from "./alevels/ALevelsValueInput";
import { useIntl } from "react-intl";
import { Grade } from "./testimony/TestimonyTopLayer";
import { Subject } from "../../utils/subject";

interface ALevelsResultsDisplayProps {
    examSubjects?: ExamSubjects;
    aLevelResults: ALevelsResults;
    setALevelsResults: (results: ALevelsResults) => void;
}

export interface ALevelsResults {
    pre: Grade[];
    real: Grade[];
}

const ALevelsResultsDisplay: React.FC<ALevelsResultsDisplayProps> = ({examSubjects, setALevelsResults, aLevelResults}) => {

    const {formatMessage} = useIntl();

  const subjects = useMemo<(Subject|null)[]>(
    () => {
      return [
        examSubjects?.profileSubject ?? null,
        ...(examSubjects?.coreSubjects ?? []),
        examSubjects?.oralSubject ?? null
      ];
    },
    [examSubjects]
  );

    const preResults = useMemo<Grade[]>(
      () => {
        if (aLevelResults.pre.length === 0) {
          return subjects.splice(0,3).map((val) => ({
            grade: 0,
            subject: val
          }));
        }
        return aLevelResults.pre;
      },
      [subjects, aLevelResults]
    );

  const realResults = useMemo<Grade[]>(
    () => {
      if (aLevelResults.real.length === 0) {
        return subjects.map((val) => ({
          grade: 0,
          subject: val
        }));
      }
      return aLevelResults.real;
    },
    [subjects, aLevelResults]
  );

    return (
        <Grid item xs={10} container direction="row" spacing={2}>
            <ALevelsValueInput
                results={preResults}
                setALevelsResults={(res) => setALevelsResults({...aLevelResults, pre: res})}
                title={formatMessage({id: 'common.pre-abi'})}
                subjects={subjects}
            />
            <ALevelsValueInput
                results={realResults}
                setALevelsResults={(res) => setALevelsResults({...aLevelResults, real: res})}
                title={formatMessage({id: 'common.abi'})}
                subjects={subjects}
            />
        </Grid>
    );
}

export default ALevelsResultsDisplay;
