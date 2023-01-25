import { Grid } from "@mui/material";
import React, { useMemo } from "react";
import { ExamSubjects } from "./ExamSubjectSelection";
import ALevelsValueInput from "./alevels/ALevelsValueInput";
import { useIntl } from "react-intl";
import { Grade } from "./testimony/TestimonyTopLayer";

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


    return (
        <Grid item xs={10} container direction="row" spacing={2}>
            <ALevelsValueInput
                results={aLevelResults.pre}
                setALevelsResults={(res) => setALevelsResults({...aLevelResults, pre: res})}
                title={formatMessage({id: 'common.pre-abi'})}
                examSubjects={examSubjects}
                pre={true}
            />
            <ALevelsValueInput
                results={aLevelResults.real}
                setALevelsResults={(res) => setALevelsResults({...aLevelResults, real: res})}
                title={formatMessage({id: 'common.abi'})}
                examSubjects={examSubjects}
                pre={false}
            />
        </Grid>
    );
}

export default ALevelsResultsDisplay;
