import { Dispatch, SetStateAction, useEffect } from 'react';
import { checkIsKeyboardShortcut } from '../../../../../../utility/keyboardUtilities';
import { createTodoFromRawValue } from '../../../../../../model/factory/todoFactory';
import { TodoPriority } from '../../../../../../model/todo';
import { useManageTodos } from '../../../../../../context/todo/TodoContext';

export default function useHandleAddTodoKeyboardEvents(
    atIndex: number,
    rawValue: string,
    setRawValue: Dispatch<SetStateAction<string>>,
    priority: TodoPriority,
    onDone: () => void,
) {
    const { persist } = useManageTodos();

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (checkIsKeyboardShortcut(event, 'Enter', { ctrlKey: true })) {
                const todo = createTodoFromRawValue(rawValue);

                // @todo this overrides any priority set in the raw value, fix this!
                todo.priority = priority;

                persist(todo, atIndex);

                setRawValue('');

                onDone();

                return;
            }

            if (checkIsKeyboardShortcut(event, 'Escape')) {
                onDone();

                return;
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [atIndex, priority, rawValue, setRawValue, persist, onDone]);
}
