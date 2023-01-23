import {Card, CardContent, Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Typography} from "@mui/material";
import React, {useState} from "react";
import {Testimony} from "./TestimonyTopLayer";
import {Add} from "@mui/icons-material";
import AddTestimonyDialog from "./AddTestimonyDialog";

interface TestimonySideListProps {
    testimonies: Testimony[];
    setTestimonies: (testomonies: Testimony[]) => void;
    setCurrentTestimony: (id: number) => void;
}


const TestimonySideList: React.FC<TestimonySideListProps> = ({testimonies, setTestimonies, setCurrentTestimony}) => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    return (
        <>
            <Grid item xs={3}>
                <Card elevation={1}>
                    <CardContent style={{padding: 0}}>
                        <MenuList>
                            {testimonies.map((testimony, i) => (
                                <MenuItem key={testimony.name} onClick={() => setCurrentTestimony(i)}>
                                    <ListItemText>{testimony.name}</ListItemText>
                                    <Typography variant="body2" color="text.secondary">
                                        {testimony.semester}
                                    </Typography>
                                </MenuItem>
                            ))}
                            {testimonies.length < 4 && (
                                <MenuItem onClick={() => setDialogOpen(true)}>
                                    <ListItemIcon>
                                        <Add />
                                    </ListItemIcon>
                                    <ListItemText>Add</ListItemText>
                                </MenuItem>
                            )}
                        </MenuList>
                    </CardContent>
                </Card>
            </Grid>
            <AddTestimonyDialog
                testimonies={testimonies}
                setTestimonies={setTestimonies}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </>
    );
}

export default TestimonySideList;
