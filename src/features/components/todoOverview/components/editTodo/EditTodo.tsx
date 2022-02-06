import React, { FormEventHandler, useState, VFC } from 'react';
import { Todo } from '../../../../../model/todo';
import TextareaAutosize from 'react-textarea-autosize';
import useHandleEditTodoKeyboardShortcuts from './hooks/useHandleEditTodoKeyboardShortcuts';
import Button from '../../../../../primitives/button/Button';
import { generateTodoUpdatesFromRawValue } from '../../../../../handler/todoUpdateHandler';
import { useManageTodos } from '../../../../../context/todo/TodoContext';

type Props = {
    todo: Todo;
    onDone: () => void;
};

const EditTodo: VFC<Props> = ({ todo, onDone }) => {
    const [rawValue, setRawValue] = useState<string>(todo.rawValue);

    const { update } = useManageTodos();

    const persistUpdates = () => {
        update(todo.uuid, generateTodoUpdatesFromRawValue(rawValue));

        onDone();
    };

    const onKeyDown = useHandleEditTodoKeyboardShortcuts(todo, persistUpdates, onDone);

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        // prevent submitting to backend
        event.preventDefault();

        persistUpdates();
    };

    return (
        <form onSubmit={onSubmit}>
            <TextareaAutosize
                autoFocus
                className="p-2 w-full"
                value={rawValue}
                onKeyDown={onKeyDown}
                onChange={(event) => setRawValue(event.target.value)}
            />
            <div className="space-x-2">
                <Button variant="primary" type="submit" disabled={rawValue.trim().length === 0}>
                    Save
                </Button>
                <Button variant="secondary" type="button" onClick={() => onDone()}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default EditTodo;
