import React from "react";
import {Grid} from "@mui/material";
import {Testimony} from "./testimony/TestimonyTopLayer";
import ProfileSubjectSelection from "./examSubject/ProfileSubjectSelection";
import CoreSubjectSelection from "./examSubject/CoreSubjectSelection";
import OralExamSelection from "./examSubject/OralExamSelection";
import {Subject} from "../../utils/subject";

interface ExamSubjectSelectionProps {
    testimonies: Testimony[];
    examSubjects?: ExamSubjects;
    setExamSubjects: (subjects: ExamSubjects) => void;
}

export interface ExamSubjects {
    profileSubject?: Subject|null;
    profileExtendingSubject?: Subject|null;
    coreSubjects?: (Subject|null)[];
    oralSubject?: Subject|null;
}

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
