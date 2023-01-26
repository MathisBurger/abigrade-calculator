import {CalculationValues} from "../../../pages/calculator";
import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select} from "@mui/material";
import { useTranslation } from "next-export-i18n";

interface LoadDialogProps {
  /**
   * Sets the preset that has been loaded
   *
   * @param values The preset
   */
  setPreset: (values: CalculationValues) => void;
  /**
   * If the dialog is open at the moment
   */
  open: boolean;
  /**
   * Callback that is executed to close the dialog
   */
  onClose: () => void;
}

/**
 * A dialog that loads a preset into storage
 *
 * @constructor
 */
const LoadDialog: React.FC<LoadDialogProps> = ({setPreset, open, onClose}) => {

    const {t} = useTranslation();
    const presets = JSON.parse(localStorage.getItem('presets') ?? '{}');
    const [selected, setSelected] = useState<string>('');

    const onLoad = () => {
        if (selected !== '') {
          setPreset(presets[selected]);
          onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t('action.load-data')}</DialogTitle>
            <DialogContent>
                <Select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    fullWidth
                >
                    {Object.keys(presets)
                        .map((value) => <MenuItem value={value} key={value}>{value}</MenuItem> )}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="info" onClick={onClose}>
                    {t('action.cancel')}
                </Button>
                <Button variant="contained" color="primary" onClick={onLoad}>
                    {t('action.load')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LoadDialog;
