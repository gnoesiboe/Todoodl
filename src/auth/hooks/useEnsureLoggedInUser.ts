import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { login, OnAuthChangeHandler, registerAuthListener } from '../../firebase/firebase';

export default function useEnsureLoggedInUser() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const onChange: OnAuthChangeHandler = (user) => {
            setUser(user);

            if (!user) {
                login();
            }
        };

        registerAuthListener(onChange);
    }, []);

    return user;
}
