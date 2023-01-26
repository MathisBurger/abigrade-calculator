import React, {useState} from "react";
import {CalculationValues} from "../../../pages/calculator";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import { useTranslation } from "next-export-i18n";

interface SaveDialogProps {
  /**
   * The data that should be saved
   */
  data: CalculationValues;
  /**
   * if the dialog is open at the moment
   */
  open: boolean;
  /**
   * Callback that is executed to close the dialog
   */
  onClose: () => void;
}

/**
 * A dialog that makes it possible to save the current calculation state into the local storage of the browser
 * for later use.
 *
 * @constructor
 */
const SaveDialog: React.FC<SaveDialogProps> = ({data, open, onClose}) => {

    const [name, setName] = useState<string>('');
    const {t} = useTranslation();

    const onSave = () => {

        let dataToSave = JSON.parse(localStorage.getItem('presets') ?? '{}');
        dataToSave[name.replaceAll(' ', '_')] = data;
        localStorage.setItem('presets', JSON.stringify(dataToSave));
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t('action.store-data')}</DialogTitle>
            <DialogContent>
                <TextField
                    value={name}
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="info" onClick={onClose}>
                    {t('action.cancel')}
                </Button>
                <Button variant="contained" color="primary" onClick={onSave}>
                    {t('action.save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SaveDialog;
