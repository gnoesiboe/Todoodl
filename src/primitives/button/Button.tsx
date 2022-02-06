import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import createClassName from 'classnames';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant: 'primary' | 'secondary' | 'link' | 'unstyled';
    deflated?: boolean | 'x';
};

const Button: FC<Props> = ({
    variant,
    deflated = false,
    disabled,
    className: additionalClassName,
    children,
    ...otherProps
}) => {
    const className = createClassName(additionalClassName, {
        'bg-blue-400': variant === 'primary',
        'bg-gray-400': variant === 'secondary',
        'py-2 px-4': !deflated === true && variant !== 'unstyled',
        'py-2': deflated === 'x' && variant !== 'unstyled',
        'hover:underline': variant === 'link' && !disabled,
        'cursor-not-allowed opacity-50': disabled,
    });

    return (
        <button {...otherProps} disabled={disabled} className={className}>
            {children}
        </button>
    );
};

export default Button;
