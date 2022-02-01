import { useCallback } from 'react';
import produce from 'immer';
import { TodoCollection } from '../../../model/todo';
import { UpdateTodoHandler } from './useManageTodosState';
import { persistTodo } from '../../../firebase/repository/todoRepository';
import { useLoggedInUser } from '../../../auth/AuthContext';

export default function useUpdateExistingTodo(
    todos: TodoCollection | null,
    setTodos: (todos: TodoCollection | null) => void,
): UpdateTodoHandler {
    const user = useLoggedInUser();

    return useCallback<UpdateTodoHandler>(
        async (uuid, changes) => {
            if (!todos) {
                throw new Error('Expecting there to be todos at this point');
            }

            // update in-memory state
            const newTodos = produce<TodoCollection>(todos, (newTodos) => {
                const existingTodoIndex = newTodos.findIndex((cursorTodo) => cursorTodo.uuid === uuid);

                if (existingTodoIndex === -1) {
                    return;
                }

                newTodos[existingTodoIndex] = {
                    ...newTodos[existingTodoIndex],
                    ...changes,
                };
            });
            setTodos(newTodos);

            // update server state
            const existingTodoIndex = newTodos.findIndex((cursorTodo) => cursorTodo.uuid === uuid);
            const updatedTodo =
                existingTodoIndex !== -1
                    ? {
                          ...todos[existingTodoIndex],
                          ...changes,
                      }
                    : null;

            if (updatedTodo) {
                // @todo instead of overriding the entire todo, only push updates
                await persistTodo(updatedTodo, user);
            }
        },
        [setTodos, todos, user],
    );
}
