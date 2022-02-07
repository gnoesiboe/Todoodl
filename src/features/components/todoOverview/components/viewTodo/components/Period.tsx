import React, { VFC } from 'react';
import { Todo } from '../../../../../../model/todo';
import { Clock, Play } from 'react-feather';
import PeriodItem from './PeriodItem';
import useViewportDimensions from '../../../../../../hooks/useViewportDimensions';
import breakpoints from '../../../../../../constants/breakpoints';
import { checkIsToday } from '../../../../../../utility/dateTimeUtilities';

type Props = {
    todo: Todo;
};

const Period: VFC<Props> = ({ todo }) => {
    const viewportDimensions = useViewportDimensions();

    if (!todo.start && !todo.due) {
        return null;
    }

    const start = todo.start || new Date();

    const showStart = viewportDimensions.width > breakpoints.sm && !checkIsToday(start);
    const showSeparator = start && showStart && todo.due;

    return (
        <div className="ml-auto text-sm text-gray-400 flex gap-2">
            {showStart && <PeriodItem Icon={Play} date={start} />}
            {showSeparator && <span> — </span>}
            {todo.due && <PeriodItem Icon={Clock} date={todo.due} applyColorCoding />}
        </div>
    );
};

export default Period;
