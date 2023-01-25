import { CalculationValues } from "../pages/calculator";
import { Grade, Testimony } from "../components/calculator/testimony/TestimonyTopLayer";
import { ExamSubjects } from "../components/calculator/ExamSubjectSelection";
import { GetAverage } from "./average";
import { GetAllScienceSubjects, GetSubjectByName, Subject } from "./subject";
import { MessageDescriptor, PrimitiveType } from "react-intl";
import { FormatXMLElementFn, Options } from "intl-messageformat";

export type MessageTranslator = (descriptor: MessageDescriptor, values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>> | undefined, opts?: Options | undefined) => string;

export interface CalculateValueResult {
    points: number;
    grade: string;
    calculationGraph: CalculationGraph;
}

interface ExtendedGrade extends Grade {
    testimonyIndex: number;
}

export interface CalculationGraph {
    grade?: Grade;
    description: string;
    children?: CalculationGraph[];
}

type Calculation = [Grade[], Testimony[]];


export const CalculateALevelsResult = (values: CalculationValues, formatMessage: MessageTranslator): CalculateValueResult => {

    let rootGraphElement: CalculationGraph = {description: formatMessage({id: 'calc.root-graph'})};

    let testimonies = values.testomonies ?? [];
    let points = 0;
    let examElement: CalculationGraph = {description: formatMessage({id: 'calc.exam-graph'}), children: []};
    for (let grade of values.aLevelsResults.real) {
        examElement?.children?.push({
           description: formatMessage({id: 'calc.abi-exam'}) ,
            grade: grade
        });
        points += (grade.grade*5);
    }
    updateChildren(rootGraphElement, examElement);

    let testimonyGraphElement = {
        children: [],
        description: formatMessage({id: 'calc.subjects'})
    };

    const [aLevelGrades, aLevelSubjTestimonies] =
        getALevelSubjGrades(testimonies, values.examSubjects!);
    updateChildren(testimonyGraphElement, {
        description: formatMessage({id: 'calc.abi-subjects'}),
        children: aLevelGrades.map((g) => ({
            description: formatMessage({id: 'calc.abi-subject'}),
            grade: g
        }))
    });

    const [missingCoreGrades, missingCoreSubjTestimonies] =
        extraCoreSubjectGrades(aLevelSubjTestimonies, values.examSubjects!);
    updateChildren(testimonyGraphElement, {
        description: formatMessage({id: 'calc.missing-cores'}),
        children: missingCoreGrades.map((g) => ({
            description: formatMessage({id: 'calc.missing-core'}),
            grade: g
        }))
    });

    const [scienceGrades, scienceGradesTestimonies] =
        scienceSubjectGrades(missingCoreSubjTestimonies, values.examSubjects!);
    updateChildren(testimonyGraphElement, {
        description: formatMessage({id: 'calc.sciences'}),
        children: scienceGrades.map((g) => ({
            description: formatMessage({id: 'calc.science'}),
            grade: g
        }))
    });

    const [profileExtendingGrades, profileExtendingTestimonies] =
        getProfileExtendingGrades(scienceGradesTestimonies, values.examSubjects!);
    updateChildren(testimonyGraphElement, {
        description: formatMessage({id: 'calc.profileExtentendings'}),
        children: profileExtendingGrades.map((g) => ({
            description: formatMessage({id: 'calc.profileExtending'}),
            grade: g
        }))
    });

    const [aestaticGrades, aestaticTestamonies] =
        getAestaticGrades(profileExtendingTestimonies);
    updateChildren(testimonyGraphElement, {
        description: formatMessage({id: 'calc.aestatics'}),
        children: aestaticGrades.map((g) => ({
            description: formatMessage({id: 'calc.aestatic'}),
            grade: g
        }))
    });

    const [historyGrades, historyTestimonies] =
        getHistoryGrades(aestaticTestamonies);
    updateChildren(testimonyGraphElement, {
        description: formatMessage({id: 'calc.histories'}),
        children: historyGrades.map((g) => ({
            description: formatMessage({id: 'calc.history'}),
            grade: g
        }))
    });

    const [geoWipoGrades, geoWipoTestimonies] =
        getGeoWiPoGrades(historyTestimonies);
    updateChildren(testimonyGraphElement, {
        description: formatMessage({id: 'calc.geoWipo'}),
        children: geoWipoGrades.map((g) => ({
            description: formatMessage({id: 'calc.geoWipo'}),
            grade: g
        }))
    });

    const [reliPhiloGrades, reliPhiloTestimonies] =
        getReliPhiloGrades(geoWipoTestimonies);
    updateChildren(testimonyGraphElement, {
        description: formatMessage({id: 'calc.reliPhilo'}),
        children: reliPhiloGrades.map((g) => ({
            description: formatMessage({id: 'calc.reliPhilo'}),
            grade: g
        }))
    });

    const grades = [
        ...aLevelGrades, ...missingCoreGrades,
        ...scienceGrades, ...profileExtendingGrades,
        ...aestaticGrades, ...historyGrades,
        ...geoWipoGrades, ...reliPhiloGrades
    ];
    const resultsWithAllPE = getAllGradesFromTestamonies(reliPhiloTestimonies);
    const withoutPE = removeWorstPEGradeFromGrades(resultsWithAllPE);
    const missing = 36 - grades.length;
    const extraGrades = withoutPE.splice(0, missing);
    updateChildren(testimonyGraphElement, {
        description: formatMessage({id: 'calc.extraSubjects'}),
        children: extraGrades.map((g) => ({
            description: formatMessage({id: 'calc.extraSubject'}),
            grade: g
        }))
    });

    updateChildren(rootGraphElement, testimonyGraphElement);


    const allGrades = [...grades, ...extraGrades];

    let blockTwoPoints = 0;
    for (let grade of allGrades) {
        blockTwoPoints += grade?.grade ?? 0;
    }
    points += blockTwoPoints * (40/36);

    return {
        grade: GetAverage(points),
        points,
        calculationGraph: rootGraphElement
    }
}

