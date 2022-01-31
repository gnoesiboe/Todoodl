import { VFC } from 'react';
import { FilterMap } from '../hooks/useHandleFilterOptions';
import { TodoPriority } from '../../../../../../model/todo';
import {
    FilterState,
    TogglePriorityHandler,
} from '../../../hooks/useHandleFilterState';
import FilterList from './FilterList';
import Checkbox from './Checkbox';
import Label from './Label';
import SectionHeading from './SectionHeading';
import SectionContainer from './SectionContainer';

type Props = {
    appliedFilters: FilterState['priorities'];
    filterMap: FilterMap<TodoPriority>;
    togglePriority: TogglePriorityHandler;
};

const PrioritiesChoiceList: VFC<Props> = ({
    appliedFilters,
    filterMap,
    togglePriority,
}) => {
    const priorities = Object.keys(filterMap) as TodoPriority[];

    return (
        <SectionContainer>
            <SectionHeading label="Priority" />
            <FilterList>
                {priorities.map((priority) => (
                    <Label
                        key={priority}
                        label={priority}
                        amount={filterMap[priority]}
                        checked={appliedFilters[priority]}
                    >
                        <Checkbox
                            checked={appliedFilters[priority]}
                            toggleChecked={() => togglePriority(priority)}
                        />
                    </Label>
                ))}
            </FilterList>
        </SectionContainer>
    );
};

export default PrioritiesChoiceList;
