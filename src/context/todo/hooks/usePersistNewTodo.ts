import { useCallback } from 'react';
import produce from 'immer';
import { TodoCollection } from '../../../model/todo';
import { PersistTodoHandler } from './useManageTodosState';
import { persistTodo } from '../../../firebase/repository/todoRepository';
import { useLoggedInUser } from '../../../auth/AuthContext';

export default function usePersistNewTodo(
    todos: TodoCollection | null,
    setTodos: (todos: TodoCollection | null) => void,
): PersistTodoHandler {
    const user = useLoggedInUser();

    return useCallback<PersistTodoHandler>(
        async (newTodo, index) => {
            const newTodos = produce<TodoCollection | null>(todos, (newTodos) => {
                if (newTodos === null) {
                    throw new Error('Expecting there to be todos at this point');
                }

                newTodos.splice(index, 0, newTodo);
            });

            // update in-memory state
            setTodos(newTodos);

            // update server state
            // @todo remove todo again when an error occurs + notify user
            await persistTodo(newTodo, user);
        },
        [setTodos, todos, user],
    );
}
