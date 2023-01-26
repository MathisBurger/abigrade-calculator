
export enum SubjectType {
    Science,
    Language,
    Society,
    Others
}

export interface Subject {
    /**
     * name of a subject
     */
    name: string;
    /**
     * if it is a core subject
     */
    coreSubject: boolean;
    /**
     * The subject type
     */
    type: SubjectType;
}

/**
 * All subjects
 */
const SUBJECTS: Subject[] = [
    {
        name: 'Deutsch',
        coreSubject: true,
        type: SubjectType.Language
    },
    {
        name: 'Englisch',
        coreSubject: true,
        type: SubjectType.Language
    },
    {
        name: 'Französisch',
        coreSubject: true,
        type: SubjectType.Language
    },
    {
        name: 'Latein',
        coreSubject: true,
        type: SubjectType.Language
    },
    {
        name: 'Spanisch',
        coreSubject: false,
        type: SubjectType.Language
    },
    {
        name: 'Kunst',
        coreSubject: false,
        type: SubjectType.Others
    },
    {
        name: 'Musik',
        coreSubject: false,
        type: SubjectType.Others
    },
    {
        name: 'Darstellendes Spiel',
        coreSubject: false,
        type: SubjectType.Others
    },
    {
        name: 'Mathematik',
        coreSubject: true,
        type: SubjectType.Science
    },
    {
        name: 'Biologie',
        coreSubject: false,
        type: SubjectType.Science
    },
    {
        name: 'Physik',
        coreSubject: false,
        type: SubjectType.Science
    },
    {
        name: 'Chemie',
        coreSubject: false,
        type: SubjectType.Science
    },
    {
        name: 'Informatik',
        coreSubject: false,
        type: SubjectType.Science
    },
    {
        name: 'Geschichte',
        coreSubject: false,
        type: SubjectType.Society
    },
    {
        name: 'Geographie',
        coreSubject: false,
        type: SubjectType.Society
    },
    {
        name: 'Wirtschaftspolitik',
        coreSubject: false,
        type: SubjectType.Society
    },
    {
        name: 'Religion',
        coreSubject: false,
        type: SubjectType.Society
    },
    {
        name: 'Philosophie',
        coreSubject: false,
        type: SubjectType.Society
    },
    {
        name: 'Sport',
        coreSubject: false,
        type: SubjectType.Others
    }
];

/**
 * Gets all subjects
 *
 * @constructor
 */
export const GetAllSubjects = (): Subject[] => SUBJECTS;

/**
 * Gets all core subjects
 *
 * @constructor
 */
export const GetAllCoreSubjects = (): Subject[] => SUBJECTS.filter((s) => s.coreSubject);

/**
 * Gets a subject by name
 *
 * @param name The name of the subject
 *
 * @constructor
 */
export const GetSubjectByName = (name: string): Subject|null => SUBJECTS.filter((s) => s.name === name)[0] ?? null;

/**
 * Gets all science subjects
 *
 * @constructor
 */
export const GetAllScienceSubjects = (): (Subject|null)[] => SUBJECTS.filter((s) => s.type === SubjectType.Science);
