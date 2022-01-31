import { useCallback, useState } from 'react';

type Output = {
    visible: boolean;
    toggle: () => void;
    show: () => void;
    hide: () => void;
};

export default function useToggleVisibility(initialValue: boolean): Output {
    const [visible, setVisible] = useState<boolean>(initialValue);

    const toggle = useCallback(
        () => setVisible((current) => !current),
        [setVisible],
    );

    const show = useCallback(() => setVisible(true), [setVisible]);

    const hide = useCallback(() => setVisible(false), [setVisible]);

    return { visible, toggle, show, hide };
}
