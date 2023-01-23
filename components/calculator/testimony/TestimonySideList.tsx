import {Grid, ListItemText, MenuItem, MenuList, Typography} from "@mui/material";
import React from "react";
import {Testimony} from "./TestimonyTopLayer";

interface TestimonySideListProps {
    testimonies: Testimony[];
    setTestimonies: (testomonies: Testimony[]) => void;
}


const TestimonySideList: React.FC<TestimonySideListProps> = ({testimonies, setTestimonies}) => {

    return (
        <Grid item xs={3}>
            <MenuList>
                {testimonies.map((testimony) => (
                        <MenuItem key={testimony.name}>
                            <ListItemText>{testimony.name}</ListItemText>
                            <Typography variant="body2" color="text.secondary">
                                {testimony.semester}
                            </Typography>
                        </MenuItem>
                ))}
                {testimonies.length < 4 && (
                    <MenuItem>
                        <ListItemText>Add</ListItemText>
                    </MenuItem>
                )}
            </MenuList>
        </Grid>
    );
}

export default TestimonySideList;
