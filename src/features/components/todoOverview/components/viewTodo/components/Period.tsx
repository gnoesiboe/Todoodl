import React, { VFC } from 'react';
import { Todo } from '../../../../../../model/todo';
import { Clock, Play } from 'react-feather';
import PeriodItem from './PeriodItem';

type Props = {
    todo: Todo;
};

const Period: VFC<Props> = ({ todo }) => {
    if (!todo.start && !todo.due) {
        return null;
    }

    const start = todo.start || new Date();

    return (
        <div className="ml-auto text-sm text-gray-400 flex gap-2">
            <PeriodItem Icon={Play} date={start} />
            {todo.due && (
                <>
                    <span> — </span>
                    <PeriodItem Icon={Clock} date={todo.due} applyColorCoding />
                </>
            )}
        </div>
    );
};

export default Period;
