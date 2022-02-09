import { TodoCollection, TodoPriority } from '../../../../model/todo';
import { useEffect, useState } from 'react';
import produce from 'immer';
import { extractAllProjects, extractAllTags } from '../utility/collectionUtilities';

export type TypeToCheckedStatusMap<KeyType extends string = string> = Record<KeyType, boolean>;

export type Preset = 'postponed' | 'waiting';

export type FilterState = {
    priorities: TypeToCheckedStatusMap<TodoPriority>;
    presets: TypeToCheckedStatusMap<Preset>;
    projects: TypeToCheckedStatusMap;
    tags: TypeToCheckedStatusMap;
};

export type TogglePriorityHandler = (priority: TodoPriority) => void;

export type ToggleProjectHandler = (project: string) => void;

export type ToggleTagHandler = (tag: string) => void;

export type TogglePresetHandler = (preset: Preset) => void;

export default function useHandleFilterState(todos: TodoCollection) {
    const [appliedFilters, setAppliedFilters] = useState<FilterState>(() => {
        const allUsedProjects = extractAllProjects(todos);
        const projectMap: TypeToCheckedStatusMap = {};
        allUsedProjects.forEach((project) => (projectMap[project] = true));

        const allUsedTags = extractAllTags(todos);
        const tagsMap: TypeToCheckedStatusMap = {};
        allUsedTags.forEach((tag) => (tagsMap[tag] = true));

        return {
            priorities: {
                must: true,
                should: true,
                could: true,
                would: true,
            },
            presets: {
                postponed: true,
                waiting: true,
            },
            projects: projectMap,
            tags: tagsMap,
        };
    });

    useEffect(() => {
        const allUsedProjects = extractAllProjects(todos);
        const allUsedTags = extractAllTags(todos);

        setAppliedFilters((currentAppliedFilters) => {
            return produce<FilterState>(currentAppliedFilters, (newAppliedFilters) => {
                allUsedProjects.forEach((usedProject) => {
                    if (newAppliedFilters.projects[usedProject] === undefined) {
                        newAppliedFilters.projects[usedProject] = true;
                    }
                });

                allUsedTags.forEach((usedTag) => {
                    if (newAppliedFilters.tags[usedTag] === undefined) {
                        newAppliedFilters.tags[usedTag] = true;
                    }
                });
            });
        });
    }, [todos]);

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

    const togglePreset: TogglePresetHandler = (preset) => {
        setAppliedFilters((currentFilterState) => {
            return produce<FilterState>(currentFilterState, (newFilterState) => {
                newFilterState.presets[preset] = !newFilterState.presets[preset];
            });
        });
    };

    return { appliedFilters, togglePriority, toggleProject, toggleTag, togglePreset };
}
