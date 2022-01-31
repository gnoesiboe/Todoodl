import { useEffect, useRef } from 'react';

export default function useScrollIntoView<RefType extends HTMLElement>(active: boolean) {
    const ref = useRef<RefType>(null);

    useEffect(() => {
        if (!ref.current || !active) {
            return;
        }

        ref.current.scrollIntoView({
            behavior: 'smooth',
        });
    }, [active]);

    return ref;
}
