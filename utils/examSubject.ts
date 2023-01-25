import {ExamSubjects} from "../components/calculator/ExamSubjectSelection";
import {Subject, SubjectType} from "./subject";


export const ValidateExamSubjectsComplete = (subjects: ExamSubjects): boolean => {
    return ScienceSubjectExists(subjects)
    && LanguageSubjectExists(subjects)
    && SocietySubjectExists(subjects)
    && EnoughCoreSubjects(subjects);
}

export const ScienceSubjectExists = (subjects: ExamSubjects) => GetAllExamSubjectsAsArray(subjects)
    .filter((s) => s?.type === SubjectType.Science).length > 0;

export const LanguageSubjectExists = (subjects: ExamSubjects) => GetAllExamSubjectsAsArray(subjects)
    .filter((s) => s?.type === SubjectType.Language).length > 0;

export const SocietySubjectExists = (subjects: ExamSubjects) => GetAllExamSubjectsAsArray(subjects)
    .filter((s) => s?.type === SubjectType.Society).length > 0;

export const EnoughCoreSubjects = (subjects: ExamSubjects) => GetAllExamSubjectsAsArray(subjects)
    .filter((s) => s?.coreSubject).length === 2;

const GetAllExamSubjectsAsArray = (examSubjects: ExamSubjects): (Subject|null)[] => {
    return [
        examSubjects.profileSubject ?? null,
        examSubjects.oralSubject ?? null,
        ...(examSubjects.coreSubjects ?? [])
    ];
}
