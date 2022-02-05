import React, { VFC } from 'react';
import ViewTodo from './components/viewTodo/ViewTodo';
import { TodoPriority } from '../../../model/todo';
import useManageCurrentTodo from './hooks/useManageCurrentTodo';
import AddTodo from './components/addTodo/AddTodo';
import DeleteTodo from './components/deleteTodo/DeleteTodo';
import { sortGroupAndFilterTodos } from './utility/collectionUtilities';
import PriorityGroup from './components/PriorityGroup';
import PriorityList from './components/PriorityList';
import TodoList from './components/TodoList';
import TodoOverviewFiltering from './components/todoOverviewFiltering/TodoOverviewFiltering';
import useHandleFilterState from './hooks/useHandleFilterState';
import { resolveIndexInFlatCollection } from './utility/todoResolver';
import Heading from '../../../primitives/heading/Heading';
import useMoveTodoWithKeyboardShortcut from './hooks/useMoveTodoWithKeyboardShortcut';
import { useTodos } from '../../../context/todo/TodoContext';
import LoadingIndicator from '../../../primitives/loadingIndicator/LoadingIndicator';

const TodoOverview: VFC = () => {
    const { todos, loading } = useTodos();

    const { appliedFilters, togglePriority, toggleProject, toggleTag } = useHandleFilterState(todos || []);

    const todosPreparedForDisplay = sortGroupAndFilterTodos(todos || [], appliedFilters);

    const { currentTodoUuid, setCurrentTodoUuid } = useManageCurrentTodo(todosPreparedForDisplay);

    const priorities = Object.keys(todosPreparedForDisplay) as TodoPriority[];

    useMoveTodoWithKeyboardShortcut(currentTodoUuid, todos || []);

    return (
        <section className="space-y-4 md:border-gray-300 md:border md:rounded-md pb-6">
            <div className="p-4 text-center bg-blue-400">
                <Heading as="h1" variant="primary">
                    @todo
                </Heading>
            </div>
            <div className="p-4 space-y-8">
                {loading && <LoadingIndicator size="extraSmall" centered timeout={0} />}

                {todos && (
                    <>
                        {todos.length > 0 ? (
                            <>
                                <TodoOverviewFiltering
                                    todos={todos}
                                    appliedFilters={appliedFilters}
                                    togglePriority={togglePriority}
                                    toggleProject={toggleProject}
                                    toggleTag={toggleTag}
                                />
                                <PriorityList>
                                    {priorities.map((priority) => (
                                        <PriorityGroup name={priority} key={priority}>
                                            {todosPreparedForDisplay[priority].length > 0 ? (
                                                <TodoList>
                                                    {todosPreparedForDisplay[priority].map((todo, index) => {
                                                        const current = todo.uuid === currentTodoUuid;
                                                        const todoIndexInFlatCollection = resolveIndexInFlatCollection(
                                                            todo,
                                                            todos,
                                                        );

                                                        return (
                                                            <ViewTodo
                                                                key={todo.uuid}
                                                                todo={todo}
                                                                current={current}
                                                                onDescriptionClick={() => setCurrentTodoUuid(todo.uuid)}
                                                                renderBefore={() => (
                                                                    <AddTodo
                                                                        priority={todo.priority}
                                                                        atIndex={todoIndexInFlatCollection}
                                                                        location="before"
                                                                    />
                                                                )}
                                                                renderAfter={() => (
                                                                    <>
                                                                        <AddTodo
                                                                            priority={todo.priority}
                                                                            atIndex={todoIndexInFlatCollection}
                                                                            location="after"
                                                                        />
                                                                        <DeleteTodo todo={todo} />
                                                                    </>
                                                                )}
                                                            />
                                                        );
                                                    })}
                                                </TodoList>
                                            ) : (
                                                <i>n.a.</i>
                                            )}
                                        </PriorityGroup>
                                    ))}
                                </PriorityList>
                            </>
                        ) : (
                            <AddTodo atIndex={0} priority="must" location="after" initiallyVisible />
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default TodoOverview;
