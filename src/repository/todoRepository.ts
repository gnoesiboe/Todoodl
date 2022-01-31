import { TodoCollection } from '../model/todo';
import { getTodosFromStorage } from '../storage/todoStorage';
import { createInitialTodo } from '../model/factory/todoFactory';
import { normalizeTodo } from '../normalizer/todoNormalizer';

export async function getAllTodos(): Promise<TodoCollection> {
    let todos = getTodosFromStorage();

    if (todos.length === 0) {
        todos = [createInitialTodo()];
    }

    return todos.map((todo) => normalizeTodo(todo));
}
