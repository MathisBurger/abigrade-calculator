import {CalculationValues} from "../../pages/calculator";
import React from "react";
import {Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {CalculateALevelsResult} from "../../utils/calculate";
import { useIntl } from "react-intl";
import CalculationGraphView from "./CalculationGraphView";

interface FinalResultDisplayProps {
    values: CalculationValues;
}

const FinalResultDisplay: React.FC<FinalResultDisplayProps> = ({values}) => {

    const {formatMessage} = useIntl();
    const {grade, points, calculationGraph} = CalculateALevelsResult(values, formatMessage);

    return (
        <Grid item xs={10} container direction="row" spacing={2} justifyContent="center">
            <Grid item xs={5}>
                <Card elevation={1}>
                    <CardContent style={{ display:'flex', justifyContent:'center' }}>
                        <Typography variant="h2">{grade}</Typography>
                    </CardContent>
                    <CardActions style={{ display:'flex', justifyContent:'center' }}>
                        <Typography paragraph>{formatMessage({id: 'common.with'})} {Math.floor(points)} {formatMessage({id: 'common.points'})}</Typography>
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
