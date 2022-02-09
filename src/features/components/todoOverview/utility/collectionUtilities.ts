import { allPriorities, GroupedTodoCollection, TodoCollection } from '../../../../model/todo';
import { FilterState } from '../hooks/useHandleFilterState';
import { checkIsToday } from '../../../../utility/dateTimeUtilities';

export function sortGroupAndFilterTodos(todos: TodoCollection, appliedFilters: FilterState): GroupedTodoCollection {
    let filteredTodos = [...todos];

    Object.keys(appliedFilters.projects).forEach((filterKey) => {
        const filterValue = appliedFilters.projects[filterKey];

        if (filterValue) {
            return;
        }

        filteredTodos = filteredTodos.filter((todo) => {
            if (!todo.project) {
                return true;
            }

            return todo.project.toLowerCase() !== filterKey;
        });
    });

    Object.keys(appliedFilters.tags).forEach((filterKey) => {
        const filterValue = appliedFilters.tags[filterKey];

        if (filterValue) {
            return;
        }

        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.tags.some((cursorTag) => {
                return cursorTag.toLowerCase() === filterKey;
            });
        });
    });

    if (!appliedFilters.presets.postponed) {
        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.start || checkIsToday(todo.start);
        });
    }

    if (!appliedFilters.presets.done) {
        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.doneAt;
        });
    }

    const groupedTodos: GroupedTodoCollection = {
        must: [],
        should: [],
        could: [],
        would: [],
    };

    filteredTodos.forEach((todo) => {
        groupedTodos[todo.priority].push(todo);
    });

    allPriorities.forEach((priority) => {
        if (!appliedFilters.priorities[priority]) {
            delete groupedTodos[priority];
        }
    });

    return groupedTodos;
}

export function extractAllProjects(todos: TodoCollection) {
    const projects: string[] = [];

    todos.forEach((todo) => {
        if (!todo.project) {
            return;
        }

        const normalizedProject = todo.project.toLowerCase();

        if (projects.includes(normalizedProject)) {
            return;
        }

        projects.push(normalizedProject);
    });

    return projects;
}

export function extractAllTags(todos: TodoCollection) {
    const allTags: string[] = [];

    todos.forEach((todo) => {
        todo.tags.forEach((tag) => {
            const normalizedTag = tag.toLowerCase();

            if (!allTags.includes(normalizedTag)) {
                allTags.push(normalizedTag);
            }
        });
    });

    return allTags;
}
