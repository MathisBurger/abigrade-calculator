import React from "react";
import {Grid} from "@mui/material";
import {Testimony} from "./testimony/TestimonyTopLayer";
import ProfileSubjectSelection from "./examSubject/ProfileSubjectSelection";
import CoreSubjectSelection from "./examSubject/CoreSubjectSelection";
import OralExamSelection from "./examSubject/OralExamSelection";

interface ExamSubjectSelectionProps {
    testimonies: Testimony[];
    examSubjects?: ExamSubjects;
    setExamSubjects: (subjects: ExamSubjects) => void;
}

export interface ExamSubjects {
    profileSubject?: string;
    coreSubjects?: string[];
    oralSubject?: string;
}

const ExamSubjectSelection: React.FC<ExamSubjectSelectionProps> = ({testimonies, examSubjects, setExamSubjects}) => {

    return (
        <Grid item xs={10} container direction="row" spacing={2}>
            <ProfileSubjectSelection
                testimonies={testimonies}
                examSubjects={examSubjects}
                setProfileSubject={(subj) => setExamSubjects({...examSubjects, profileSubject: subj})}
            />
            <CoreSubjectSelection
                testimonies={testimonies}
                setCoreSubjects={(subjects) => setExamSubjects({...examSubjects, coreSubjects: subjects})}
                examSubjects={examSubjects}
            />
            <OralExamSelection
                testimonies={testimonies}
                setOralExamSubject={(subj) => setExamSubjects({...examSubjects, oralSubject: subj})}
                examSubjects={examSubjects}
            />
        </Grid>
    );
}

export default ExamSubjectSelection;
