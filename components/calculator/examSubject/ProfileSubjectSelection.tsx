import React, { useMemo } from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";
import {ExamSubjects} from "../ExamSubjectSelection";
import {GetAllSubjects, GetSubjectByName, Subject} from "../../../utils/subject";
import { useTranslation } from "next-export-i18n";

interface ProfileSubjectSelectionProps {
  /**
   * Sets the profile subject
   *
   * @param subject The new profile subject
   */
 setProfileSubject: (subject: Subject|null) => void;
  /**
   * Sets the extending profile subject
   *
   * @param subject The extending profile subject
   */
  setProfileExtendingSubject: (subject: Subject|null) => void;
  /**
   * All exam subjects that have been set by the user
   */
  examSubjects?: ExamSubjects;
}

/**
 * Provides selection menus for the profile subject and extending profile subject selection.
 *
 * @constructor
 */
const ProfileSubjectSelection: React.FC<ProfileSubjectSelectionProps> = ({setProfileSubject, examSubjects, setProfileExtendingSubject}) => {

  const {t} = useTranslation();
    const profileSubjects = useMemo<Subject[]>(
        () => GetAllSubjects(),
        []
    );

    return (
        <Grid item xs={4}>
            <Typography variant="h4">{t('common.profileSubject')}</Typography>
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
                label={t('common.profileExtending')}
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
