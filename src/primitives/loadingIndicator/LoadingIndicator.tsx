import { VFC } from 'react';
import { Oval } from '@agney/react-loading';
import createClassName from 'classnames';
import useSwitchAfterTimeout from '../../hooks/useSwitchAfterTimeout';

type Props = {
    timeout?: number; // milliseconds
    size?: 'small' | 'extraSmall' | 'extremelySmall';
    className?: string;
    centered?: boolean;
};

const LoadingIndicator: VFC<Props> = ({
    timeout = 1000,
    size = 'small',
    centered = false,
    className: additionalClassName,
}) => {
    const visible = useSwitchAfterTimeout(false, timeout);

    if (!visible) {
        return null;
    }

    const className = createClassName({
        ['w-12']: size === 'small',
        ['w-6']: size === 'extraSmall',
        ['w-3']: size === 'extremelySmall',
        ['mx-auto']: centered,
        additionalClassName,
    });

    return (
        <div className={className} aria-label="Loading content...">
            <Oval />
        </div>
    );
};

export default LoadingIndicator;
