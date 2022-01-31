import { createContext, FC, useContext } from 'react';
import useManageTodosState, { Output } from './hooks/useManageTodosState';

type ContextValue = Output;

const TodoContext = createContext<ContextValue>({
    loading: false,
    todos: null,
    error: null,
    getAll: async () => {},
    persist: async () => {},
    update: async () => {},
    remove: async () => {},
    move: async () => {},
});

export const TodoContextProvider: FC = ({ children }) => {
    const value = useManageTodosState();

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export function useTodos(): Pick<ContextValue, 'todos' | 'loading' | 'getAll'> {
    const { todos, loading, getAll } = useContext(TodoContext);

    return { todos, loading, getAll };
}

export function useManageTodos(): Pick<ContextValue, 'persist' | 'update' | 'remove' | 'move'> {
    const { persist, update, remove, move } = useContext(TodoContext);

    return { persist, update, remove, move };
}
