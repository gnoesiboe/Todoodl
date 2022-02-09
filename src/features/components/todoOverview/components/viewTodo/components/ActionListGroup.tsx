import { Children, Fragment, ReactElement, VFC } from 'react';
import useToggleVisibility from '../../../../../../hooks/useToggleVisibility';
import ActionButton from './ActionButton';
import ActionList from './ActionList';

type Props = {
    children: ReactElement[];
    label: string;
};

const ActionListGroup: VFC<Props> = ({ children, label }) => {
    const { visible, show, hide } = useToggleVisibility(false);

    if (visible) {
        return (
            <ActionList level={2} onClick={hide}>
                {Children.map(children, (child) => (
                    <Fragment key={child.key}>{child}</Fragment>
                ))}
            </ActionList>
        );
    }

    return <ActionButton onClick={show}>{label}</ActionButton>;
};

export default ActionListGroup;
