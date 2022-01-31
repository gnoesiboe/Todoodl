import { VFC } from 'react';
import { FilterState } from '../../../hooks/useHandleFilterState';
import FilterList from './FilterList';
import { FilterMap } from '../hooks/useHandleFilterOptions';
import Checkbox from './Checkbox';
import Label from './Label';
import SectionHeading from './SectionHeading';
import SectionContainer from './SectionContainer';

type Props = {
    appliedFilters: FilterState['projects'];
    toggleProject: (project: string) => void;
    filterMap: FilterMap;
};

const ProjectChoiceList: VFC<Props> = ({
    appliedFilters,
    filterMap,
    toggleProject,
}) => {
    const projects = Object.keys(filterMap);

    return (
        <SectionContainer>
            <SectionHeading label="Project" />
            <FilterList>
                {projects.map((project) => (
                    <Label
                        key={project}
                        label={project}
                        checked={appliedFilters[project]}
                        amount={filterMap[project]}
                    >
                        <Checkbox
                            checked={appliedFilters[project]}
                            toggleChecked={() => toggleProject(project)}
                        />
                    </Label>
                ))}
            </FilterList>
        </SectionContainer>
    );
};

export default ProjectChoiceList;
