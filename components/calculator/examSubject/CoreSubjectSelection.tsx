import React, {useMemo} from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";
import {Testimony} from "../testimony/TestimonyTopLayer";
import {ExamSubjects} from "../ExamSubjectSelection";
import {GetAllCoreSubjects, GetSubjectByName, Subject} from "../../../utils/subject";
import { useIntl } from "react-intl";

interface CoreSubjectSelectionProps {
    setCoreSubjects: (subjects: (Subject|null)[]) => void;
    examSubjects?: ExamSubjects;
}

const CoreSubjectSelection: React.FC<CoreSubjectSelectionProps> = ({setCoreSubjects, examSubjects}) => {

    const {formatMessage} = useIntl();
    const coreSubjects = useMemo<Subject[]>(
        () => GetAllCoreSubjects(),
        []
    );

    return (
      <Grid item xs={4}>
          <Typography variant="h4">{formatMessage({id: 'common.coreSubjects'})}</Typography>
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
