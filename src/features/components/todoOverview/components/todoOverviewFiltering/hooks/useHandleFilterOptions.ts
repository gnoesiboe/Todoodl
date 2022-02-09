import { TodoCollection, TodoPriority } from '../../../../../../model/todo';
import { useEffect, useState } from 'react';
import {
    composePresetFilterMap,
    composePriorityFilterMap,
    composeProjectFilterMap,
    composeTagsFilterMap,
} from '../utilities/optionExtractionUtilities';
import { Preset } from '../../../hooks/useHandleFilterState';

export type FilterMap<OptionType extends string = string> = Record<OptionType, number>;

type FilterOptions = {
    priorities: FilterMap<TodoPriority>;
    presets: FilterMap<Preset>;
    projects: FilterMap;
    tags: FilterMap;
};

const determineFilterOptions = (todos: TodoCollection): FilterOptions => {
    const priorities = composePriorityFilterMap(todos);
    const presets = composePresetFilterMap(todos);
    const projects = composeProjectFilterMap(todos);
    const tags = composeTagsFilterMap(todos);

    return {
        priorities,
        presets,
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
