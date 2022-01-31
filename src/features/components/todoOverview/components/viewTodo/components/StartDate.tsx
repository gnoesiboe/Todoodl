import React, { VFC } from 'react';
import { Todo } from '../../../../../../model/todo';
import { formatRelativeDate } from '../../../../../../utility/dateTimeUtilities';

type Props = {
    todo: Todo;
};

const StartDate: VFC<Props> = ({ todo }) => {
    if (!todo.start) {
        return null;
    }

    return <div className="ml-auto text-sm text-gray-400">{formatRelativeDate(todo.start)}</div>;
};

export default StartDate;
