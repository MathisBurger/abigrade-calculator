import {CalculationValues} from "../../../pages/calculator";
import React, {useMemo, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select} from "@mui/material";
import {Province} from "../inputs/ProvinceSelect";

interface LoadDialogProps {
    setPreset: (values: CalculationValues) => void;
    open: boolean;
    onClose: () => void;
}



const LoadDialog: React.FC<LoadDialogProps> = ({setPreset, open, onClose}) => {

    const presets = JSON.parse(localStorage.getItem('presets') ?? '{}');
    const [selected, setSelected] = useState<string>('');

    const onLoad = () => {
        setPreset(presets[selected]);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Daten laden</DialogTitle>
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
                    Abbrechen
                </Button>
                <Button variant="contained" color="primary" onClick={onLoad}>
                    Laden
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LoadDialog;