import { VFC } from 'react';

type Props = {
    html: string;
};

const Note: VFC<Props> = ({ html }) => {
    if (html.length === 0) {
        return <br />;
    }

    return (
        <p
            className="block text-gray-600 text-sm"
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        />
    );
};

const test = () => <div className="font-bold" />;

export default Note;
