import { TodoCollection, TodoPriority } from '../../../../../../model/todo';
import { FilterMap } from '../hooks/useHandleFilterOptions';
import { sortObjectByKey } from '../../../../../../utility/objectUtilities';
import { FilterState, Preset, TypeToCheckedStatusMap } from '../../../hooks/useHandleFilterState';
import { checkIsToday } from '../../../../../../utility/dateTimeUtilities';

export function composePriorityFilterMap(todos: TodoCollection): FilterMap<TodoPriority> {
    const found: FilterMap = {
        must: 0,
        should: 0,
        could: 0,
        would: 0,
    };

    todos.forEach((todo) => {
        found[todo.priority]++;
    });

    return found;
}

export function composePresetFilterMap(todos: TodoCollection): FilterMap<Preset> {
    const map: FilterMap<Preset> = {
        postponed: 0,
    };

    todos.forEach((todo) => {
        if (todo.start === null || checkIsToday(todo.start)) {
            map.postponed++;
        }
    });

    return map;
}

export function composeProjectFilterMap(todos: TodoCollection): FilterMap {
    const projectsMap: FilterMap = {};

    todos.forEach((todo) => {
        if (!todo.project) {
            return;
        }

        const key = todo.project.toLowerCase();

        if (projectsMap[key] === undefined) {
            projectsMap[key] = 0;
        }

        projectsMap[key]++;
    });

    return sortObjectByKey(projectsMap);
}

export function composeTagsFilterMap(todos: TodoCollection): FilterMap {
    const tagsMap: FilterMap = {};

    todos.forEach((todo) => {
        todo.tags.forEach((tag) => {
            const key = tag.toLowerCase();

            if (tagsMap[key] === undefined) {
                tagsMap[key] = 0;
            }

            tagsMap[key]++;
        });
    });

    return sortObjectByKey(tagsMap);
}

export function determineAmountOfAppliedFilters(appliedFilters: FilterState): number {
    let count = 0;

    const keys = Object.keys(appliedFilters) as Array<keyof FilterState>;

    keys.forEach((filterGroup) => {
        const filters = appliedFilters[filterGroup] as TypeToCheckedStatusMap;

        const filterKeys = Object.keys(filters);

        filterKeys.forEach((filterKey) => {
            if (!filters[filterKey]) {
                count++;
            }
        });
    });

    return count;
}
