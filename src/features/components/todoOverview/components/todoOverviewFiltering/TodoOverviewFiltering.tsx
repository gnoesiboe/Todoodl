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
import { X, Filter } from 'react-feather';
import { determineAmountOfAppliedFilters } from './utilities/optionExtractionUtilities';
import TagsChoiceList from './components/TagsChoiceList';
import createClassName from 'classnames';

type Props = {
    todos: TodoCollection;
    appliedFilters: FilterState;
    togglePriority: TogglePriorityHandler;
    toggleProject: ToggleProjectHandler;
    toggleTag: ToggleTagHandler;
    className?: string;
};

const TodoOverviewFiltering: VFC<Props> = ({
    todos,
    appliedFilters,
    togglePriority,
    toggleProject,
    toggleTag,
    className: additionalClassName,
}) => {
    const { visible, show, hide } = useToggleVisibility(true); // @todo revert

    const options = useHandleFilterOptions(todos);

    const appliedFilterCount = determineAmountOfAppliedFilters(appliedFilters);

    const containerClassName = createClassName('border-b-2', additionalClassName, {
        'pb-5': visible,
    });

    return (
        <div className={containerClassName}>
            {visible ? (
                <>
                    <div className="text-right">
                        <Button variant="unstyled" onClick={hide}>
                            <X />
                        </Button>
                    </div>
                    <div className="flex gap-x-10 gap-y-5 flex-wrap">
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
                </>
            ) : (
                <Button variant="link" className="flex gap-2 items-center" deflated="x" onClick={show}>
                    <Filter size={14} /> Filter {appliedFilterCount > 0 && `(${appliedFilterCount})`}
                </Button>
            )}
        </div>
    );
};

export default TodoOverviewFiltering;
