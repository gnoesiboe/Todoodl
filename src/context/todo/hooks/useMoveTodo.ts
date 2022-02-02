import { useCallback } from 'react';
import { Todo, TodoCollection } from '../../../model/todo';
import { MoveTodoHandler } from './useManageTodosState';
import { resolveRankForIndex } from '../utility/todoRankResolver';
import { sortTodosByRank } from '../../../utility/todoSortingUtilities';
import { persistTodo } from '../../../firebase/repository/todoRepository';
import { useLoggedInUser } from '../../../auth/AuthContext';

export default function useMoveTodo(
    todos: TodoCollection | null,
    setTodos: (todos: TodoCollection | null) => void,
): MoveTodoHandler {
    const user = useLoggedInUser();

    return useCallback<MoveTodoHandler>(
        async (oldIndex, newIndex) => {
            if (!todos) {
                throw new Error('Expecting todos to be available at this point');
            }

            const newTodos = [...todos];
            const todo = newTodos.splice(oldIndex, 1)[0];

            const newRank = resolveRankForIndex(newTodos, newIndex);

            const rankedTodo: Todo = {
                ...todo,
                rank: newRank,
            };

            // in-memory update
            setTodos(sortTodosByRank([...newTodos, rankedTodo]));

            // persist to server
            await persistTodo(rankedTodo, user);
        },
        [setTodos, todos, user],
    );
}
