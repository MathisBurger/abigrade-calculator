import React, {useMemo} from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";
import {Testimony} from "../testimony/TestimonyTopLayer";
import {ExamSubjects} from "../ExamSubjectSelection";

interface ProfileSubjectSelectionProps {
    testimonies: Testimony[];
    setProfileSubject: (subject: string) => void;
    setProfileExtendingSubject: (subject: string) => void;
    examSubjects?: ExamSubjects;
}

const ProfileSubjectSelection: React.FC<ProfileSubjectSelectionProps> = ({testimonies, setProfileSubject, examSubjects, setProfileExtendingSubject}) => {

    const profileSubjects = useMemo<string[]>(
        () => testimonies[0].grades.map((grade) => grade.subject),
        [testimonies]
    );

    return (
        <Grid item xs={4}>
            <Typography variant="h4">Profilfach</Typography>
            <Select
                value={examSubjects?.profileSubject}
                onChange={(e) => setProfileSubject(e.target.value)}
                fullWidth
            >
                {profileSubjects.map((subject) => (
                    <MenuItem value={subject} key={subject}>{subject}</MenuItem>
                ))}
            </Select>
            <Select
                value={examSubjects?.profileExtendingSubject}
                onChange={(e) => setProfileExtendingSubject(e.target.value)}
                fullWidth
                label="Profilergänzend"
                sx={{marginTop: '10px'}}
            >
                {profileSubjects.map((subject) => (
                    <MenuItem value={subject} key={subject}>{subject}</MenuItem>
                ))}
            </Select>
        </Grid>
    )
}


export default ProfileSubjectSelection;
