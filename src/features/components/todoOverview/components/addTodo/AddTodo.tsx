import React, { FormEventHandler, MouseEventHandler, useState, VFC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useHandleAddTodoKeyboardEvents from './hooks/useHandleAddTodoKeyboardEvents';
import { TodoPriority } from '../../../../../model/todo';
import Button from '../../../../../primitives/button/Button';
import { createTodoFromRawValue } from '../../../../../model/factory/todoFactory';
import { useManageTodos } from '../../../../../context/todo/TodoContext';

type Props = {
    atIndex: number;
    priority: TodoPriority;
    onDone?: () => void;
    className?: string;
};

const AddTodo: VFC<Props> = ({ atIndex, priority, className, onDone = () => {} }) => {
    const [rawValue, setRawValue] = useState<string>('');

    const { persist } = useManageTodos();

    useHandleAddTodoKeyboardEvents(atIndex, rawValue, setRawValue, priority, onDone);

    // @todo combine with submit in useHandleAddTodoKeyboardEvents
    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        // prevent submitting to backend
        event.preventDefault();

        if (rawValue.trim().length === 0) {
            return;
        }

        const todo = createTodoFromRawValue(rawValue);
        todo.priority = priority;

        persist(todo, atIndex);

        setRawValue('');
        onDone();
    };

    const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        onDone();
    };

    return (
        <form className={className || ''} onSubmit={onSubmit}>
            <TextareaAutosize
                autoFocus
                className="p-3 w-full font-mono text-sm"
                value={rawValue}
                onChange={(event) => setRawValue(event.target.value)}
                placeholder="[home] Do the dishes #quickfix @should s:today d:today"
            />
            <div className="space-x-2">
                <Button variant="primary" type="submit" disabled={rawValue.trim().length === 0}>
                    Save
                </Button>
                <Button variant="secondary" type="button" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default AddTodo;
