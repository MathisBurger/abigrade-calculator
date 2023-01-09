import React from "react";
import {Grid, MenuItem, Select} from "@mui/material";

export enum Province {
    SchleswigHolstein
}


const ProvinceSelect: React.FC = () => {


    return (
          <Grid item xs={4}>
              <Select label="Bundesland">
                  {Object.keys(Province).map((value) => <MenuItem value={value}>{value}</MenuItem> )}
              </Select>
          </Grid>
    );
}

export default ProvinceSelect;
