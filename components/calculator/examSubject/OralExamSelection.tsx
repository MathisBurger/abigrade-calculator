import {Testimony} from "../testimony/TestimonyTopLayer";
import {ExamSubjects} from "../ExamSubjectSelection";
import React, {useMemo} from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";
import {GetAllSubjects, GetSubjectByName, Subject} from "../../../utils/subject";
import { useIntl } from "react-intl";

interface OralExamSelectionProps {
    /**
     * Sets the oral exam subject
     *
     * @param subject The oral exam subject
     */
    setOralExamSubject: (subject: Subject|null) => void;
    /**
     * The exam subjects that have been set by the user
     */
    examSubjects?: ExamSubjects;
}

/**
 * Provides inputs for setting the oral exam subject
 *
 * @constructor
 */
const OralExamSelection: React.FC<OralExamSelectionProps> = ({setOralExamSubject, examSubjects}) => {

    const {formatMessage} = useIntl();
    const oralSubjects = useMemo<Subject[]>(
        () => GetAllSubjects()
            .filter((subject) => subject !== examSubjects?.profileSubject)
            .filter((subject) => (examSubjects?.coreSubjects ?? []).indexOf(subject) === -1),
        [examSubjects]
    );

    return (
        <Grid item xs={4}>
            <Typography variant="h4">{formatMessage({id: 'common.oralExam'})}</Typography>
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
