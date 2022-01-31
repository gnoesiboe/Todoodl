import { Todo } from '../todo';
import { generateUuid } from '../../utility/uuidUtilities';
import { generateTodoUpdatesFromRawValue } from '../../handler/todoUpdateHandler';

export function createInitialTodo(): Todo {
    return {
        uuid: generateUuid(),
        done: false,
        description: '',
        tags: [],
        project: null,
        rawValue: '',
        priority: 'should',
        start: null,
    };
}

export function createTodoFromRawValue(rawValue: string): Todo {
    return {
        uuid: generateUuid(),
        done: false,
        description: rawValue,
        tags: [],
        project: null,
        rawValue,
        priority: 'should',
        start: null,
        ...generateTodoUpdatesFromRawValue(rawValue),
    };
}
