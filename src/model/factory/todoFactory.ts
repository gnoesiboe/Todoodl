import { Todo } from '../todo';
import { generateUuid } from '../../utility/uuidUtilities';
import { generateTodoUpdatesFromRawValue } from '../../handler/todoUpdateHandler';

export function createInitialTodo(): Todo {
    return {
        uuid: generateUuid(),
        doneAt: null,
        description: '',
        tags: [],
        project: null,
        rawValue: '',
        priority: 'should',
        start: null,
        due: null,
        rank: 0,
    };
}

export function createTodoFromRawValue(rawValue: string): Todo {
    return {
        uuid: generateUuid(),
        doneAt: null,
        description: rawValue,
        tags: [],
        project: null,
        rawValue,
        priority: 'should',
        start: null,
        due: null,
        rank: 0,
        ...generateTodoUpdatesFromRawValue(rawValue),
    };
}