const updateChildren = (el: CalculationGraph, new_el: CalculationGraph): CalculationGraph => {
    el.children = [...(el.children ?? []), new_el];
    return el;
}

const getALevelSubjGrades = (testimonies: Testimony[], core: ExamSubjects): Calculation => {
    const selectedCoreSubjects = (core?.coreSubjects ?? []);
    let grades = [];
    for (let subj of selectedCoreSubjects) {
        for (let testimony of testimonies) {
            grades.push(testimony.grades.filter((g) => g.subject === subj)[0])
        }
    }
    for (let testimony of testimonies) {
        grades.push(testimony.grades.filter((g) => g.subject === core.profileSubject)[0]);
    }
    let tms: Testimony[] = [];
    for (let subj of selectedCoreSubjects) {
        tms = testimonies.map((testimony) => {
            let tm = {...testimony};
            tm.grades = tm.grades.filter((g) => g.subject !== subj);
            return tm;
        })
    }
    tms = testimonies.map((testimony) => {
        let tm = {...testimony};
        tm.grades = tm.grades.filter((g) => g.subject !== core.profileSubject);
        return tm;
    })
    return [
        grades,
        tms
    ];
}

const extraCoreSubjectGrades = (testimonies: Testimony[], core: ExamSubjects): Calculation => {
    const selectedCoreSubjects = (core?.coreSubjects ?? []);
    const missingCoreSubject = getMissingCoreSubject(selectedCoreSubjects);
    let grades = [];
    for (let testimony of testimonies) {
        grades.push(testimony.grades.filter((g) => g.subject === missingCoreSubject)[0])
    }
    return [
        grades,
        testimonies.map((testimony) => {
            let tm = {...testimony};
            tm.grades = tm.grades.filter((g) => g.subject !== missingCoreSubject);
            return tm;
        })
    ]
}

const scienceSubjectGrades = (testimonies: Testimony[], core: ExamSubjects): Calculation => {
    const scienceSubjects = GetAllScienceSubjects();
    if (scienceSubjects.indexOf(core?.profileSubject ?? null) > -1) {
        return [[], testimonies];
    }
    const scienceGrades: ExtendedGrade[] = getAllGradesFromTestamonies(testimonies)
        .filter((g) => scienceSubjects.indexOf(g.subject) > -1);
    let grades = [];
    const elements = scienceGrades.slice(0, 4);
    grades.push(...(elements as Grade[]));
    let tms = [...testimonies];
    for (let element of elements) {
        const tm = tms[element.testimonyIndex];
        tm.grades = tm.grades.filter((g) => g.subject !== element.subject);
        tms[element.testimonyIndex] = tm;
    }
    return [
        grades,
        tms
    ]
}

const getProfileExtendingGrades = (testimonies: Testimony[], core: ExamSubjects): Calculation => {
    const profileExtending = core?.profileExtendingSubject ?? '';
    let grades = [];
    for (let testimony of testimonies) {
        grades.push(testimony.grades.filter((g) => g.subject === profileExtending)[0])
    }
    return [
        grades,
        testimonies.map((testimony) => {
            let tm = {...testimony};
            tm.grades = tm.grades.filter((g) => g.subject !== profileExtending);
            return tm;
        })
    ];
}

