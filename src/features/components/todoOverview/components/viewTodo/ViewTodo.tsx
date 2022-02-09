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
import AddTodo from '../addTodo/AddTodo';
import DeleteTodo from '../deleteTodo/DeleteTodo';
import useShowAddTodo from './hooks/useShowAddTodo';
import ActionListSeparator from './components/ActionListSeparator';
import ActionListGroup from './components/ActionListGroup';

type Props = {
    todo: Todo;
    current: boolean;
    onDescriptionClick: MouseEventHandler;
    todoIndexInFlatCollection: number;
};

export enum Mode {
    View = 'view',
    Edit = 'edit',
}

const ViewTodo: VFC<Props> = ({ todo, current, onDescriptionClick, todoIndexInFlatCollection }) => {
    const [mode, setMode] = useState<Mode>(Mode.View);

    const { update } = useManageTodos();

    const toggleDone = useCallback(() => {
        update(todo.uuid, {
            doneAt: todo.doneAt instanceof Date ? null : new Date(),
        });
    }, [todo.doneAt, todo.uuid, update]);

    useStartEditWithKeyboardShortcut(current, mode, setMode);
    useToggleToggleDoneWithKeyboardShortcut(current, mode, toggleDone);

    const { onEditClick, onMustClick, onShouldClick, onCouldClick, onWouldClick, onDeleteClick } =
        useHandleActionListClickEvents(todo, setMode);

    const className = createClassName('p-2', 'rounded-sm', {
        'bg-blue-100': current,
    });

    const ref = useScrollIntoView<HTMLDivElement>(current);

    const {
        location: showAddLocation,
        hide: hideAdd,
        onAddBeforeButtonClick,
        onAddAfterButtonClick,
    } = useShowAddTodo();

    return (
        <div ref={ref}>
            {mode === Mode.Edit && <EditTodo todo={todo} onDone={() => setMode(Mode.View)} />}
            {mode === Mode.View && (
                <>
                    {current && showAddLocation === 'before' && (
                        <AddTodo
                            priority={todo.priority}
                            atIndex={todoIndexInFlatCollection}
                            onDone={hideAdd}
                            className="my-5"
                        />
                    )}
                    <div className={className}>
                        <div className="flex gap-3 justify-start items-start">
                            <Checkbox todo={todo} onChange={toggleDone} />
                            <Description
                                todo={todo}
                                onDoubleClick={() => setMode(Mode.Edit)}
                                onClick={onDescriptionClick}
                                current={current}
                                className="w-full"
                            />
                            {!todo.doneAt && <Period todo={todo} className="float-right flex-none" />}
                        </div>
                        {current && !todo.doneAt && (
                            <ActionList level={1}>
                                <ActionListGroup label="priority">
                                    <ActionButton onClick={onMustClick} disabled={todo.priority === 'must'}>
                                        must
                                    </ActionButton>
                                    <ActionButton onClick={onShouldClick} disabled={todo.priority === 'should'}>
                                        should
                                    </ActionButton>
                                    <ActionButton onClick={onCouldClick} disabled={todo.priority === 'could'}>
                                        could
                                    </ActionButton>
                                    <ActionButton onClick={onWouldClick} disabled={todo.priority === 'would'}>
                                        would
                                    </ActionButton>
                                </ActionListGroup>
                                <ActionListSeparator />
                                <ActionListGroup label="add new">
                                    <ActionButton onClick={onAddBeforeButtonClick} disabled={showAddLocation !== null}>
                                        before
                                    </ActionButton>
                                    <ActionButton onClick={onAddAfterButtonClick} disabled={showAddLocation !== null}>
                                        after
                                    </ActionButton>
                                </ActionListGroup>
                                <ActionListSeparator />
                                <ActionButton onClick={onEditClick}>edit</ActionButton>
                                <ActionButton onClick={onDeleteClick}>delete</ActionButton>
                            </ActionList>
                        )}
                    </div>
                    {current && showAddLocation === 'after' && (
                        <AddTodo
                            priority={todo.priority}
                            atIndex={todoIndexInFlatCollection + 1}
                            onDone={hideAdd}
                            className="my-5"
                        />
                    )}
                    {current && <DeleteTodo todo={todo} />}
                </>
            )}
        </div>
    );
};

export default ViewTodo;
