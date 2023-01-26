import { Grid } from "@mui/material";
import React from "react";
import { ExamSubjects } from "./ExamSubjectSelection";
import ALevelsValueInput from "./alevels/ALevelsValueInput";
import { Grade } from "./testimony/TestimonyTopLayer";
import { useTranslation } from "next-export-i18n";

interface ALevelsResultsDisplayProps {
  /**
   * All exam subjects that have been selected
   */
  examSubjects?: ExamSubjects;
  /**
   * The a level results
   */
  aLevelResults: ALevelsResults;
  /**
   * Sets the A level results
   *
   * @param results The A level results
   */
  setALevelsResults: (results: ALevelsResults) => void;
}

export interface ALevelsResults {
  /**
   * The pre grades
   */
  pre: Grade[];
  /**
   * The real grades
   */
  real: Grade[];
}

/**
 * Displays all a level results and allows the user to edit them
 *
 * @constructor
 */
const ALevelsResultsDisplay: React.FC<ALevelsResultsDisplayProps> = ({examSubjects, setALevelsResults, aLevelResults}) => {

    const {t} = useTranslation();


    return (
        <Grid item xs={10} container direction="row" spacing={2}>
            <ALevelsValueInput
                results={aLevelResults.pre}
                setALevelsResults={(res) => setALevelsResults({...aLevelResults, pre: res})}
                title={t('common.pre-abi')}
                examSubjects={examSubjects}
                pre={true}
            />
            <ALevelsValueInput
                results={aLevelResults.real}
                setALevelsResults={(res) => setALevelsResults({...aLevelResults, real: res})}
                title={t('common.abi')}
                examSubjects={examSubjects}
                pre={false}
            />
        </Grid>
    );
}

export default ALevelsResultsDisplay;
