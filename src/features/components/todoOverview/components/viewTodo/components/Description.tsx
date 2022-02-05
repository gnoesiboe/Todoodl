import { MouseEventHandler, useMemo, VFC } from 'react';
import { Todo } from '../../../../../../model/todo';
import { parseDescription } from '../parser/todoDescriptionParser';
import Summary from './Summary';
import Note from './Note';
import createClassName from 'classnames';

type Props = {
    todo: Todo;
    className?: string;
    onDoubleClick: MouseEventHandler;
    onClick: MouseEventHandler;
    current: boolean;
};

const Description: VFC<Props> = ({ todo, className: additionalClassName, onDoubleClick, onClick, current }) => {
    const [parsedSummary, ...parsedOtherLines] = useMemo(() => parseDescription(todo.description), [todo.description]);

    const className = createClassName('block space-y-2', additionalClassName);

    return (
        <div className={className} onClick={onClick}>
            <Summary todo={todo} html={parsedSummary} onDoubleClick={onDoubleClick} />
            {current && parsedOtherLines.length > 0 && (
                <div>
                    {parsedOtherLines.map((parsedOtherLine, index) => (
                        <Note key={index} html={parsedOtherLine} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Description;
