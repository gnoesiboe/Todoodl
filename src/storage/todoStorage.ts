import { get, write } from './localStorage';
import { PartialTodoCollection, Todo } from '../model/todo';

const namespace = 'todos';

export function writeTodosToStorage(todos: PartialTodoCollection): void {
    const serializedTodos = JSON.stringify(todos);

    write(namespace, serializedTodos);
}

type PartialTodoWithStringDates = Omit<Partial<Todo>, 'start'> & {
    start?: string;
};

export function getTodosFromStorage(): PartialTodoCollection {
    const serializedTodos = get(namespace);

    const unserializedTodos = serializedTodos ? JSON.parse(serializedTodos) : [];

    return unserializedTodos.map((todo: PartialTodoWithStringDates) => {
        const start = todo.start ? new Date(todo.start) : null;

        return {
            ...todo,
            start,
        } as Partial<Todo>;
    });
}
