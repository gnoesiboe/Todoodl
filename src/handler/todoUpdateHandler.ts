import { allPriorities, Todo, TodoPriority } from '../model/todo';
import { resolveDateForIndicator } from '../utility/dateTimeUtilities';

function extractFirstLine(rawValue: string): string {
    const [firstLine] = rawValue.split('\n');

    return firstLine;
}

function resolveProject(rawValue: string): string | null {
    const projectMatch = rawValue.match(/^\[([a-z0-9]+)]/i);

    if (!projectMatch) {
        return null;
    }

    return projectMatch[1] ?? null;
}

function resolveTags(rawValue: string): string[] {
    const tags = extractFirstLine(rawValue).match(/#([^ ]+)/gi) || [];

    return tags.map((tag) => tag.replace('#', ''));
}

function resolvePriority(rawValue: string): TodoPriority | null {
    const match = extractFirstLine(rawValue).match(/@([^\s]+)/);

    if (!match) {
        return null;
    }

    const possiblePriority = match[1];

    // @ts-ignore → this is actually the check if it is
    if (allPriorities.includes(possiblePriority)) {
        return possiblePriority as TodoPriority;
    }

    return null;
}

function resolveStart(rawValue: string): Date | null {
    const match = extractFirstLine(rawValue).match(/d:([^\s]+)/i);

    if (!match) {
        return null;
    }

    return resolveDateForIndicator(match[1]);
}

export function generateTodoUpdatesFromRawValue(rawValue: string): Partial<Todo> {
    const project = resolveProject(rawValue);
    const tags = resolveTags(rawValue);
    const priority = resolvePriority(rawValue);
    const start = resolveStart(rawValue);

    const withoutPrioritiesAndDeadlineIndicators = rawValue
        .replace(/@[^\s]+/g, '')
        .replace(/d:[^\s]+/gi, '')
        .trim();

    const out: Partial<Todo> = {
        rawValue: withoutPrioritiesAndDeadlineIndicators,
        description: withoutPrioritiesAndDeadlineIndicators,
        project,
        tags,
    };

    if (start) {
        out['start'] = start;
    }

    if (priority) {
        out['priority'] = priority;
    }

    return out;
}
