import { v4 as createV4Uuid } from 'uuid';

export function generateUuid(): string {
    return createV4Uuid();
}
