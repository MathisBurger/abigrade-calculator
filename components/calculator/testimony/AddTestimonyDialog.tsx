import React, {useMemo, useState} from "react";
import {Semester, Testimony} from "./TestimonyTopLayer";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField} from "@mui/material";
import { useTranslation } from "next-export-i18n";


interface AddTestimonyDialogProps {
  /**
   * All testimonies
   */
  testimonies: Testimony[];
  /**
   * Sets all testimonies
   *
   * @param testomonies The testimonies
   */
  setTestimonies: (testomonies: Testimony[]) => void;
  /**
   * if the dialog is opened
   */
  open: boolean;
  /**
   * Callback that is executed if the dialog should be closed
   */
  onClose: () => void;
}

/**
 * Dialog for adding new testimonies
 *
 * @constructor
 */
const AddTestimonyDialog: React.FC<AddTestimonyDialogProps> = ({testimonies, setTestimonies, open, onClose}) => {

    const {t} = useTranslation();
    const [name, setName] = useState<string>('');
    const [semester, setSemester] = useState<Semester|undefined>();

    const leftOptions = useMemo<Semester[]>(
        () => {
            let options = [Semester.Q1_1, Semester.Q1_2, Semester.Q2_1, Semester.Q2_2];
            for (let testimony of testimonies) {
                if (options.indexOf(testimony.semester) > -1) {
                    options = options.filter((s) => s != testimony.semester);
                }
            }
            return options;
        },
        [testimonies]
    );

    const createTestimony = () => {
        if (semester !== undefined && name !== '') {
            setTestimonies([
                ...testimonies,
                {
                    name, semester, grades: []
                }
            ]);
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t('action.add-testimony')}</DialogTitle>
            <DialogContent>
                <Select
                    value={`${semester ?? ''}`}
                    onChange={(e) => setSemester(e.target.value as Semester)}
                    fullWidth
                >
                    {leftOptions.map((option) => (
                        <MenuItem value={option} key={option}>{option}</MenuItem>
                    ))}
                </Select>
                <TextField
                    value={name}
                    sx={{marginTop: '20px'}}
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={createTestimony}>{t('action.create')}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddTestimonyDialog;
