import { DocumentData } from 'firebase/auth';

export interface TodoDocument extends DocumentData {
    userUid: string;
    doneAt?: string;
    description: string;
    rawValue: string;
    project?: string;
    tags: string[];
    priority: string;
    start?: string;
    due?: string;
    rank: number;
}
