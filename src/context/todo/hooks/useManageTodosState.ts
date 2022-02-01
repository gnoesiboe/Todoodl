import { Todo, TodoCollection } from '../../../model/todo';
import { useCallback, useEffect } from 'react';
import { fetchAllTodos } from '../../../firebase/repository/todoRepository';
import useAsyncAction from '../../../hooks/useAsyncAction';
import { writeTodosToStorage } from '../../../storage/todoStorage';
import usePersistNewTodo from './usePersistNewTodo';
import useUpdateExistingTodo from './useUpdateExistingTodo';
import useRemoveTodo from './useRemoveTodo';
import useMoveTodo from './useMoveTodo';
import { useLoggedInUser } from '../../../auth/AuthContext';

export type GetAllTodosHandler = () => Promise<void>;
export type PersistTodoHandler = (newTodo: Todo, index: number) => Promise<void>;
export type UpdateTodoHandler = (uuid: string, changes: Partial<Todo>) => Promise<void>;
export type RemoveTodoHandler = (todo: Todo) => Promise<void>;
export type MoveTodoHandler = (oldIndex: number, newIndex: number) => Promise<void>;

type TodosState = {
    loading: boolean;
    todos: TodoCollection | null;
    error: Error | unknown | null;
};

type TodoMutators = {
    getAll: GetAllTodosHandler;
    persist: PersistTodoHandler;
    update: UpdateTodoHandler;
    remove: RemoveTodoHandler;
    move: MoveTodoHandler;
};

export type Output = TodosState & TodoMutators;

export default function useManageTodosState(): Output {
    const user = useLoggedInUser();

    const fetchAllUsersTodos = useCallback(() => {
        return fetchAllTodos(user);
    }, [user]);

    const {
        execute: getAll,
        loading,
        error,
        result: todos,
        overrideResult: setTodos,
    } = useAsyncAction<TodoCollection | null>(fetchAllUsersTodos);

    useEffect(() => {
        getAll();
    }, [getAll]);

    // @todo remove when local storage is no longer required
    useEffect(() => {
        if (todos) {
            writeTodosToStorage(todos);
        }
    }, [todos]);

    const persist = usePersistNewTodo(todos, setTodos);
    const update = useUpdateExistingTodo(todos, setTodos);
    const remove = useRemoveTodo(todos, setTodos);
    const move = useMoveTodo(todos, setTodos);

    return {
        loading,
        todos,
        error,
        getAll,
        persist,
        update,
        remove,
        move,
    };
}
