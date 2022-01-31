import { FC } from 'react';

const Container: FC = ({ children }) => {
    return <dl className="">{children}</dl>;
};

const Row: FC = ({ children }) => {
    return <div className="flex w-full mb-2">{children}</div>;
};

const Term: FC = ({ children }) => {
    return <dt className="w-1/3 md:w-1/6">{children}</dt>;
};

const Definition: FC = ({ children }) => {
    return <dd className="flex-1">{children}</dd>;
};

// eslint-disable-next-line
export default {
    Container,
    Row,
    Term,
    Definition,
};
