import useToggleVisibility from '../../../../../../hooks/useToggleVisibility';
import { useEffect } from 'react';
import { checkIsKeyboardShortcut } from '../../../../../../utility/keyboardUtilities';
import { checkIsFormInputElement } from '../../../../../../utility/formUtilities';

export default function useHandleDeleteVisibility() {
    const { visible, show, hide } = useToggleVisibility(false);

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (checkIsKeyboardShortcut(event, 'd')) {
                if (event.target && checkIsFormInputElement(event.target)) {
                    return;
                }

                show();

                return;
            }

            if (visible && checkIsKeyboardShortcut(event, 'Escape')) {
                hide();

                return;
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    });

    return { visible, hide };
}
