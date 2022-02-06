import { MouseEventHandler, FC, ReactNode } from 'react';
import Button from '../../../../../../primitives/button/Button';

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    disabled?: boolean;
};

const ActionButton: FC<Props> = ({ onClick, children, disabled = false }) => (
    <Button variant="link" deflated onClick={onClick} disabled={disabled} className="text-gray-500 text-sm">
        {children}
    </Button>
);

export default ActionButton;
