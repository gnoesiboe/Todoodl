import { useCallback } from 'react';
import produce from 'immer';
import { TodoCollection } from '../../../model/todo';
import { RemoveTodoHandler } from './useManageTodosState';

export default function useRemoveTodo(
    todos: TodoCollection | null,
    setTodos: (todos: TodoCollection | null) => void,
): RemoveTodoHandler {
    return useCallback<RemoveTodoHandler>(
        async (todo) => {
            const newTodos = produce<TodoCollection | null>(todos, (newTodos) => {
                if (newTodos === null) {
                    throw new Error('Expecting there to be todos at this point');
                }

                const index = newTodos.findIndex((cursorTodo) => cursorTodo.uuid === todo.uuid);

                if (index === -1) {
                    return;
                }

                newTodos.splice(index, 1);
            });

            setTodos(newTodos);

            // @todo push changes to backend
        },
        [setTodos, todos],
    );
}
