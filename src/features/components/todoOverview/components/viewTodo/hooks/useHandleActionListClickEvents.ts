import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { Mode } from '../ViewTodo';
import { Todo, TodoPriority } from '../../../../../../model/todo';
import { useManageTodos } from '../../../../../../context/todo/TodoContext';

export default function useHandleActionListClickEvents(todo: Todo, setMode: Dispatch<SetStateAction<Mode>>) {
    const { remove, update } = useManageTodos();

    const updatePriority = (todo: Todo, newPriority: TodoPriority) => {
        update(todo.uuid, {
            priority: newPriority,
        });
    };

    const onEditClick: MouseEventHandler<HTMLButtonElement> = () => setMode(Mode.Edit);

    const onMustClick: MouseEventHandler<HTMLButtonElement> = () => updatePriority(todo, 'must');
    const onShouldClick: MouseEventHandler<HTMLButtonElement> = () => updatePriority(todo, 'should');

    const onDeleteClick: MouseEventHandler<HTMLButtonElement> = () => {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm('Are you sure?');

        if (confirmed) {
            remove(todo);
        }
    };

    return { onEditClick, onMustClick, onShouldClick, onDeleteClick };
}