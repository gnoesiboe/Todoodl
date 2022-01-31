import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import {
    getAllTodos,
    registerListener,
    unregisterListener,
} from '../../../../repository/todoRepository';
import { TodoCollection } from '../../../../model/todo';

export default function useFetchTodosOnRepositoryChange(
    setTodos: Dispatch<SetStateAction<TodoCollection>>,
) {
    const fetchTodos = useCallback(() => {
        setTodos(getAllTodos());
    }, [setTodos]);

    useEffect(() => {
        fetchTodos();

        const key = registerListener(() => fetchTodos());

        return () => unregisterListener(key);
    }, [fetchTodos]);
}
