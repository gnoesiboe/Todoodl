import { Todo, TodoCollection } from '../model/todo';
import { generateUuid } from '../utility/uuidUtilities';
import produce from 'immer';
import { getTodosFromStorage, writeTodosToStorage } from '../storage/todoStorage';
import { createInitialTodo } from '../model/factory/todoFactory';
import { normalizeTodo } from '../normalizer/todoNormalizer';

const listeners: Record<string, () => void> = {};

export function registerListener(onChange: () => void): string {
    const uuid = generateUuid();

    listeners[uuid] = onChange;

    return uuid;
}

export function unregisterListener(uuid: string) {
    delete listeners[uuid];
}

function emitChange() {
    Object.values(listeners).forEach((listener) => listener());
}

export function getAllTodos(): TodoCollection {
    let todos = getTodosFromStorage();

    if (todos.length === 0) {
        todos = [createInitialTodo()];
    }

    return todos.map((todo) => normalizeTodo(todo));
}

export function persist(newTodo: Todo, index: number): void {
    const newTodos = produce<TodoCollection>(getAllTodos(), (newTodos) => {
        newTodos.splice(index, 0, newTodo);
    });

    writeTodosToStorage(newTodos);

    emitChange();
}

export function remove(todo: Todo): void {
    const newTodos = produce<TodoCollection>(getAllTodos(), (newTodos) => {
        const index = newTodos.findIndex(({ uuid }) => uuid === todo.uuid);

        if (index === -1) {
            return;
        }

        newTodos.splice(index, 1);
    });

    writeTodosToStorage(newTodos);

    emitChange();
}

export function move(oldIndex: number, newIndex: number): void {
    const currentTodos = getAllTodos();
    const newTodos = produce<TodoCollection>(currentTodos, (newTodos) => {
        const todo = newTodos.splice(oldIndex, 1)[0];

        newTodos.splice(newIndex, 0, todo);
    });

    writeTodosToStorage(newTodos);

    emitChange();
}

export function update(uuid: string, changes: Partial<Todo>): void {
    const newTodos = produce<TodoCollection>(getAllTodos(), (newTodos) => {
        const existingTodoIndex = newTodos.findIndex((cursorTodo) => cursorTodo.uuid === uuid);

        if (existingTodoIndex === -1) {
            return;
        }

        newTodos[existingTodoIndex] = {
            ...newTodos[existingTodoIndex],
            ...changes,
        };
    });

    writeTodosToStorage(newTodos);

    emitChange();
}
