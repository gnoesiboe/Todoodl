import { ChangeEventHandler, VFC } from 'react';
import { Todo } from '../../../../../../model/todo';

type Props = {
    todo: Todo;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: VFC<Props> = ({ todo, onChange }) => (
    <input
        type="checkbox"
        className="block mt-1"
        checked={todo.doneAt instanceof Date}
        onChange={(event) => {
            onChange(event);

            // make sure that checkbox does not stay focussed as this undermines the
            // keyboard navigation
            event.target.blur();
        }}
    />
);

export default Checkbox;
