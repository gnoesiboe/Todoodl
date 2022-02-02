import { useCallback } from 'react';
import { Todo, TodoCollection } from '../../../model/todo';
import { PersistTodoHandler } from './useManageTodosState';
import { persistTodo } from '../../../firebase/repository/todoRepository';
import { useLoggedInUser } from '../../../auth/AuthContext';
import { resolveRankForIndex } from '../utility/todoRankResolver';
import { sortTodosByRank } from '../../../utility/todoSortingUtilities';

export default function usePersistNewTodo(
    todos: TodoCollection | null,
    setTodos: (todos: TodoCollection | null) => void,
): PersistTodoHandler {
    const user = useLoggedInUser();

    return useCallback<PersistTodoHandler>(
        async (newTodo, newTodoIndex) => {
            if (todos === null) {
                throw new Error('Expecting there to be todos at this point');
            }

            const rank = resolveRankForIndex(todos, newTodoIndex);
            const rankedNewTodo: Todo = { ...newTodo, rank };

            const newTodos = sortTodosByRank([...todos, rankedNewTodo]);

            // update in-memory state
            setTodos(newTodos);

            // update server state
            // @todo remove todo again when an error occurs + notify user
            await persistTodo(rankedNewTodo, user);
        },
        [setTodos, todos, user],
    );
}
