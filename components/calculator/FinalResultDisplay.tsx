import {CalculationValues} from "../../pages/calculator";
import React from "react";
import {Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {CalculateALevelsResult} from "../../utils/calculate";

interface FinalResultDisplayProps {
    values: CalculationValues;
}

const FinalResultDisplay: React.FC<FinalResultDisplayProps> = ({values}) => {

    const {grade, points, combination} = CalculateALevelsResult(values);

    return (
        <Grid item xs={10} container direction="row" spacing={2}>
            <Grid item xs={6}>
                <Card elevation={1}>
                    <CardContent style={{ display:'flex', justifyContent:'center' }}>
                        <Typography variant="h2">{grade}</Typography>
                    </CardContent>
                    <CardActions style={{ display:'flex', justifyContent:'center' }}>
                        <Typography paragraph>mit {Math.floor(points)} Punkten</Typography>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}

export default FinalResultDisplay;
