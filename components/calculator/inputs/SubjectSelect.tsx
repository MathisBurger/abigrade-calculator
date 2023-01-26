import React from "react";
import {MenuItem, Select} from "@mui/material";
import {GetAllSubjects, GetSubjectByName, Subject} from "../../../utils/subject";


interface SubjectSelectProps {
  /**
   * The subject that has been selected
   */
  subject: Subject|null;
  /**
   * Sets the selected subject
   *
   * @param subject The new subject
   */
  setSubject: (subject: Subject|null) => void;
}

/**
 * Provides an input that wraps the subject selection menu
 *
 * @constructor
 */
const SubjectSelect: React.FC<SubjectSelectProps> = ({subject, setSubject}) => {

    return (
            <Select
                value={`${subject?.name}`}
                onChange={(e) => setSubject(GetSubjectByName(e.target.value))}
                fullWidth
            >
                {GetAllSubjects()
                    .map(({name}) => <MenuItem value={name} key={name}>{name}</MenuItem> )}
            </Select>
    );
}

export default SubjectSelect;
