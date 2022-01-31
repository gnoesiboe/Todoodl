import { TodoCollection, TodoPriority } from '../../../../../../model/todo';
import { useEffect, useState } from 'react';
import {
    composePriorityFilterMap,
    composeProjectFilterMap,
    composeTagsFilterMap,
} from '../utilities/optionExtractionUtilities';

export type FilterMap<OptionType extends string = string> = Record<OptionType, number>;

type FilterOptions = {
    priorities: FilterMap<TodoPriority>;
    projects: FilterMap;
    tags: FilterMap;
};

const determineFilterOptions = (todos: TodoCollection): FilterOptions => {
    const priorities = composePriorityFilterMap(todos);
    const projects = composeProjectFilterMap(todos);
    const tags = composeTagsFilterMap(todos);

    return {
        priorities,
        projects,
        tags,
    };
};

export default function useHandleFilterOptions(todos: TodoCollection): FilterOptions {
    const [options, setOptions] = useState<FilterOptions>(() => determineFilterOptions(todos));

    useEffect(() => {
        setOptions(() => determineFilterOptions(todos));
    }, [todos]);

    return options;
}
