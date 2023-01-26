import { CalculationValues } from "../pages/calculator";
import { Grade, Testimony } from "../components/calculator/testimony/TestimonyTopLayer";
import { ExamSubjects } from "../components/calculator/ExamSubjectSelection";
import { GetAverage } from "./average";
import { GetAllScienceSubjects, GetSubjectByName, Subject } from "./subject";
import { MessageDescriptor, PrimitiveType } from "react-intl";
import { FormatXMLElementFn, Options } from "intl-messageformat";

/**
 * Translator type
 */
export type MessageTranslator = (descriptor: MessageDescriptor, values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>> | undefined, opts?: Options | undefined) => string;

export interface CalculateValueResult {
    /**
     * All points
     */
    points: number;
    /**
     * The final grade
     */
    grade: string;
    /**
     * The final calculation graph
     */
    calculationGraph: CalculationGraph;
}

interface ExtendedGrade extends Grade {
    /**
     * Testimony index
     */
    testimonyIndex: number;
}

export interface CalculationGraph {
    /**
     * The grade
     */
    grade?: Grade;
    /**
     * Description of the element
     */
    description: string;
    /**
     * All children of the element
     */
    children?: CalculationGraph[];
}

/**
 * Calculation type
 */
type Calculation = [Grade[], Testimony[]];

/**
 * Calculates the A levels result
 *
 * @param values All inserted values
 * @param formatMessage The translator
 * @constructor
 */
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

/**
 * Updates a children of CalculationGraph
 *
 * @param el The element that should be updated
 * @param new_el The new child
 */
const updateChildren = (el: CalculationGraph, new_el: CalculationGraph): CalculationGraph => {
    el.children = [...(el.children ?? []), new_el];
    return el;
}

/**
 * Gets all A level subject results
 *
 * @param testimonies All testimonies
 * @param core exam subjects
 */
const getALevelSubjGrades = (testimonies: Testimony[], core: ExamSubjects): Calculation => {
    const selectedCoreSubjects = (core?.coreSubjects ?? []);
    let grades = [];
    for (let subj of selectedCoreSubjects) {
        for (let testimony of testimonies) {
            grades.push(testimony.grades.filter((g) => g.subject?.name === subj?.name)[0])
        }
    }
    for (let testimony of testimonies) {
        grades.push(testimony.grades.filter((g) => g.subject?.name === core.profileSubject?.name)[0]);
    }
    let tms: Testimony[] = [];
    for (let subj of selectedCoreSubjects) {
        tms = testimonies.map((testimony) => {
            let tm = {...testimony};
            tm.grades = tm.grades.filter((g) => g.subject?.name !== subj?.name);
            return tm;
        })
    }
    tms = testimonies.map((testimony) => {
        let tm = {...testimony};
        tm.grades = tm.grades.filter((g) => g.subject?.name !== core.profileSubject?.name);
        return tm;
    })
    return [
        grades,
        tms
    ];
}

/**
 * Gets extra core subject grades
 *
 * @param testimonies All testimonies
 * @param core exam subjects
 */
const extraCoreSubjectGrades = (testimonies: Testimony[], core: ExamSubjects): Calculation => {
    const selectedCoreSubjects = (core?.coreSubjects ?? []);
    const missingCoreSubject = getMissingCoreSubject(selectedCoreSubjects);
    let grades = [];
    for (let testimony of testimonies) {
        grades.push(testimony.grades.filter((g) => g.subject?.name === missingCoreSubject?.name)[0])
    }
    return [
        grades,
        testimonies.map((testimony) => {
            let tm = {...testimony};
            tm.grades = tm.grades.filter((g) => g.subject?.name !== missingCoreSubject?.name);
            return tm;
        })
    ]
}

/**
 * Gets all science grades
 *
 * @param testimonies All testimonies
 * @param core exam subjects
 */
const scienceSubjectGrades = (testimonies: Testimony[], core: ExamSubjects): Calculation => {
    const scienceSubjects = GetAllScienceSubjects();
    if (scienceSubjects.indexOf(core?.profileSubject ?? null) > -1) {
        return [[], testimonies];
    }
    const scienceGrades: ExtendedGrade[] = getAllGradesFromTestamonies(testimonies)
        .filter((g) => scienceSubjects.map((s) => s?.name).indexOf(g.subject?.name) > -1);
    let grades = [];
    const elements = scienceGrades.slice(0, 4);
    grades.push(...(elements as Grade[]));
    let tms = [...testimonies];
    for (let element of elements) {
        const tm = tms[element.testimonyIndex];
        tm.grades = tm.grades.filter((g) => g.subject?.name !== element.subject?.name);
        tms[element.testimonyIndex] = tm;
    }
    return [
        grades,
        tms
    ]
}

/**
 * Gets all profile extending grades
 *
 * @param testimonies All testimonies
 * @param core exam subjects
 */
