import React, { useCallback, useState, VFC, ReactNode, MouseEventHandler } from 'react';
import { Todo } from '../../../../../model/todo';
import EditTodo from '../editTodo/EditTodo';
import Description from './components/Description';
import Checkbox from './components/Checkbox';
import createClassName from 'classnames';
import useStartEditWithKeyboardShortcut from './hooks/useStartEditWithKeyboardShortcut';
import useToggleToggleDoneWithKeyboardShortcut from './hooks/useToggleToggleDoneWithKeyboardShortcut';
import ActionList from './components/ActionList';
import ActionButton from './components/ActionButton';
import useHandleActionListClickEvents from './hooks/useHandleActionListClickEvents';
import useScrollIntoView from '../../../../../utility/useScrollIntoView';
import Period from './components/Period';
import { useManageTodos } from '../../../../../context/todo/TodoContext';

type Props = {
    todo: Todo;
    current: boolean;
    renderBefore: () => ReactNode;
    renderAfter: () => ReactNode;
    onDescriptionClick: MouseEventHandler;
};

export enum Mode {
    View = 'view',
    Edit = 'edit',
}

const ViewTodo: VFC<Props> = ({ todo, current, renderAfter, renderBefore, onDescriptionClick }) => {
    const [mode, setMode] = useState<Mode>(Mode.View);

    const { update } = useManageTodos();

    const toggleDone = useCallback(() => {
        update(todo.uuid, {
            doneAt: todo.doneAt instanceof Date ? null : new Date(),
        });
    }, [todo.doneAt, todo.uuid, update]);

    useStartEditWithKeyboardShortcut(current, mode, setMode);
    useToggleToggleDoneWithKeyboardShortcut(current, mode, toggleDone);

    const { onEditClick, onMustClick, onShouldClick, onDeleteClick } = useHandleActionListClickEvents(todo, setMode);

    const className = createClassName('p-2', 'rounded-sm', {
        'bg-blue-100': current,
    });

    const ref = useScrollIntoView<HTMLDivElement>(current);

    return (
        <div className={className} ref={ref}>
            {mode === Mode.Edit && <EditTodo todo={todo} onDone={() => setMode(Mode.View)} />}
            {mode === Mode.View && (
                <>
                    {current && renderBefore()}
                    <div className="flex gap-3 justify-start items-start">
                        <Checkbox todo={todo} onChange={toggleDone} />
                        <Description
                            todo={todo}
                            onDoubleClick={() => setMode(Mode.Edit)}
                            onClick={onDescriptionClick}
                            current={current}
                        />
                        <Period todo={todo} />
                    </div>
                    {current && (
                        <>
                            <ActionList>
                                <ActionButton onClick={onEditClick}>edit</ActionButton>
                                <ActionButton onClick={onMustClick} disabled={todo.priority === 'must'}>
                                    must
                                </ActionButton>
                                <ActionButton onClick={onShouldClick} disabled={todo.priority === 'should'}>
                                    should
                                </ActionButton>
                                <ActionButton onClick={onDeleteClick}>delete</ActionButton>
                            </ActionList>
                            {renderAfter()}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ViewTodo;
