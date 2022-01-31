import { VFC } from 'react';
import { FilterState, ToggleTagHandler } from '../../../hooks/useHandleFilterState';
import { FilterMap } from '../hooks/useHandleFilterOptions';
import SectionContainer from './SectionContainer';
import SectionHeading from './SectionHeading';
import FilterList from './FilterList';
import Label from './Label';
import Checkbox from './Checkbox';

type Props = {
    appliedFilters: FilterState['tags'];
    toggleTag: ToggleTagHandler;
    filterMap: FilterMap;
};

const TagsChoiceList: VFC<Props> = ({ appliedFilters, filterMap, toggleTag }) => {
    const tags = Object.keys(filterMap);

    return (
        <SectionContainer>
            <SectionHeading label="Tag" />
            <FilterList>
                {tags.map((tag) => (
                    <Label key={tag} label={tag} checked={appliedFilters[tag]} amount={filterMap[tag]}>
                        <Checkbox checked={appliedFilters[tag]} toggleChecked={() => toggleTag(tag)} />
                    </Label>
                ))}
            </FilterList>
        </SectionContainer>
    );
};

export default TagsChoiceList;
