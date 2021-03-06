import { MouseEventHandler, VFC } from 'react';
import createClassName from 'classnames';
import { Todo } from '../../../../../../model/todo';

type Props = {
    todo: Todo;
    html: string;
    onDoubleClick: MouseEventHandler<HTMLDivElement>;
};

const Summary: VFC<Props> = ({ todo, html, onDoubleClick }) => {
    const className = createClassName({
        'line-through opacity-20': !!todo.doneAt,
    });

    return <div className={className} onDoubleClick={onDoubleClick} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Summary;
