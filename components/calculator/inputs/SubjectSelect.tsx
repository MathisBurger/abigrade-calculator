import React from "react";
import {MenuItem, Select} from "@mui/material";
import {GetAllSubjects, GetSubjectByName, Subject} from "../../../utils/subject";


interface SubjectSelectProps {
    subject: Subject|null;
    setSubject: (province: Subject|null) => void;
}

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