const getProfileExtendingGrades = (testimonies: Testimony[], core: ExamSubjects): Calculation => {
    const profileExtending = core?.profileExtendingSubject?.name ?? '';
    let grades = [];
    for (let testimony of testimonies) {
        grades.push(testimony.grades.filter((g) => g.subject?.name === profileExtending)[0])
    }
    return [
        grades,
        testimonies.map((testimony) => {
            let tm = {...testimony};
            tm.grades = tm.grades.filter((g) => g.subject?.name !== profileExtending);
            return tm;
        })
    ];
}

/**
 * Gets all aesatic subject results
 *
 * @param testimonies All testimonies
 */
const getAestaticGrades = (testimonies: Testimony[]): Calculation => {
    const subj = findAestaticSubject(testimonies[0]);
    let grades = [];
    for (let testimony of testimonies) {
        grades.push(testimony.grades.filter((g) => g.subject?.name === subj?.name)[0])
    }
    return [
        grades,
        testimonies.map((testimony) => {
            let tm = {...testimony};
            tm.grades = tm.grades.filter((g) => g.subject?.name !== subj?.name);
            return tm;
        })
    ];
}

/**
 * Gets all history grades
 *
 * @param testimonies All testimonies
 */
const getHistoryGrades = (testimonies: Testimony[]): Calculation => {
    let historyGrades: ExtendedGrade[] = getAllGradesFromTestamonies(testimonies);
    historyGrades = historyGrades
        .filter((g) => g.subject?.name === GetSubjectByName('Geschichte')?.name);
    historyGrades = historyGrades.slice(0, 2);
    let tms = [...testimonies];
    for (let element of historyGrades) {
        const tm = tms[element.testimonyIndex];
        tm.grades = tm.grades.filter((g) => g.subject?.name !== element.subject?.name);
        tms[element.testimonyIndex] = tm;
    }
    return [
        historyGrades,
        tms
    ]
}

/**
 * Gets all geo / wipo grades
 *
 * @param testimonies All testimonies
 */
const getGeoWiPoGrades = (testimonies: Testimony[]): Calculation => {
    let grades: ExtendedGrade[] = getAllGradesFromTestamonies(testimonies);
    grades = grades
        .filter((g) => g.subject?.name === 'Geographie' || g.subject?.name === 'Wirtschaftspolitik');
    grades = grades.slice(0, 2);
    let tms = [...testimonies];
    for (let element of grades) {
        const tm = tms[element.testimonyIndex];
        tm.grades = tm.grades.filter((g) => g.subject?.name !== element.subject?.name);
        tms[element.testimonyIndex] = tm;
    }
    return [
        grades,
        tms
    ]
}

/**
 * Gets all reli / philo grades
 *
 * @param testimonies All testimonies
 */
const getReliPhiloGrades = (testimonies: Testimony[]): Calculation => {
    let grades: ExtendedGrade[] = getAllGradesFromTestamonies(testimonies);
    grades = grades
        .filter((g) => g.subject?.name === 'Religion' || g.subject?.name === 'Philosophie');
    grades = grades.slice(0, 2);
    let tms = [...testimonies];
    for (let element of grades) {
        const tm = tms[element.testimonyIndex];
        tm.grades = tm.grades.filter((g) => g.subject?.name !== element.subject?.name);
        tms[element.testimonyIndex] = tm;
    }
    return [
        grades,
        tms
    ];
}

/**
 * Gets the missing core subject
 *
 * @param core All core subjects
 */
const getMissingCoreSubject = (core: (Subject|null)[]): Subject|null => {

    const deutsch = GetSubjectByName('Deutsch');
    const englisch = GetSubjectByName('Englisch');
    const mathe = GetSubjectByName('Mathematik');
    if (core.map((s) => s?.name).indexOf(deutsch?.name) === -1) return deutsch;
    if (core.map((s) => s?.name).indexOf(englisch?.name) === -1) return englisch;
    if (core.map((s) => s?.name).indexOf(mathe?.name) === -1) return mathe;
    return mathe;
}

/**
 * Gets all grades from testimonies
 *
 * @param testamonies the testimonies
 */
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

/**
 * Gets the selected aestatic subject
 *
 * @param testimony The testimony that contains the subject
 */
const findAestaticSubject = (testimony: Testimony): Subject|null => {
    const kunst = GetSubjectByName('Kunst');
    const musik = GetSubjectByName('Musik');
    const dsp = GetSubjectByName('Darstellendes Spiel');
    if (testimony?.grades.filter((g) => g.subject?.name === kunst?.name).length > 0) return kunst;
    if (testimony?.grades.filter((g) => g.subject?.name === musik?.name).length > 0) return musik;
    if (testimony?.grades.filter((g) => g.subject?.name === dsp?.name).length > 0) return dsp;
    return dsp;
}

/**
 * Filters out the worst PE grade
 *
 * @param grades All grades
 */
const removeWorstPEGradeFromGrades = (grades: Grade[]): Grade[] => {
    let reversed = grades.reverse();
    for (let grade of reversed) {
        if (grade.subject?.name === GetSubjectByName('Sport')?.name) {
            const index = reversed.indexOf(grade);
            return reversed.filter((_, i) => i !== index).reverse();
        }
    }
    return [];
}
