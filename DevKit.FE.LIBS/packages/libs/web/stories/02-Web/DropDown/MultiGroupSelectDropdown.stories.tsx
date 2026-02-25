import { useState } from 'react';
import { MultipleSelectDropdownProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { MultiSelectDropdown as MultiSelectDropdownComponent } from '../../../src/components/Dropdown/MultiSelectDropdown';

type ItemType = { id: string; label: string; group: string };

type ComponentType = (args: MultipleSelectDropdownProps<ItemType, 'id', never, 'group' | undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	const [dropDownState, setDropdownState] = useState<string[]>();
	const options = [
		{ id: '0', label: 'Carrots', group: 'Vegetables' },
		{ id: '1', label: 'Broccoli', group: 'Vegetables' },
		{ id: '2', label: 'Tomatoes', group: 'Vegetables' },
		{ id: '3', label: 'Spinach', group: 'Vegetables' },
		{ id: '4', label: 'Bell Peppers', group: 'Vegetables' },
		{ id: '6', label: 'Apple', group: 'Fruits' },
		{ id: '7', label: 'Banana', group: 'Fruits' },
		{ id: '8', label: 'Orange', group: 'Fruits' },
		{ id: '9', label: 'Strawberry', group: 'Fruits' },
		{ id: '10', label: 'Pineapple', group: 'Fruits' },
	];

	return (
		<>
			<div className="grid grid-cols-2 gap-4 pt-6 md:grid-cols-3 md:gap-8">
				<MultiSelectDropdownComponent
					value={dropDownState}
					onChange={(val) => {
						setDropdownState(val);
					}}
					placeholder="Search insurer company"
					options={options}
					valueKey="id"
					groupKey="group"
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
	title: 'Web/Forms/Inputs/Multi-Select Dropdown',
	component: MultiSelectDropdownComponent,
	render: Template,
};

export default StoryMeta;

export const MultiGroupSelectDropdown = {};
