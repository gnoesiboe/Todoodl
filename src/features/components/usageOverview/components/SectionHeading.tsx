import React, { FC } from 'react';
import Heading from '../../../../primitives/heading/Heading';

const SectionHeading: FC = ({ children }) => (
    <Heading as="h2" variant="secondary" className="mt-20 mb-4">
        {children}
    </Heading>
);

export default SectionHeading;
