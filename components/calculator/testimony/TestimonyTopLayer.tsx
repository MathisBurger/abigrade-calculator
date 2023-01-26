import React, {useState} from "react";
import {Grid} from "@mui/material";
import TestimonySideList from "./TestimonySideList";
import TestimonyGradeRegister from "./TestimonyGradeRegister";
import {Subject} from "../../../utils/subject";

export enum Semester {
    Q1_1 = "Q1.1",
    Q1_2 = "Q1.2",
    Q2_1 = "Q2.1",
    Q2_2 = "Q2.2"
}

export interface Grade {
    /**
     * Subject of a grade
     */
    subject: Subject|null;
    /**
     * The grade
     */
    grade: number;
}

export interface Testimony {
    /**
     * The semester of the testimony
     */
    semester: Semester;
    /**
     * The name of the testimony
     */
    name: string;
    /**
     * The grades of the testimony
     */
    grades: Grade[];
}

interface TestimonyTopLayerProps {
    /**
     * The testimony
     */
    testimonies: Testimony[];
    /**
     * Sets the testimony
     *
     * @param testomonies The testimony
     */
    setTestimonies: (testomonies: Testimony[]) => void;
}

/**
 * Top Layer that contains a list view and a detailed view of the testimonies
 *
 * @constructor
 */
const TestimonyTopLayer: React.FC<TestimonyTopLayerProps> = ({testimonies, setTestimonies}) => {

    const [currentTestimony, setCurrentTestimony] = useState<number>(-1);


    return (
        <Grid item xs={10} container direction="row" spacing={2}>
            <TestimonySideList testimonies={testimonies} setTestimonies={setTestimonies} setCurrentTestimony={setCurrentTestimony}/>
            <TestimonyGradeRegister testimonies={testimonies} testimonyIndex={currentTestimony} setTestimonys={setTestimonies} />
        </Grid>
    );
}

export default TestimonyTopLayer;
