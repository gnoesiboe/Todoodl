import { FC, ReactNode, VFC } from 'react';
import { IconProps } from 'react-feather';
import { formatRelativeDate, isPressing, isWarning } from '../../../../../../utility/dateTimeUtilities';
import createClassName from 'classnames';

type Props = {
    Icon: FC<IconProps>;
    date: Date;
    applyColorCoding?: boolean;
};

const PeriodItem: VFC<Props> = ({ Icon, date, applyColorCoding = false }) => {
    const className = createClassName('flex items-center gap-1', {
        'text-red-700 bold': applyColorCoding && isPressing(date),
        'text-orange-500': applyColorCoding && isWarning(date),
    });

    return (
        <span className={className}>
            <Icon size={12} />
            {formatRelativeDate(date)}
        </span>
    );
};

export default PeriodItem;
