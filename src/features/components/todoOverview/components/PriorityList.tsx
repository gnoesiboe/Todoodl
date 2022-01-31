import { VFC, Children, ReactElement } from 'react';

type Props = {
    children: ReactElement[];
};

const PriorityList: VFC<Props> = ({ children }) => (
    <ul className="space-y-10">
        {Children.map(children, (child) => (
            <li key={child.key}>{child}</li>
        ))}
    </ul>
);

export default PriorityList;
