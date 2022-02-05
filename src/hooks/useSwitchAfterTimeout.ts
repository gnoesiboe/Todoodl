import { useEffect, useState } from 'react';

export default function useSwitchAfterTimeout(initialValue: boolean, timeout: number): boolean {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        const handle = setTimeout(() => {
            setState((currentValue) => !currentValue);
        }, timeout);

        return () => clearTimeout(handle);
    }, [setState, timeout]);

    return state;
}
