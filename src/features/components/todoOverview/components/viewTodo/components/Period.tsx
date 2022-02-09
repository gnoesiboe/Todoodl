import React, { VFC } from 'react';
import { Todo } from '../../../../../../model/todo';
import { Clock, Play } from 'react-feather';
import PeriodItem from './PeriodItem';
import useViewportDimensions from '../../../../../../hooks/useViewportDimensions';
import breakpoints from '../../../../../../constants/breakpoints';
import { checkIsToday } from '../../../../../../utility/dateTimeUtilities';
import createClassName from 'classnames';

type Props = {
    todo: Todo;
    className: string;
};

const Period: VFC<Props> = ({ todo, className: additionalClassName }) => {
    const viewportDimensions = useViewportDimensions();

    if (!todo.start && !todo.due) {
        return null;
    }

    const start = todo.start || new Date();

    const showStart = viewportDimensions.width > breakpoints.sm && !checkIsToday(start);
    const showSeparator = start && showStart && todo.due;

    const className = createClassName('text-sm text-gray-400 flex gap-2', additionalClassName);

    return (
        <div className={className}>
            {showStart && <PeriodItem Icon={Play} date={start} />}
            {showSeparator && <span> — </span>}
            {todo.due && <PeriodItem Icon={Clock} date={todo.due} applyColorCoding />}
        </div>
    );
};

export default Period;
