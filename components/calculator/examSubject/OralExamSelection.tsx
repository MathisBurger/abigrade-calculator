import {Testimony} from "../testimony/TestimonyTopLayer";
import {ExamSubjects} from "../ExamSubjectSelection";
import React, {useMemo} from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";
import {GetAllSubjects, GetSubjectByName, Subject} from "../../../utils/subject";

interface OralExamSelectionProps {
    setOralExamSubject: (subject: Subject|null) => void;
    examSubjects?: ExamSubjects;
}

const OralExamSelection: React.FC<OralExamSelectionProps> = ({setOralExamSubject, examSubjects}) => {

    const oralSubjects = useMemo<Subject[]>(
        () => GetAllSubjects()
            .filter((subject) => subject !== examSubjects?.profileSubject)
            .filter((subject) => (examSubjects?.coreSubjects ?? []).indexOf(subject) === -1),
        [examSubjects]
    );

    return (
        <Grid item xs={4}>
            <Typography variant="h4">Mündliche Prüfung</Typography>
            <Select
                value={examSubjects?.oralSubject?.name}
                onChange={(e) => setOralExamSubject(GetSubjectByName(e.target.value))}
                fullWidth
            >
                {oralSubjects.map(({name}) => (
                        <MenuItem value={name} key={name}>{name}</MenuItem>
                ))}
            </Select>
    </Grid>
    );
}

export default OralExamSelection;
