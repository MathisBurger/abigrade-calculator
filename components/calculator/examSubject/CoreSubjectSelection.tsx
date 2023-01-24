import React, {useMemo} from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";
import {Testimony} from "../testimony/TestimonyTopLayer";
import {ExamSubjects} from "../ExamSubjectSelection";

interface CoreSubjectSelectionProps {
    testimonies: Testimony[];
    setCoreSubjects: (subjects: string[]) => void;
    examSubjects?: ExamSubjects;
}

const CoreSubjectSelection: React.FC<CoreSubjectSelectionProps> = ({testimonies, setCoreSubjects, examSubjects}) => {

    const coreSubjects = useMemo<string[]>(
        () => testimonies[0].grades
            .map((grade) => grade.subject)
            .filter((subject) => subject !== examSubjects?.profileSubject),
        [examSubjects, testimonies]
    );

    return (
      <Grid item xs={4}>
          <Typography variant="h4">Kernfächer</Typography>
          <Select
              label="Kernfach 1"
              value={examSubjects?.coreSubjects?.[0] ?? ''}
              onChange={(e) => setCoreSubjects([e.target.value, examSubjects?.coreSubjects?.[1] ?? ''])}
              fullWidth
          >
              {coreSubjects.map((subject) => (
                  <MenuItem value={subject} key={subject}>{subject}</MenuItem>
              ))}
          </Select>
          {(examSubjects?.coreSubjects?.length ?? 0) > 0 && (
              <Select
                  label="Kernfach 2"
                  sx={{marginTop: '10px'}}
                  value={examSubjects?.coreSubjects?.[1] ?? ''}
                  onChange={(e) => setCoreSubjects([examSubjects?.coreSubjects?.[0] ?? '', e.target.value])}
                  fullWidth
              >
                  {coreSubjects.map((subject) => (
                      <MenuItem value={subject} key={subject}>{subject}</MenuItem>
                  ))}
              </Select>
          )}
      </Grid>
    );
}


export default CoreSubjectSelection;
