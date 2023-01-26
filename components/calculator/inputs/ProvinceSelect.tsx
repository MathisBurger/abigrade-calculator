import React from "react";
import {Grid, MenuItem, Select, Typography} from "@mui/material";
import { useTranslation } from "next-export-i18n";

/**
 * All provinces that are currently supported
 */
export enum Province {
    SchleswigHolstein = "Schleswig-Holstein"
}

interface ProvinceSelectProps {
  /**
   * The selected province
   */
  province: Province;
  /**
   * Sets the selected province
   *
   * @param province The new province
   */
  setProvince: (province: Province) => void;
}

/**
 * Provides an input for selecting the province.
 *
 * @constructor
 */
const ProvinceSelect: React.FC<ProvinceSelectProps> = ({province, setProvince}) => {

    const {t} = useTranslation();

    return (
          <Grid item xs={5}>
             <Typography variant="h4">{t('action.select-province')}:</Typography>
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
