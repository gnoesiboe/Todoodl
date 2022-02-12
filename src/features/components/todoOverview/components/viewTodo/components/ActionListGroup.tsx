import { Children, Fragment, ReactElement, VFC } from 'react';
import useToggleVisibility from '../../../../../../hooks/useToggleVisibility';
import ActionButton from './ActionButton';
import ActionList from './ActionList';

type Props = {
    children: ReactElement[];
    label: string;
};

const ActionListGroup: VFC<Props> = ({ children, label }) => {
    const { visible, toggle } = useToggleVisibility(false);

    return (
        <>
            <ActionButton onClick={toggle}>{label}</ActionButton>
            {visible && (
                <>
                    {visible ? ' → ' : ''}
                    <ActionList level={2} onClick={toggle}>
                        {Children.map(children, (child) => (
                            <Fragment key={child.key}>{child}</Fragment>
                        ))}
                    </ActionList>
                </>
            )}
        </>
    );
};

export default ActionListGroup;
