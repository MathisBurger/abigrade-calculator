import React from "react";
import {Grid} from "@mui/material";
import {Testimony} from "./testimony/TestimonyTopLayer";
import ProfileSubjectSelection from "./examSubject/ProfileSubjectSelection";
import CoreSubjectSelection from "./examSubject/CoreSubjectSelection";
import OralExamSelection from "./examSubject/OralExamSelection";
import {Subject} from "../../utils/subject";

interface ExamSubjectSelectionProps {
  /**
   * All testimonies
   */
  testimonies: Testimony[];
  /**
   * All exam subjects
   */
  examSubjects?: ExamSubjects;
  /**
   * Sets the exam subjects
   *
   * @param subjects The exam subjects
   */
  setExamSubjects: (subjects: ExamSubjects) => void;
}

export interface ExamSubjects {
  /**
   * The profile subject
   */
  profileSubject?: Subject|null;
  /**
   * The profile extending subject
   */
  profileExtendingSubject?: Subject|null;
  /**
   * The core subjects
   */
  coreSubjects?: (Subject|null)[];
  /**
   * The oral subject
   */
  oralSubject?: Subject|null;
}

/**
 * Provides inputs for selecting the exam subjects
 *
 * @constructor
 */
const ExamSubjectSelection: React.FC<ExamSubjectSelectionProps> = ({testimonies, examSubjects, setExamSubjects}) => {

    return (
        <Grid item xs={10} container direction="row" spacing={2}>
            <ProfileSubjectSelection
                examSubjects={examSubjects}
                setProfileSubject={(subj) => setExamSubjects({...examSubjects, profileSubject: subj})}
                setProfileExtendingSubject={(subj) => setExamSubjects({...examSubjects, profileExtendingSubject: subj})}
            />
            <CoreSubjectSelection
                setCoreSubjects={(subjects) => setExamSubjects({...examSubjects, coreSubjects: subjects})}
                examSubjects={examSubjects}
            />
            <OralExamSelection
                setOralExamSubject={(subj) => setExamSubjects({...examSubjects, oralSubject: subj})}
                examSubjects={examSubjects}
            />
        </Grid>
    );
}

export default ExamSubjectSelection;
