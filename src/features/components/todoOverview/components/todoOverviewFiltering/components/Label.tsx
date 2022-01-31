import { FC, ReactNode } from 'react';
import createClassName from 'classnames';

type Props = {
    children: ReactNode;
    label: string;
    amount: number;
    checked: boolean;
};

const Label: FC<Props> = ({ children, checked, label, amount }) => {
    const className = createClassName('flex gap-3 items-center', {
        'text-gray-800': checked,
        'opacity-30': !checked,
    });

    return (
        <label className={className}>
            {children} {label} ({amount})
        </label>
    );
};

export default Label;
