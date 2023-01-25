import React, {useState} from "react";
import {CalculationValues} from "../../../pages/calculator";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import { useIntl } from "react-intl";

interface SaveDialogProps {
    data: CalculationValues;
    open: boolean;
    onClose: () => void;
}

const SaveDialog: React.FC<SaveDialogProps> = ({data, open, onClose}) => {

    const [name, setName] = useState<string>('');
    const {formatMessage} = useIntl();

    const onSave = () => {

        let dataToSave = JSON.parse(localStorage.getItem('presets') ?? '{}');
        dataToSave[name.replaceAll(' ', '_')] = data;
        localStorage.setItem('presets', JSON.stringify(dataToSave));
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{formatMessage({id: 'action.store-data'})}</DialogTitle>
            <DialogContent>
                <TextField
                    value={name}
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="info" onClick={onClose}>
                    {formatMessage({id: 'action.cancel'})}
                </Button>
                <Button variant="contained" color="primary" onClick={onSave}>
                    {formatMessage({id: 'action.save'})}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SaveDialog;
