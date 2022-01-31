import { Dispatch, SetStateAction, useEffect } from 'react';
import { Mode } from '../ViewTodo';
import { checkIsFormInputElement } from '../../../../../../utility/formUtilities';
import { checkIsKeyboardShortcut } from '../../../../../../utility/keyboardUtilities';

export default function useStartEditWithKeyboardShortcut(
    isCurrent: boolean,
    mode: Mode,
    setMode: Dispatch<SetStateAction<Mode>>,
) {
    useEffect(() => {
        if (!isCurrent || mode === Mode.Edit) {
            return;
        }

        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (checkIsKeyboardShortcut(event, 'e')) {
                if (event.target && checkIsFormInputElement(event.target)) {
                    return;
                }

                setMode(Mode.Edit);

                // prevent typing 'e' in text input
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isCurrent, mode, setMode]);
}
