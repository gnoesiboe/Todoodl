import React, { FormEventHandler, useState, VFC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useHandleAddTodoKeyboardEvents from './hooks/useHandleAddTodoKeyboardEvents';
import { TodoPriority } from '../../../../../model/todo';
import Button from '../../../../../primitives/button/Button';
import { createTodoFromRawValue } from '../../../../../model/factory/todoFactory';
import { useManageTodos } from '../../../../../context/todo/TodoContext';

export type LocationType = 'before' | 'after';

type Props = {
    atIndex: number;
    priority: TodoPriority;
    location: LocationType;
    initiallyVisible?: boolean;
};

const AddTodo: VFC<Props> = ({ atIndex, priority, location, initiallyVisible = false }) => {
    const [rawValue, setRawValue] = useState<string>('');

    const { persist } = useManageTodos();

    const { visible, hide } = useHandleAddTodoKeyboardEvents(
        atIndex,
        rawValue,
        setRawValue,
        priority,
        location,
        initiallyVisible,
    );

    if (!visible) {
        return null;
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        // prevent submitting to backend
        event.preventDefault();

        const todo = createTodoFromRawValue(rawValue);
        todo.priority = priority;

        persist(todo, atIndex + (location === 'after' ? 1 : 0));

        setRawValue('');
        hide();
    };

    return (
        <form className="mt-2" onSubmit={onSubmit}>
            <TextareaAutosize
                autoFocus
                className="p-2 w-full"
                value={rawValue}
                onChange={(event) => setRawValue(event.target.value)}
            />
            <div className="space-x-2">
                <Button variant="primary">Save</Button>
                <Button variant="secondary" onClick={() => hide()}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default AddTodo;
