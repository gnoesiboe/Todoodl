import { FC } from 'react';

const Code: FC = ({ children }) => {
    return <code className="font-mono bg-gray-200 p-1">{children}</code>;
};

export default Code;
