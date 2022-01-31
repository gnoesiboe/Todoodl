import { captureError } from '../utility/loggingUtilities';

export function get(key: string): string | null {
    return executeWithinTryCatch<string | null>(() =>
        localStorage.getItem(key),
    );
}

export function write(key: string, value: string) {
    executeWithinTryCatch(() => {
        localStorage.setItem(key, value);
    });
}

export function remove(key: string) {
    executeWithinTryCatch(() => localStorage.removeItem(key));
}

function executeWithinTryCatch<ReturnType>(
    execute: () => ReturnType,
): ReturnType | null {
    try {
        return execute();
    } catch (error) {
        captureError(error);

        return null;
    }
}
