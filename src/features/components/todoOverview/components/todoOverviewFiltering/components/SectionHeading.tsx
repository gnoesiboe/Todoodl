import { VFC } from 'react';

type Props = {
    label: string;
};

const SectionHeading: VFC<Props> = ({ label }) => {
    return <h3 className="font-bold">{label}</h3>;
};

export default SectionHeading;
