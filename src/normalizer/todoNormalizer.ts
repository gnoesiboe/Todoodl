import { Todo } from '../model/todo';
import { createInitialTodo } from '../model/factory/todoFactory';

export function normalizeTodo(partialTodo: Partial<Todo>): Todo {
    return {
        ...createInitialTodo(),
        ...partialTodo,
    };
}
