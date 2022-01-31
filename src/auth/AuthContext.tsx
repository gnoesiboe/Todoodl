import { createContext, FC, useContext } from 'react';
import { User } from 'firebase/auth';
import useEnsureLoggedInUser from './hooks/useEnsureLoggedInUser';

type ContextValue = {
    user: User | null;
};

const AuthContext = createContext<ContextValue>({
    user: null,
});

export const AuthContextProvider: FC = ({ children }) => {
    const user = useEnsureLoggedInUser();

    return <AuthContext.Provider value={{ user }}>{user && children}</AuthContext.Provider>;
};

export function useLoggedInUser(): User | null {
    const { user } = useContext(AuthContext);

    return user;
}
