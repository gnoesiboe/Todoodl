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

const PresetChoiceList: VFC<Props> = ({ appliedFilters, togglePreset, filterMap }) => (
    <SectionContainer>
        <SectionHeading label="Preset" />
        <FilterList>
            <Label label="postponed" checked={appliedFilters['postponed']} amount={filterMap['postponed']}>
                <Checkbox checked={appliedFilters['postponed']} toggleChecked={() => togglePreset('postponed')} />
            </Label>
            <Label label="waiting" checked={appliedFilters['waiting']} amount={filterMap['waiting']}>
                <Checkbox checked={appliedFilters['waiting']} toggleChecked={() => togglePreset('waiting')} />
            </Label>
        </FilterList>
    </SectionContainer>
);

export default PresetChoiceList;
