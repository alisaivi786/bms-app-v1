import { useState } from 'react';
import { UserIcon } from '@devkit/icons/web';
import { MultipleSelectDropdownProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { MultiSelectDropdown as MultiSelectDropdownComponent } from '../../../src/components/Dropdown/MultiSelectDropdown';

type ItemType = { id: string; label: string };

type ComponentType = (args: MultipleSelectDropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [dropDownState, setDropdownState] = useState<string[]>([]);
	const options = [
		{ id: '0', label: 'Inpatient' },
		{ id: '1', label: 'Dental' },
		{ id: '2', label: 'Outpatient' },
		{ id: '3', label: 'Inpatient2' },
		{ id: '4', label: 'Dental2' },
		{ id: '5', label: 'Outpatient2' },
	];

	const getIsItemDisabled = args.enableSelectAll
		? undefined
		: (item: ItemType) => {
				return item.label === 'Inpatient';
		  };

	return (
		<>
			<div className="grid grid-cols-2 gap-4 pt-6 md:grid-cols-3 md:gap-8">
				<MultiSelectDropdownComponent
					value={dropDownState}
					onChange={(val) => {
						setDropdownState(val ?? []);
					}}
					placeholder="Search insurer company"
					options={options}
					valueKey="id"
					directChange={true}
					labelKey="label"
					label="Insurer Company"
					isClearable={true}
					disabled={false}
					isSearchable={true}
					showCount={args.showCount}
					getIsItemDisabled={getIsItemDisabled}
					renderItem={(val) => (
						<div className="flex gap-3 justify-between items-center">
							<div className="flex gap-2 ">
								<UserIcon />
								<div className="text-paragraph">{val?.label}</div>
							</div>
						</div>
					)}
					enableSelectAll={args.enableSelectAll}
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

export const MultiSelectDirectChangeDropdown = {};

export const MultiSelectSelectAll = {
	args: {
		enableSelectAll: true,
	},
};

export const MultiSelectShowCount = {
	args: {
		showCount: true,
		enableSelectAll: true,
	},
};
