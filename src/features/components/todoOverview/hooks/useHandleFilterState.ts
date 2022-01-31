import { TodoCollection, TodoPriority } from '../../../../model/todo';
import { useState } from 'react';
import produce from 'immer';
import { extractAllProjects, extractAllTags } from '../utility/collectionUtilities';

export type TypeToCheckedStatusMap<KeyType extends string = string> = Record<KeyType, boolean>;

export type FilterState = {
    priorities: TypeToCheckedStatusMap<TodoPriority>;
    projects: TypeToCheckedStatusMap;
    tags: TypeToCheckedStatusMap;
};

export type TogglePriorityHandler = (priority: TodoPriority) => void;

export type ToggleProjectHandler = (project: string) => void;

export type ToggleTagHandler = (tag: string) => void;

export default function useHandleFilterState(todos: TodoCollection) {
    const [appliedFilters, setAppliedFilters] = useState<FilterState>(() => {
        const allProjects = extractAllProjects(todos);
        const projectMap: TypeToCheckedStatusMap = {};
        allProjects.forEach((project) => (projectMap[project] = true));

        const allTags = extractAllTags(todos);
        const tagsMap: TypeToCheckedStatusMap = {};
        allTags.forEach((tag) => (tagsMap[tag] = true));

        return {
            priorities: {
                must: true,
                should: true,
                could: true,
                would: true,
            },
            projects: projectMap,
            tags: tagsMap,
        };
    });

    const togglePriority: TogglePriorityHandler = (priority) => {
        setAppliedFilters((currentFilterState) => {
            return produce<FilterState>(currentFilterState, (newFilterState) => {
                newFilterState.priorities[priority] = !newFilterState.priorities[priority];
            });
        });
    };

    const toggleProject: ToggleProjectHandler = (project) => {
        setAppliedFilters((currentFilterState) => {
            return produce<FilterState>(currentFilterState, (newFilterState) => {
                newFilterState.projects[project] = !newFilterState.projects[project];
            });
        });
    };

    const toggleTag: ToggleTagHandler = (tag) => {
        setAppliedFilters((currentFilterState) => {
            return produce<FilterState>(currentFilterState, (newFilterState) => {
                newFilterState.tags[tag] = !newFilterState.tags[tag];
            });
        });
    };

    return { appliedFilters, togglePriority, toggleProject, toggleTag };
}
