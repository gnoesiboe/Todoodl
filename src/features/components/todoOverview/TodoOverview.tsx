import React, { useState, VFC } from 'react';
import ViewTodo from './components/viewTodo/ViewTodo';
import { TodoCollection, TodoPriority } from '../../../model/todo';
import useManageCurrentTodo from './hooks/useManageCurrentTodo';
import AddTodo from './components/addTodo/AddTodo';
import DeleteTodo from './components/deleteTodo/DeleteTodo';
import useFetchTodosOnRepositoryChange from './hooks/useFetchTodosOnRepositoryChange';
import { getAllTodos } from '../../../repository/todoRepository';
import { sortGroupAndFilterTodos } from './utility/collectionUtilities';
import PriorityGroup from './components/PriorityGroup';
import PriorityList from './components/PriorityList';
import TodoList from './components/TodoList';
import TodoOverviewFiltering from './components/todoOverviewFiltering/TodoOverviewFiltering';
import useHandleFilterState from './hooks/useHandleFilterState';
import { resolveIndexInFlatCollection } from './utility/todoResolver';
import Heading from '../../../primitives/heading/Heading';
import useMoveTodoWithKeyboardShortcut from './hooks/useMoveTodoWithKeyboardShortcut';

const TodoOverview: VFC = () => {
    const [todos, setTodos] = useState<TodoCollection>(getAllTodos());

    const { appliedFilters, togglePriority, toggleProject, toggleTag } = useHandleFilterState(todos);

    useFetchTodosOnRepositoryChange(setTodos);

    const todosPreparedForDisplay = sortGroupAndFilterTodos(todos, appliedFilters);

    const currentTodoUuid = useManageCurrentTodo(todosPreparedForDisplay);

    const priorities = Object.keys(todosPreparedForDisplay) as TodoPriority[];

    useMoveTodoWithKeyboardShortcut(currentTodoUuid, todos);

    return (
        <section className="space-y-4 md:border-gray-300 md:border md:rounded-md pb-6">
            <div className="p-4 text-center bg-blue-400">
                <Heading as="h1" variant="primary">
                    @todo
                </Heading>
            </div>
            <div className="p-4 space-y-8">
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
                                        const todoIndexInFlatCollection = resolveIndexInFlatCollection(todo, todos);

                                        return (
                                            <ViewTodo
                                                key={todo.uuid}
                                                todo={todo}
                                                current={current}
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
            </div>
        </section>
    );
};

export default TodoOverview;
