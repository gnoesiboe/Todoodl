import { KeyboardEventHandler } from 'react';
import { Todo } from '../../../../../../model/todo';
import { checkIsKeyboardShortcut } from '../../../../../../utility/keyboardUtilities';

export default function useHandleEditTodoKeyboardShortcuts(
    todo: Todo,
    persistUpdates: () => void,
    onDone: () => void,
): KeyboardEventHandler<HTMLTextAreaElement> {
    return (event) => {
        if (checkIsKeyboardShortcut(event, 'Enter', { ctrlKey: true })) {
            persistUpdates();

            return;
        }

        if (checkIsKeyboardShortcut(event, 'Escape')) {
            onDone();
        }
    };
}
