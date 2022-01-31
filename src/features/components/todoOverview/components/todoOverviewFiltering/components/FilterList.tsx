import { Children, VFC, ReactElement } from 'react';

type Props = {
    children: ReactElement[];
};

const FilterList: VFC<Props> = ({ children }) => {
    return (
        <ul>
            {Children.map(children, (child) => (
                <li key={child.key}>{child}</li>
            ))}
        </ul>
    );
};

export default FilterList;
