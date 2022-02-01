import { VFC } from 'react';

type Props = {
    checked: boolean;
    toggleChecked: () => void;
};

const Checkbox: VFC<Props> = ({ checked, toggleChecked }) => (
    <input
        type="checkbox"
        checked={checked}
        onChange={(event) => {
            toggleChecked();

            // make sure that checkbox does not stay focussed as this undermines the
            // keyboard navigation
            event.target.blur();
        }}
    />
);

export default Checkbox;