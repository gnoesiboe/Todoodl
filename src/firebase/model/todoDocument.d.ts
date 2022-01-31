import { DocumentData } from 'firebase/auth';

export interface TodoDocument extends DocumentData {
    userUid: string;
    done: boolean;
    description: string;
    rawValue: string;
    project?: string;
    tags: string[];
    priority: string;
    start?: string;
    rank: number;
}
