import React from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";

export enum Province {
    SchleswigHolstein = "Schleswig-Holstein"
}

interface ProvinceSelectProps {
    province: Province;
    setProvince: (province: Province) => void;
}

const ProvinceSelect: React.FC<ProvinceSelectProps> = ({province, setProvince}) => {


    return (
          <Grid item xs={4}>
             <Typography variant="h4">Bundesland auswählen:</Typography>
              <Select
                  label="Bundesland"
                  value={`${province}`}
                  onChange={(e) => setProvince(e.target.value as Province)}
              >
                  {Object.entries(Province)
                      .map((value) => <MenuItem value={value[0]} key={value[0]}>{value[1]}</MenuItem> )}
              </Select>
          </Grid>
    );
}

export default ProvinceSelect;
