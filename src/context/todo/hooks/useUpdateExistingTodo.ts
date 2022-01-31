import { useCallback } from 'react';
import produce from 'immer';
import { TodoCollection } from '../../../model/todo';
import { UpdateTodoHandler } from './useManageTodosState';

export default function useUpdateExistingTodo(
    todos: TodoCollection | null,
    setTodos: (todos: TodoCollection | null) => void,
): UpdateTodoHandler {
    return useCallback<UpdateTodoHandler>(
        async (uuid, changes) => {
            const newTodos = produce<TodoCollection | null>(todos, (newTodos) => {
                if (newTodos === null) {
                    throw new Error('Expecting there to be todos at this point');
                }

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

            // @todo push changes to backend
        },
        [setTodos, todos],
    );
}
