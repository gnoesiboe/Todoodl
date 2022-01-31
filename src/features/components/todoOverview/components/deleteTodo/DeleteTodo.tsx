import { VFC } from 'react';
import { Todo } from '../../../../../model/todo';
import useHandleDeleteVisibility from './hooks/useHandleDeleteVisibility';
import Button from '../../../../../primitives/button/Button';
import useDeleteTodoOnConfirm from './hooks/useDeleteTodoOnConfirm';

type Props = {
    todo: Todo;
};

const DeleteTodo: VFC<Props> = ({ todo }) => {
    const { visible, hide } = useHandleDeleteVisibility();

    const onConfirm = useDeleteTodoOnConfirm(todo);

    if (!visible) {
        return null;
    }

    return (
        <div className="ml-8 my-4 space-y-3">
            <h3>Are you sure? This can not be made undone!</h3>
            <div className="space-x-2">
                <Button
                    type="button"
                    variant="primary"
                    autoFocus
                    onClick={onConfirm}
                >
                    Delete
                </Button>
                <Button type="button" variant="secondary" onClick={hide}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default DeleteTodo;
