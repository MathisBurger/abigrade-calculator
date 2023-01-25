
export enum SubjectType {
    Science,
    Language,
    Society,
    Others
}

export interface Subject {
    name: string;
    coreSubject: boolean;
    type: SubjectType;
}

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
        name: 'Mathe',
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
    }
];

export const GetAllSubjects = (): Subject[] => SUBJECTS;

export const GetAllCoreSubjects = (): Subject[] => SUBJECTS.filter((s) => s.coreSubject);

export const GetSubjectByName = (name: string): Subject|null => SUBJECTS.filter((s) => s.name === name)[0] ?? null;
