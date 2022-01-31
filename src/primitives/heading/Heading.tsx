import { createElement, DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import createClassName from 'classnames';

type Props = DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
> & {
    as: 'h1' | 'h2' | 'h3';
    variant: 'primary' | 'secondary';
};

const Heading: FC<Props> = ({
    as,
    children,
    variant,
    className: additionalClassName,
    ...otherProps
}) => {
    const className = createClassName('block', additionalClassName, {
        'uppercase text-3xl': variant === 'primary',
        'text-2xl': variant === 'secondary',
    });

    return createElement(
        as,
        {
            className,
            ...otherProps,
        },
        children,
    );
};

export default Heading;
