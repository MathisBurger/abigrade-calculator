import {CalculationValues} from "../../pages/calculator";
import React from "react";
import {Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {CalculateALevelsResult} from "../../utils/calculate";
import { useIntl } from "react-intl";

interface FinalResultDisplayProps {
    values: CalculationValues;
}

const FinalResultDisplay: React.FC<FinalResultDisplayProps> = ({values}) => {

    const {grade, points} = CalculateALevelsResult(values);
    const {formatMessage} = useIntl();

    return (
        <Grid item xs={10} container direction="row" spacing={2}>
            <Grid item xs={6}>
                <Card elevation={1}>
                    <CardContent style={{ display:'flex', justifyContent:'center' }}>
                        <Typography variant="h2">{grade}</Typography>
                    </CardContent>
                    <CardActions style={{ display:'flex', justifyContent:'center' }}>
                        <Typography paragraph>{formatMessage({id: 'common.with'})} {Math.floor(points)} {formatMessage({id: 'common.points'})}</Typography>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}

export default FinalResultDisplay;
