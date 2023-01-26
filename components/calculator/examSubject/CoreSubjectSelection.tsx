import React, {useMemo} from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";
import {ExamSubjects} from "../ExamSubjectSelection";
import {GetAllCoreSubjects, GetSubjectByName, Subject} from "../../../utils/subject";
import { useTranslation } from "next-export-i18n";

interface CoreSubjectSelectionProps {
  /**
   * Sets all core subjects
   *
   * @param subjects The new core subjects
   */
  setCoreSubjects: (subjects: (Subject|null)[]) => void;
  /**
   * The exam subjects that have been set by the user
   */
  examSubjects?: ExamSubjects;
}

/**
 * Provides inputs for setting the core subjects.
 *
 * @constructor
 */
const CoreSubjectSelection: React.FC<CoreSubjectSelectionProps> = ({setCoreSubjects, examSubjects}) => {

    const {t} = useTranslation();
    const coreSubjects = useMemo<Subject[]>(
        () => GetAllCoreSubjects(),
        []
    );

    return (
      <Grid item xs={4}>
          <Typography variant="h4">{t('common.coreSubjects')}</Typography>
          <Select
              value={examSubjects?.coreSubjects?.[0]?.name ?? ''}
              onChange={(e) => setCoreSubjects([GetSubjectByName(e.target.value), examSubjects?.coreSubjects?.[1] ?? null])}
              fullWidth
          >
              {coreSubjects.map((subject) => (
                  <MenuItem value={subject.name} key={subject.name}>{subject.name}</MenuItem>
              ))}
          </Select>
          {(examSubjects?.coreSubjects?.length ?? 0) > 0 && (
              <Select
                  sx={{marginTop: '10px'}}
                  value={examSubjects?.coreSubjects?.[1]?.name ?? ''}
                  onChange={(e) => setCoreSubjects([examSubjects?.coreSubjects?.[0] ?? null, GetSubjectByName(e.target.value)])}
                  fullWidth
              >
                  {coreSubjects.map(({name}) => (
                      <MenuItem value={name} key={name}>{name}</MenuItem>
                  ))}
              </Select>
          )}
      </Grid>
    );
}


export default CoreSubjectSelection;
