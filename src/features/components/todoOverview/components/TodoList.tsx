import { VFC, Children, ReactElement } from 'react';

type Props = {
    children: ReactElement[];
};

const TodoList: VFC<Props> = ({ children }) => (
    <ul className="flex flex-col">
        {Children.map(children, (child) => (
            <li key={child.key}>{child}</li>
        ))}
    </ul>
);

export default TodoList;
