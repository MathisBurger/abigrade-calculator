import {Testimony} from "../testimony/TestimonyTopLayer";
import {ExamSubjects} from "../ExamSubjectSelection";
import React, {useMemo} from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";

interface OralExamSelectionProps {
    testimonies: Testimony[];
    setOralExamSubject: (subject: string) => void;
    examSubjects?: ExamSubjects;
}

const OralExamSelection: React.FC<OralExamSelectionProps> = ({testimonies, setOralExamSubject, examSubjects}) => {

    const oralSubjects = useMemo<string[]>(
        () => testimonies[0].grades
            .map((grade) => grade.subject)
            .filter((subject) => subject !== examSubjects?.profileSubject)
            .filter((subject) => (examSubjects?.coreSubjects ?? []).indexOf(subject) === -1),
        [testimonies, examSubjects]
    );

    return (
        <Grid item xs={4}>
            <Typography variant="h4">Mündliche Prüfung</Typography>
            <Select
                value={examSubjects?.oralSubject}
                onChange={(e) => setOralExamSubject(e.target.value)}
                fullWidth
            >
                {oralSubjects.map((subject) => (
                        <MenuItem value={subject} key={subject}>{subject}</MenuItem>
                ))}
            </Select>
    </Grid>
    );
}

export default OralExamSelection;
