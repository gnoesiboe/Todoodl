import useToggleVisibility from '../../../../../../hooks/useToggleVisibility';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { checkIsFormInputElement } from '../../../../../../utility/formUtilities';
import { checkIsKeyboardShortcut } from '../../../../../../utility/keyboardUtilities';
import { createTodoFromRawValue } from '../../../../../../model/factory/todoFactory';
import { TodoPriority } from '../../../../../../model/todo';
import { LocationType } from '../AddTodo';
import { useManageTodos } from '../../../../../../context/todo/TodoContext';

export default function useHandleAddTodoKeyboardEvents(
    atIndex: number,
    rawValue: string,
    setRawValue: Dispatch<SetStateAction<string>>,
    priority: TodoPriority,
    location: LocationType,
    initiallyVisible: boolean,
) {
    const { persist } = useManageTodos();

    const { visible, show, hide } = useToggleVisibility(initiallyVisible);

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (checkIsKeyboardShortcut(event, 'Escape')) {
                hide();

                return;
            }

            if (checkIsKeyboardShortcut(event, location === 'after' ? 'a' : 'b')) {
                // typing in a form input should be excluded as otherwise strange stuff starts to happen
                if (event.target && checkIsFormInputElement(event.target)) {
                    return;
                }

                show();

                // prevent typing the 'a' in textarea
                event.preventDefault();

                return;
            }

            if (visible && checkIsKeyboardShortcut(event, 'Enter', { ctrlKey: true })) {
                const todo = createTodoFromRawValue(rawValue);

                // @todo this overrides any priority set in the raw value, fix this!
                todo.priority = priority;

                persist(todo, atIndex + (location === 'after' ? 1 : 0));

                setRawValue('');
                hide();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [hide, atIndex, priority, rawValue, setRawValue, show, visible, location, persist]);

    return { visible, hide };
}
