import { useCallback } from 'react';
import produce from 'immer';
import { TodoCollection } from '../../../model/todo';
import { MoveTodoHandler } from './useManageTodosState';

export default function useMoveTodo(
    todos: TodoCollection | null,
    setTodos: (todos: TodoCollection | null) => void,
): MoveTodoHandler {
    return useCallback<MoveTodoHandler>(
        async (oldIndex, newIndex) => {
            const newTodos = produce<TodoCollection | null>(todos, (newTodos) => {
                if (newTodos === null) {
                    throw new Error('Expecting there to be todos at this point');
                }

                const todo = newTodos.splice(oldIndex, 1)[0];

                newTodos.splice(newIndex, 0, todo);
            });

            setTodos(newTodos);

            // @todo push changes to backend
        },
        [setTodos, todos],
    );
}
