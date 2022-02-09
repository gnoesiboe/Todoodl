import { Children, VFC, ReactElement, MouseEventHandler } from 'react';
import createClassName from 'classnames';

type Props = {
    children: ReactElement[];
    level: 1 | 2;
    onClick?: MouseEventHandler<HTMLUListElement>;
};

const ActionList: VFC<Props> = ({ children, level, onClick }) => {
    const className = createClassName('space-x-2 h-6 overflow-hidden', {
        'ml-7': level === 1,
        inline: level === 2,
    });

    return (
        <ul className={className} onClick={onClick}>
            {Children.map(children, (child) => (
                <li className="inline" key={child.key}>
                    {child}
                </li>
            ))}
        </ul>
    );
};

export default ActionList;
