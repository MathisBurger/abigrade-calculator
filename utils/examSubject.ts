import {ExamSubjects} from "../components/calculator/ExamSubjectSelection";
import {Subject, SubjectType} from "./subject";

/**
 * Validates if exam subjects are complete
 *
 * @param subjects The subjects
 * @constructor
 */
export const ValidateExamSubjectsComplete = (subjects: ExamSubjects): boolean => {
    return ScienceSubjectExists(subjects)
    && LanguageSubjectExists(subjects)
    && SocietySubjectExists(subjects)
    && EnoughCoreSubjects(subjects);
}

/**
 * Checks if science subjects exists
 *
 * @param subjects All subjects
 *
 * @constructor
 */
export const ScienceSubjectExists = (subjects: ExamSubjects) => GetAllExamSubjectsAsArray(subjects)
    .filter((s) => s?.type === SubjectType.Science).length > 0;

/**
 * Checks if language subjects exists
 *
 * @param subjects All subjects
 *
 * @constructor
 */
export const LanguageSubjectExists = (subjects: ExamSubjects) => GetAllExamSubjectsAsArray(subjects)
    .filter((s) => s?.type === SubjectType.Language).length > 0;

/**
 * Checks if society subjects exists
 *
 * @param subjects All subjects
 *
 * @constructor
 */
export const SocietySubjectExists = (subjects: ExamSubjects) => GetAllExamSubjectsAsArray(subjects)
    .filter((s) => s?.type === SubjectType.Society).length > 0;

/**
 * Checks if core subjects exists
 *
 * @param subjects All subjects
 *
 * @constructor
 */
export const EnoughCoreSubjects = (subjects: ExamSubjects) => GetAllExamSubjectsAsArray(subjects)
    .filter((s) => s?.coreSubject).length === 2;

/**
 * gets all exam subjects as array
 *
 * @param examSubjects All subjects
 *
 * @constructor
 */
const GetAllExamSubjectsAsArray = (examSubjects: ExamSubjects): (Subject|null)[] => {
    return [
        examSubjects.profileSubject ?? null,
        examSubjects.oralSubject ?? null,
        ...(examSubjects.coreSubjects ?? [])
    ];
}
