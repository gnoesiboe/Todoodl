import React, { VFC } from 'react';
import Heading from '../../../primitives/heading/Heading';
import DefinitionList from '../../../primitives/definitionList/DefinitionList';
import Code from '../../../primitives/code/Code';
import Button from '../../../primitives/button/Button';
import useToggleVisibility from '../../../hooks/useToggleVisibility';
import createClassName from 'classnames';
import SectionHeading from './components/SectionHeading';

const UsageOverview: VFC = () => {
    const { visible, toggle } = useToggleVisibility(false);

    const className = createClassName('p-4', {
        'opacity-30': !visible,
    });

    return (
        <section className={className}>
            <Heading as="h1" variant="primary" className="mb-6 flex gap-3">
                Usage
                <Button variant="link" className="text-sm" onClick={toggle}>
                    {visible ? 'hide' : 'show'}
                </Button>
            </Heading>
            {visible && (
                <>
                    <section>
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
                                <DefinitionList.Definition>
                                    Add a new todo before the current.
                                </DefinitionList.Definition>
                            </DefinitionList.Row>

                            <DefinitionList.Row>
                                <DefinitionList.Term>
                                    <Code>d</Code>
                                </DefinitionList.Term>
                                <DefinitionList.Definition>Delete the current todo.</DefinitionList.Definition>
                            </DefinitionList.Row>
                        </DefinitionList.Container>
                    </section>

                    <section>
                        <SectionHeading>Creating or updating a todo</SectionHeading>
                        <DefinitionList.Container>
                            <DefinitionList.Row>
                                <DefinitionList.Term>
                                    <Code>ctrl + enter</Code>
                                </DefinitionList.Term>
                                <DefinitionList.Definition>
                                    Save and submit the new todo description.
                                </DefinitionList.Definition>
                            </DefinitionList.Row>
                            <DefinitionList.Row>
                                <DefinitionList.Term>
                                    <Code>escape</Code>
                                </DefinitionList.Term>
                                <DefinitionList.Definition>
                                    Stop editing and ignore any changes you made
                                </DefinitionList.Definition>
                            </DefinitionList.Row>
                        </DefinitionList.Container>
                    </section>

                    <section>
                        <SectionHeading>Special syntax when adding/adding todos</SectionHeading>
                        <DefinitionList.Container>
                            <DefinitionList.Row>
                                <DefinitionList.Term>
                                    <Code>dl:[deadline]</Code>
                                </DefinitionList.Term>
                                <DefinitionList.Definition>
                                    <p>Replace `[deadline]` with any of the values below to assign a deadline:</p>
                                    <ul className="list-disc pl-5">
                                        <li>
                                            <Code>today</Code>
                                        </li>
                                        <li>
                                            <Code>tomorrow</Code>
                                        </li>
                                        <li>
                                            <Code>monday</Code> | <Code>tuesday</Code> | <Code>wednesday</Code> |{' '}
                                            <Code>thursday</Code> | <Code>friday</Code> | <Code>saturday</Code> |{' '}
                                            <Code>sunday</Code>
                                        </li>
                                        <li>
                                            <Code>dd-mm-yyyy</Code>
                                        </li>
                                    </ul>
                                </DefinitionList.Definition>
                            </DefinitionList.Row>
                            <DefinitionList.Row>
                                <DefinitionList.Term>
                                    <Code>s:[startDate]</Code>
                                </DefinitionList.Term>
                                <DefinitionList.Definition>
                                    <p>
                                        <i>
                                            (see <Code>dl:[deadline]</Code> above)
                                        </i>
                                    </p>
                                </DefinitionList.Definition>
                            </DefinitionList.Row>
                            <DefinitionList.Row>
                                <DefinitionList.Term>
                                    <Code>@[priority]</Code>
                                </DefinitionList.Term>
                                <DefinitionList.Definition>
                                    <p>Sets the priority for the todo, with accepted values being:</p>
                                    <ul className="list-disc pl-5">
                                        <li>
                                            <Code>@must</Code>
                                        </li>
                                        <li>
                                            <Code>@should</Code>
                                        </li>
                                        <li>
                                            <Code>@could</Code>
                                        </li>
                                        <li>
                                            <Code>@would</Code>
                                        </li>
                                    </ul>
                                </DefinitionList.Definition>
                            </DefinitionList.Row>
                            <DefinitionList.Row>
                                <DefinitionList.Term>
                                    <Code>#[tagName]</Code>
                                </DefinitionList.Term>
                                <DefinitionList.Definition>
                                    <p>
                                        Assigns tags to the todo, that automatically creates filters you can use to
                                        group or filter out todo's.
                                    </p>
                                </DefinitionList.Definition>
                            </DefinitionList.Row>
                            <DefinitionList.Row>
                                <DefinitionList.Term>
                                    <Code>[projectName]</Code>
                                </DefinitionList.Term>
                                <DefinitionList.Definition>
                                    When used at the start of the todo, assigns the todo to a project. Projects can be
                                    used to filter out groups of todos,.
                                </DefinitionList.Definition>
                            </DefinitionList.Row>
                            <DefinitionList.Row>
                                <DefinitionList.Term>
                                    <Code>[label](url)</Code>
                                </DefinitionList.Term>
                                <DefinitionList.Definition>
                                    When used in a todo description this will be transformed to a link, just like in
                                    Markdown.
                                </DefinitionList.Definition>
                            </DefinitionList.Row>
                        </DefinitionList.Container>
                    </section>
                </>
            )}
        </section>
    );
};

export default UsageOverview;
