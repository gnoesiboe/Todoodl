import { MouseEventHandler, useEffect, useState } from 'react';
import { checkIsKeyboardShortcut } from '../../../../../../utility/keyboardUtilities';
import { checkIsFormInputElement } from '../../../../../../utility/formUtilities';

type LocationType = 'before' | 'after' | null;

export default function useShowAddTodo() {
    const [location, setLocation] = useState<LocationType>(null);

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (checkIsKeyboardShortcut(event, 'a')) {
                // typing in a form input should be excluded as otherwise strange stuff starts to happen
                if (event.target && checkIsFormInputElement(event.target)) {
                    return;
                }

                setLocation('after');

                // prevent typing the 'a' in autofocused textarea
                event.preventDefault();

                return;
            }

            if (checkIsKeyboardShortcut(event, 'b')) {
                // typing in a form input should be excluded as otherwise strange stuff starts to happen
                if (event.target && checkIsFormInputElement(event.target)) {
                    return;
                }

                setLocation('before');

                // prevent typing the 'a' in autofocused textarea
                event.preventDefault();

                return;
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [location, setLocation]);

    const onAddAfterButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        setLocation('after');
    };

    const onAddBeforeButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        setLocation('before');
    };

    const hide = () => setLocation(null);

    return { location, hide, onAddAfterButtonClick, onAddBeforeButtonClick };
}
