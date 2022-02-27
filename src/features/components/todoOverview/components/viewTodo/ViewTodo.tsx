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
    onDescriptionClick: () => void;
    todoIndexInFlatCollection: number;
    isLast: boolean;
};

export enum Mode {
    View = 'view',
    Edit = 'edit',
}

const ViewTodo: VFC<Props> = ({ todo, current, onDescriptionClick, todoIndexInFlatCollection, isLast }) => {
    const [mode, setMode] = useState<Mode>(Mode.View);

    const { update, move } = useManageTodos();

    const toggleDone = useCallback(() => {
        update(todo.uuid, {
            doneAt: todo.doneAt instanceof Date ? null : new Date(),
        });
    }, [todo.doneAt, todo.uuid, update]);

    useStartEditWithKeyboardShortcut(current, mode, setMode);
    useToggleToggleDoneWithKeyboardShortcut(current, mode, toggleDone);

    const {
        onEditClick,
        onMustClick,
        onShouldClick,
        onCouldClick,
        onWouldClick,
        onDeleteClick,
        onTomorrowClick,
        onNextWeekClick,
    } = useHandleActionListClickEvents(todo, setMode);

    const className = createClassName('p-2', 'rounded-sm', {
        'bg-blue-100': current,
    });

    const ref = useScrollIntoView<HTMLDivElement>(current);

    const {
        location: showAddLocation,
        hide: hideAdd,
        onAddBeforeButtonClick,
        onAddAfterButtonClick,
    } = useShowAddTodo(current);

    return (
        <div ref={ref}>
            {mode === Mode.Edit && <EditTodo todo={todo} onDone={() => setMode(Mode.View)} />}
            {mode === Mode.View && (
                <>
                    {showAddLocation === 'before' && (
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
                                onClick={(event) => {
                                    // Attempt to fix problem where unexpected actions are executed when you move through the todos
                                    event.preventDefault();
                                    event.stopPropagation();

                                    onDescriptionClick();
                                }}
                                current={current}
                                className="w-full"
                            />
                            {!todo.doneAt && <Period todo={todo} className="float-right flex-none" />}
                        </div>
                        {current && (
                            <ActionList level={1}>
                                <ActionListGroup label="priority">
                                    <ActionButton
                                        onClick={onMustClick}
                                        disabled={todo.priority === 'must' || !!todo.doneAt}
                                    >
                                        must
                                    </ActionButton>
                                    <ActionButton
                                        onClick={onShouldClick}
                                        disabled={todo.priority === 'should' || !!todo.doneAt}
                                    >
                                        should
                                    </ActionButton>
                                    <ActionButton
                                        onClick={onCouldClick}
                                        disabled={todo.priority === 'could' || !!todo.doneAt}
                                    >
                                        could
                                    </ActionButton>
                                    <ActionButton
                                        onClick={onWouldClick}
                                        disabled={todo.priority === 'would' || !!todo.doneAt}
                                    >
                                        would
                                    </ActionButton>
                                </ActionListGroup>
                                <ActionListSeparator />
                                <ActionListGroup label="postpone">
                                    <ActionButton onClick={onTomorrowClick} disabled={!!todo.doneAt}>
                                        tomorrow
                                    </ActionButton>
                                    <ActionButton onClick={onNextWeekClick} disabled={!!todo.doneAt}>
                                        next week
                                    </ActionButton>
                                </ActionListGroup>
                                <ActionListSeparator />
                                <ActionListGroup label="new">
                                    <ActionButton onClick={onAddBeforeButtonClick} disabled={showAddLocation !== null}>
                                        before
                                    </ActionButton>
                                    <ActionButton onClick={onAddAfterButtonClick} disabled={showAddLocation !== null}>
                                        after
                                    </ActionButton>
                                </ActionListGroup>
                                <ActionListSeparator />
                                <ActionListGroup label="move">
                                    <ActionButton
                                        onClick={() => move(todoIndexInFlatCollection, todoIndexInFlatCollection - 1)}
                                        disabled={todoIndexInFlatCollection === 0}
                                    >
                                        up
                                    </ActionButton>
                                    <ActionButton
                                        onClick={() => move(todoIndexInFlatCollection, todoIndexInFlatCollection + 1)}
                                        disabled={isLast}
                                    >
                                        down
                                    </ActionButton>
                                </ActionListGroup>
                                <ActionListSeparator />
                                <ActionButton onClick={onEditClick}>edit</ActionButton>
                                <ActionListSeparator />
                                <ActionButton onClick={onDeleteClick}>delete</ActionButton>
                            </ActionList>
                        )}
                    </div>
                    {showAddLocation === 'after' && (
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
