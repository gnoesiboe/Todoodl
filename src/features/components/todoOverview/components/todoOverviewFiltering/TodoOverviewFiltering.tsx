import { VFC } from 'react';
import { TodoCollection } from '../../../../../model/todo';
import useHandleFilterOptions from './hooks/useHandleFilterOptions';
import PrioritiesChoiceList from './components/PrioritiesChoiceList';
import {
    FilterState,
    TogglePriorityHandler,
    ToggleProjectHandler,
    ToggleTagHandler,
} from '../../hooks/useHandleFilterState';
import ProjectChoiceList from './components/ProjectChoiceList';
import useToggleVisibility from '../../../../../hooks/useToggleVisibility';
import Button from '../../../../../primitives/button/Button';
import { X } from 'react-feather';
import { determineAmountOfAppliedFilters } from './utilities/optionExtractionUtilities';
import TagsChoiceList from './components/TagsChoiceList';

type Props = {
    todos: TodoCollection;
    appliedFilters: FilterState;
    togglePriority: TogglePriorityHandler;
    toggleProject: ToggleProjectHandler;
    toggleTag: ToggleTagHandler;
};

const TodoOverviewFiltering: VFC<Props> = ({ todos, appliedFilters, togglePriority, toggleProject, toggleTag }) => {
    const { visible, show, hide } = useToggleVisibility(false);

    const options = useHandleFilterOptions(todos);

    if (visible) {
        return (
            <div className="flex items-start justify-between border-b-2 pb-10">
                <div className="flex gap-10">
                    <PrioritiesChoiceList
                        appliedFilters={appliedFilters.priorities}
                        filterMap={options.priorities}
                        togglePriority={togglePriority}
                    />
                    <ProjectChoiceList
                        appliedFilters={appliedFilters.projects}
                        filterMap={options.projects}
                        toggleProject={toggleProject}
                    />
                    <TagsChoiceList
                        appliedFilters={appliedFilters.tags}
                        toggleTag={toggleTag}
                        filterMap={options.tags}
                    />
                </div>
                <Button variant="unstyled" onClick={hide}>
                    <X />
                </Button>
            </div>
        );
    }

    const appliedFilterCount = determineAmountOfAppliedFilters(appliedFilters);

    // @todo show number of filters applied
    return (
        <Button variant="primary" onClick={show}>
            Filter {appliedFilterCount > 0 && `(${appliedFilterCount})`}
        </Button>
    );
};

export default TodoOverviewFiltering;
