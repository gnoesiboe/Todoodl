import { Children, VFC, ReactElement } from 'react';

type Props = {
    children: ReactElement[];
};

const ActionList: VFC<Props> = ({ children }) => (
    <ul className="space-x-2 ml-7">
        {Children.map(children, (child) => (
            <li className="inline" key={child.key}>
                {child}
            </li>
        ))}
    </ul>
);

export default ActionList;
