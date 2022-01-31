import { ChangeEventHandler, VFC } from 'react';
import { Todo } from '../../../../../../model/todo';

type Props = {
    todo: Todo;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
};

const Checkbox: VFC<Props> = ({ todo, onChange, className }) => {
    return <input type="checkbox" className={className} checked={todo.done} onChange={onChange} />;
};

export default Checkbox;
