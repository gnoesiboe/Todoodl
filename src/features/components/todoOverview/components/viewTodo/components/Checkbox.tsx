import { ChangeEventHandler, VFC } from 'react';
import { Todo } from '../../../../../../model/todo';

type Props = {
    todo: Todo;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
};

const Checkbox: VFC<Props> = ({ todo, onChange, className }) => {
    return (
        <input
            type="checkbox"
            className={className}
            checked={todo.doneAt instanceof Date}
            onChange={(event) => {
                onChange(event);

                // make sure that checkbox does not stay focussed as this undermines the
                // keyboard navigation
                event.target.blur();
            }}
        />
    );
};

export default Checkbox;
