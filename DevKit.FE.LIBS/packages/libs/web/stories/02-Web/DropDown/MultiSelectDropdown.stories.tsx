import { useState } from 'react';
import { MultipleSelectDropdownProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { MultiSelectDropdown as MultiSelectDropdownComponent } from '../../../src/components/Dropdown/MultiSelectDropdown';

type ItemType = { id: string; label: string };

type ComponentType = (args: MultipleSelectDropdownProps<ItemType, 'id', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [dropDownState, setDropdownState] = useState<string[]>();
	const options = [
		{ id: '0', label: 'Inpatient' },
		{ id: '1', label: 'Dental' },
		{ id: '2', label: 'Outpatient' },
		{ id: '3', label: 'Inpatient2' },
		{ id: '4', label: 'Dental2' },
		{ id: '5', label: 'Outpatient2' },
	];

	return (
		<>
			<div className="grid grid-cols-2 gap-4 pt-6 md:grid-cols-3 md:gap-8">
				<MultiSelectDropdownComponent
					{...args}
					value={dropDownState}
					onChange={(val) => {
						setDropdownState(val);
					}}
					placeholder="Search insurer company"
					options={options}
					valueKey="id"
					labelKey="label"
					label="Insurer Company"
					isClearable={true}
					disabled={false}
					isSearchable={true}
				/>
			</div>

			<div className="mt-3">
				<span className="font-bold">Selected Values: </span>
				{JSON.stringify(dropDownState, null, 2)}
			</div>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Multi-Select-Dropdown',
	component: MultiSelectDropdownComponent,
	render: Template,
};

export default StoryMeta;

export const MultiSelectDropdown = {};
