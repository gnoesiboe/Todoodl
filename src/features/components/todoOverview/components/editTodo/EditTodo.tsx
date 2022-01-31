import React, { FormEventHandler, useState, VFC } from 'react';
import { Todo } from '../../../../../model/todo';
import TextareaAutosize from 'react-textarea-autosize';
import useHandleEditTodoKeyboardShortcuts from './hooks/useHandleEditTodoKeyboardShortcuts';
import Button from '../../../../../primitives/button/Button';
import { generateTodoUpdatesFromRawValue } from '../../../../../handler/todoUpdateHandler';
import { update } from '../../../../../repository/todoRepository';

type Props = {
    todo: Todo;
    onDone: () => void;
};

const EditTodo: VFC<Props> = ({ todo, onDone }) => {
    const [rawValue, setRawValue] = useState<string>(todo.rawValue);

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
                <Button variant="primary">Save</Button>
                <Button variant="secondary" onClick={() => onDone()}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default EditTodo;
