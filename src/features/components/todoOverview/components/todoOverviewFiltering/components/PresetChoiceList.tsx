import { VFC } from 'react';
import { FilterState, Preset, TogglePresetHandler } from '../../../hooks/useHandleFilterState';
import { FilterMap } from '../hooks/useHandleFilterOptions';
import SectionHeading from './SectionHeading';
import FilterList from './FilterList';
import Checkbox from './Checkbox';
import Label from './Label';
import SectionContainer from './SectionContainer';

type Props = {
    appliedFilters: FilterState['presets'];
    togglePreset: TogglePresetHandler;
    filterMap: FilterMap<Preset>;
};

const PresetChoiceList: VFC<Props> = ({ appliedFilters, togglePreset, filterMap }) => {
    const presets = Object.keys(filterMap) as Preset[];

    return (
        <SectionContainer>
            <SectionHeading label="Preset" />
            <FilterList>
                {presets.map((preset) => (
                    <Label key={preset} label={preset} checked={appliedFilters[preset]} amount={filterMap[preset]}>
                        <Checkbox checked={appliedFilters[preset]} toggleChecked={() => togglePreset(preset)} />
                    </Label>
                ))}
            </FilterList>
        </SectionContainer>
    );
};

export default PresetChoiceList;
