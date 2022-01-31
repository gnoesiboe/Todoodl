import { useCallback } from 'react';
import produce from 'immer';
import { TodoCollection } from '../../../model/todo';
import { PersistTodoHandler } from './useManageTodosState';

export default function usePersistNewTodo(
    todos: TodoCollection | null,
    setTodos: (todos: TodoCollection | null) => void,
): PersistTodoHandler {
    return useCallback<PersistTodoHandler>(
        async (newTodo, index) => {
            const newTodos = produce<TodoCollection | null>(todos, (newTodos) => {
                if (newTodos === null) {
                    throw new Error('Expecting there to be todos at this point');
                }

                newTodos.splice(index, 0, newTodo);
            });

            setTodos(newTodos);

            // @todo persist todo to backend
        },
        [setTodos, todos],
    );
}
