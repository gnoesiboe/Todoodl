import { VFC } from 'react';

type Props = {
    html: string;
};

const Note: VFC<Props> = ({ html }) => (
    <p
        className="block text-gray-600 text-sm mb-4"
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);

export default Note;
