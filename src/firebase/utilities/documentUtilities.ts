import { DocumentData } from 'firebase/firestore';

export function removeFieldsWithUndefinedValues<DocumentType extends DocumentData>(input: DocumentType): void {
    const keys = Object.keys(input) as Array<keyof DocumentType>;

    keys.forEach((key) => {
        const value = input[key];

        if (value === undefined) {
            delete input[key];
        }
    });
}