const getAestaticGrades = (testimonies: Testimony[]): Calculation => {
    const subj = findAestaticSubject(testimonies[0]);
    let grades = [];
    for (let testimony of testimonies) {
        grades.push(testimony.grades.filter((g) => g.subject === subj)[0])
    }
    return [
        grades,
        testimonies.map((testimony) => {
            let tm = {...testimony};
            tm.grades = tm.grades.filter((g) => g.subject !== subj);
            return tm;
        })
    ];
}

const getHistoryGrades = (testimonies: Testimony[]): Calculation => {
    let historyGrades: ExtendedGrade[] = getAllGradesFromTestamonies(testimonies);
    historyGrades = historyGrades
        .filter((g) => g.subject === GetSubjectByName('Geschichte'));
    historyGrades = historyGrades.slice(0, 2);
    let tms = [...testimonies];
    for (let element of historyGrades) {
        const tm = tms[element.testimonyIndex];
        tm.grades = tm.grades.filter((g) => g.subject !== element.subject);
        tms[element.testimonyIndex] = tm;
    }
    return [
        historyGrades,
        tms
    ]
}

const getGeoWiPoGrades = (testimonies: Testimony[]): Calculation => {
    let grades: ExtendedGrade[] = getAllGradesFromTestamonies(testimonies);
    grades = grades
        .filter((g) => g.subject === GetSubjectByName('Geographie') || g.subject === GetSubjectByName('Wirtschaftspolitik'));
    grades = grades.slice(0, 2);
    let tms = [...testimonies];
    for (let element of grades) {
        const tm = tms[element.testimonyIndex];
        tm.grades = tm.grades.filter((g) => g.subject !== element.subject);
        tms[element.testimonyIndex] = tm;
    }
    return [
        grades,
        tms
    ]
}

const getReliPhiloGrades = (testimonies: Testimony[]): Calculation => {
    let grades: ExtendedGrade[] = getAllGradesFromTestamonies(testimonies);
    grades = grades
        .filter((g) => g.subject === GetSubjectByName('Religion') || g.subject === GetSubjectByName('Philosophie'));
    grades = grades.slice(0, 2);
    let tms = [...testimonies];
    for (let element of grades) {
        const tm = tms[element.testimonyIndex];
        tm.grades = tm.grades.filter((g) => g.subject !== element.subject);
        tms[element.testimonyIndex] = tm;
    }
    return [
        grades,
        tms
    ];
}

const getMissingCoreSubject = (core: (Subject|null)[]): Subject|null => {

    const deutsch = GetSubjectByName('Deutsch');
    const englisch = GetSubjectByName('Englisch');
    const mathe = GetSubjectByName('Mathematik');
    if (core.indexOf(deutsch) === -1) return deutsch;
    if (core.indexOf(englisch) === -1) return englisch;
    if (core.indexOf(mathe) === -1) return mathe;
    return mathe;
}


const getAllGradesFromTestamonies = (testamonies: Testimony[]): ExtendedGrade[] => {
    let grades: ExtendedGrade[] = [];
    for (let i=0; i<testamonies.length; i++) {
        grades = [...grades, ...(testamonies[i].grades.map((g) => ({...g, testimonyIndex: i})))]
    }
    for(let i = 0; i < grades.length; i++) {
        for(let j = 0; j < grades.length - 1; j++) {

            if(grades[j].grade > grades[j + 1].grade) {
                let swap = grades[j];
                grades[j] = grades[j + 1];
                grades[j + 1] = swap;
            }
        }
    }
    return grades;
}

const findAestaticSubject = (testimony: Testimony): Subject|null => {
    const kunst = GetSubjectByName('Kunst');
    const musik = GetSubjectByName('Musik');
    const dsp = GetSubjectByName('Darstellendes Spiel');
    if (testimony?.grades.filter((g) => g.subject === kunst).length > 0) return kunst;
    if (testimony?.grades.filter((g) => g.subject === musik).length > 0) return musik;
    if (testimony?.grades.filter((g) => g.subject === dsp).length > 0) return dsp;
    return dsp;
}

const removeWorstPEGradeFromGrades = (grades: Grade[]): Grade[] => {
    let reversed = grades.reverse();
    for (let grade of reversed) {
        if (grade.subject === GetSubjectByName('Sport')) {
            const index = reversed.indexOf(grade);
            return reversed.filter((_, i) => i !== index).reverse();
        }
    }
    return [];
}
