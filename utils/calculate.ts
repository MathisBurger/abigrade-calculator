import {CalculationValues} from "../pages/calculator";
import {Grade, Testimony} from "../components/calculator/testimony/TestimonyTopLayer";
import {ExamSubjects} from "../components/calculator/ExamSubjectSelection";
import {GetAverage} from "./average";
import {GetAllScienceSubjects, GetSubjectByName, Subject} from "./subject";

export interface CalculateValueResult {
    points: number;
    grade: string;
    combination: Grade[];
}

interface ExtendedGrade extends Grade {
    testimonyIndex: number;
}

type Calculation = [Grade[], Testimony[]];


export const CalculateALevelsResult = (values: CalculationValues): CalculateValueResult => {

    let testimonies = values.testomonies ?? [];
    let points = 0;
    for (let grade of values.aLevelsResults.real) {
        points += (grade*5);
    }
    const [aLevelGrades, aLevelSubjTestimonies] =
        getALevelSubjGrades(testimonies, values.examSubjects!);
    const [missingCoreGrades, missingCoreSubjTestimonies] =
        extraCoreSubjectGrades(aLevelSubjTestimonies, values.examSubjects!);
    const [scienceGrades, scienceGradesTestimonies] =
        scienceSubjectGrades(missingCoreSubjTestimonies, values.examSubjects!);
    const [profileExtendingGrades, profileExtendingTestimonies] =
        getProfileExtendingGrades(scienceGradesTestimonies, values.examSubjects!);
    const [aestaticGrades, aestaticTestamonies] =
        getAestaticGrades(profileExtendingTestimonies);
    const [historyGrades, historyTestimonies] =
        getHistoryGrades(aestaticTestamonies);
    const [geoWipoGrades, geoWipoTestimonies] =
        getGeoWiPoGrades(historyTestimonies);
    const [reliPhiloGrades, reliPhiloTestimonies] =
        getReliPhiloGrades(geoWipoTestimonies);

    const grades = [
        ...aLevelGrades, ...missingCoreGrades,
        ...scienceGrades, ...profileExtendingGrades,
        ...aestaticGrades, ...historyGrades,
        ...geoWipoGrades, ...reliPhiloGrades
    ];
    const resultsWithAllPE = getAllGradesFromTestamonies(reliPhiloTestimonies);
    const withoutPE = removeWorstPEGradeFromGrades(resultsWithAllPE);
    const missing = 36 - grades.length;
    const allGrades = [...grades, ...(withoutPE.splice(0, missing))];

    let blockTwoPoints = 0;
    for (let grade of allGrades) {
        blockTwoPoints += grade?.grade ?? 0;
    }
    points += blockTwoPoints * (40/36);

    return {
        grade: GetAverage(points),
        points,
        combination : allGrades
    }
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
