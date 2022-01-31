import { useEffect } from 'react';
import { Mode } from '../ViewTodo';
import { checkIsFormInputElement } from '../../../../../../utility/formUtilities';
import { checkIsKeyboardShortcut } from '../../../../../../utility/keyboardUtilities';

export default function useToggleToggleDoneWithKeyboardShortcut(
    isCurrent: boolean,
    mode: Mode,
    toggleDone: () => void,
) {
    useEffect(() => {
        if (!isCurrent || mode === Mode.Edit) {
            return;
        }

        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (
                checkIsKeyboardShortcut(event, ' ') &&
                event.target &&
                !checkIsFormInputElement(event.target)
            ) {
                toggleDone();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isCurrent, mode, toggleDone]);
}
