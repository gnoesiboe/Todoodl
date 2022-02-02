import { useEffect, useRef } from 'react';

export default function useScrollIntoView<RefType extends HTMLElement>(active: boolean) {
    const ref = useRef<RefType>(null);

    useEffect(() => {
        if (!ref.current || !active) {
            return;
        }

        // Target is outside the viewport from the bottom
        if (ref.current.getBoundingClientRect().bottom > window.innerHeight) {
            //  The bottom of the target will be aligned to the bottom of the visible area of the scrollable ancestor.
            ref.current.scrollIntoView(false);
        }

        // Target is outside the view from the top
        if (ref.current.getBoundingClientRect().top < 0) {
            console.log('scroll into view', true);

            // The top of the target will be aligned to the top of the visible area of the scrollable ancestor
            ref.current.scrollIntoView();
        }
    }, [active]);

    return ref;
}
