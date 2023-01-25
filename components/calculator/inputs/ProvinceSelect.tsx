import React from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";
import { useIntl } from "react-intl";

export enum Province {
    SchleswigHolstein = "Schleswig-Holstein"
}

interface ProvinceSelectProps {
    province: Province;
    setProvince: (province: Province) => void;
}

const ProvinceSelect: React.FC<ProvinceSelectProps> = ({province, setProvince}) => {

    const {formatMessage} = useIntl();

    return (
          <Grid item xs={5}>
             <Typography variant="h4">{formatMessage({id: 'action.select-province'})}:</Typography>
              <Select
                  value={`${province}`}
                  onChange={(e) => setProvince(e.target.value as Province)}
                  fullWidth
              >
                  {Object.entries(Province)
                      .map((value) => <MenuItem value={value[0]} key={value[0]}>{value[1]}</MenuItem> )}
              </Select>
          </Grid>
    );
}

export default ProvinceSelect;
