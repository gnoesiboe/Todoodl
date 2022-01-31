import { MouseEventHandler } from 'react';
import { Todo } from '../../../../../../model/todo';
import { remove } from '../../../../../../repository/todoRepository';

export default function useDeleteTodoOnConfirm(
    todo: Todo,
): MouseEventHandler<HTMLButtonElement> {
    return () => {
        remove(todo);
    };
}
