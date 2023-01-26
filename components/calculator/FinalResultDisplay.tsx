import {CalculationValues} from "../../pages/calculator";
import React from "react";
import {Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {CalculateALevelsResult} from "../../utils/calculate";
import CalculationGraphView from "./CalculationGraphView";
import { useTranslation } from "next-export-i18n";

interface FinalResultDisplayProps {
  /**
   * All values that should be used for calculation
   */
  values: CalculationValues;
}

/**
 * Displays the final A levels result
 *
 * @constructor
 */
const FinalResultDisplay: React.FC<FinalResultDisplayProps> = ({values}) => {

    const {t} = useTranslation();
    const {grade, points, calculationGraph} = CalculateALevelsResult(values, t);

    return (
        <Grid item xs={10} container direction="row" spacing={2} justifyContent="center">
            <Grid item xs={5}>
                <Card elevation={1}>
                    <CardContent style={{ display:'flex', justifyContent:'center' }}>
                        <Typography variant="h2">{grade}</Typography>
                    </CardContent>
                    <CardActions style={{ display:'flex', justifyContent:'center' }}>
                        <Typography paragraph>{t('common.with')} {Math.floor(points)} {t('common.points')}</Typography>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <CalculationGraphView graph={calculationGraph} />
            </Grid>
        </Grid>
    );
}

export default FinalResultDisplay;
