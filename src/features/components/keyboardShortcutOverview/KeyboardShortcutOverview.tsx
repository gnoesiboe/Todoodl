import React, { VFC } from 'react';
import Heading from '../../../primitives/heading/Heading';
import DefinitionList from '../../../primitives/definitionList/DefinitionList';
import Code from '../../../primitives/code/Code';

const KeyboardShortcutOverview: VFC = () => (
    <section className="p-4">
        <Heading as="h1" variant="primary" className="mb-6">
            Keyboard shortcuts
        </Heading>
        <DefinitionList.Container>
            <DefinitionList.Row>
                <DefinitionList.Term>
                    <Code>a</Code>
                </DefinitionList.Term>
                <DefinitionList.Definition>Add a new todo below the current.</DefinitionList.Definition>
            </DefinitionList.Row>

            <DefinitionList.Row>
                <DefinitionList.Term>
                    <Code>b</Code>
                </DefinitionList.Term>
                <DefinitionList.Definition>Add a new todo before the current.</DefinitionList.Definition>
            </DefinitionList.Row>

            <DefinitionList.Row>
                <DefinitionList.Term>
                    <Code>d</Code>
                </DefinitionList.Term>
                <DefinitionList.Definition>Delete the current todo.</DefinitionList.Definition>
            </DefinitionList.Row>

            <Heading as="h2" variant="secondary" className="mt-10 mb-4">
                Creating or updating a todo
            </Heading>
            <DefinitionList.Row>
                <DefinitionList.Term>
                    <Code>ctrl + enter</Code>
                </DefinitionList.Term>
                <DefinitionList.Definition>Save and submit the new todo description.</DefinitionList.Definition>
            </DefinitionList.Row>
            <DefinitionList.Row>
                <DefinitionList.Term>
                    <Code>escape</Code>
                </DefinitionList.Term>
                <DefinitionList.Definition>Stop editing and ignore any changes you made</DefinitionList.Definition>
            </DefinitionList.Row>
        </DefinitionList.Container>
    </section>
);

export default KeyboardShortcutOverview;
