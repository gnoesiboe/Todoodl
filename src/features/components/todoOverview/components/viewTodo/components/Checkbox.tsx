import { ChangeEventHandler, VFC } from 'react';
import { Todo } from '../../../../../../model/todo';
import createClassName from 'classnames';

type Props = {
    todo: Todo;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: VFC<Props> = ({ todo, onChange }) => {
    const className = createClassName('block mt-1', {
        'text-blue-300': !todo.doneAt,
        'text-gray-300': !!todo.doneAt,
    });

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
