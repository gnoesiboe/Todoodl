import { Todo } from '../model/todo';
import { createInitialTodo } from '../model/factory/todoFactory';

// @todo can be removed?
export function normalizeTodo(partialTodo: Partial<Todo>): Todo {
    return {
        ...createInitialTodo(),
        ...partialTodo,
    };
}
