import { FC } from 'react';

const SectionContainer: FC = ({ children }) => {
    return <div className="space-y-2 min-w-fit">{children}</div>;
};

export default SectionContainer;
