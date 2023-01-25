import React, {useMemo} from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";
import {Testimony} from "../testimony/TestimonyTopLayer";
import {ExamSubjects} from "../ExamSubjectSelection";
import {GetAllSubjects, GetSubjectByName, Subject} from "../../../utils/subject";

interface ProfileSubjectSelectionProps {
    setProfileSubject: (subject: Subject|null) => void;
    setProfileExtendingSubject: (subject: Subject|null) => void;
    examSubjects?: ExamSubjects;
}

const ProfileSubjectSelection: React.FC<ProfileSubjectSelectionProps> = ({setProfileSubject, examSubjects, setProfileExtendingSubject}) => {

    const profileSubjects = useMemo<Subject[]>(
        () => GetAllSubjects(),
        []
    );

    return (
        <Grid item xs={4}>
            <Typography variant="h4">Profilfach</Typography>
            <Select
                value={examSubjects?.profileSubject?.name}
                onChange={(e) => setProfileSubject(GetSubjectByName(e.target.value))}
                fullWidth
            >
                {profileSubjects.map(({name}) => (
                    <MenuItem value={name} key={name}>{name}</MenuItem>
                ))}
            </Select>
            <Select
                value={examSubjects?.profileExtendingSubject?.name}
                onChange={(e) => setProfileExtendingSubject(GetSubjectByName(e.target.value))}
                fullWidth
                label="Profilergänzend"
                sx={{marginTop: '10px'}}
            >
                {profileSubjects.map(({name}) => (
                    <MenuItem value={name} key={name}>{name}</MenuItem>
                ))}
            </Select>
        </Grid>
    )
}


export default ProfileSubjectSelection;
