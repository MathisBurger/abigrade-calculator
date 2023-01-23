import React from "react";
import {Grid} from "@mui/material";
import TestimonySideList from "./TestimonySideList";

export enum Semester {
    Q1_1 = "Q1.1",
    Q1_2 = "Q1.2",
    Q2_1 = "Q2.1",
    Q2_2 = "Q2.2"
}

export interface Grade {
    subject: string;
    grade: number;
}

export interface Testimony {
    semester: Semester;
    name: string;
    grades: Grade[];
}

interface TestimonyTopLayerProps {
    testimonies: Testimony[];
    setTestimonies: (testomonies: Testimony[]) => void;
}

const TestimonyTopLayer: React.FC<TestimonyTopLayerProps> = ({testimonies, setTestimonies}) => {


    return (
        <Grid item xs={10} container direction="row" spacing={2}>
            <TestimonySideList testimonies={testimonies} setTestimonies={setTestimonies}/>
        </Grid>
    );
}

export default TestimonyTopLayer;
