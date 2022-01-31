import { MouseEventHandler } from 'react';
import { Todo } from '../../../../../../model/todo';
import { useManageTodos } from '../../../../../../context/todo/TodoContext';

export default function useDeleteTodoOnConfirm(todo: Todo): MouseEventHandler<HTMLButtonElement> {
    const { remove } = useManageTodos();

    return () => {
        remove(todo);
    };
}
