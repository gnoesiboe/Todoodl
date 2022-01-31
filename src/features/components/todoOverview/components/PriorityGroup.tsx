import React, { ReactNode, FC } from 'react';
import { TodoPriority } from '../../../../model/todo';

type Props = {
    children: ReactNode;
    name: TodoPriority;
};

const PriorityGroup: FC<Props> = ({ children, name }) => {
    return (
        <div>
            <h2 className="text-xl uppercase mb-2">{name}</h2>
            {children}
        </div>
    );
};

export default PriorityGroup;
