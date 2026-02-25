import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import {
	ButtonDropdown as ButtonDropdownComponent,
	ButtonDropdownOptionType,
	IButtonDropdownType,
} from '../../../src/components/ButtonDropdown';
import Button from '../../../src/components/Buttons/Button';

type ComponentType = (args: IButtonDropdownType) => JSX.Element;

const optionsWithSections: ButtonDropdownOptionType[] = [
	{ id: '0', label: 'Carrots', group: 'Vegetables', section: 'Main' },
	{ id: '1', label: 'Broccoli', group: 'Vegetables', section: 'Main' },
	{ id: '2', label: 'Tomatoes', group: 'Vegetables', section: 'Main' },
	{ id: '3', label: 'Spinach', group: 'Vegetables', section: 'Main' },
	{ id: '4', label: 'Bell Peppers', group: 'Vegetables', section: 'Main' },
	{ id: '6', label: 'Apple', group: 'Fruits', section: 'Secondary' },
	{ id: '7', label: 'Banana', group: 'Fruits', section: 'Secondary' },
	{ id: '8', label: 'Orange', group: 'Fruits', section: 'Secondary' },
	{ id: '9', label: 'Strawberry', group: 'Fruits', section: 'Secondary' },
	{ id: '10', label: 'Pineapple', group: 'Fruits', section: 'Secondary' },
];

const optionsWithGroups: ButtonDropdownOptionType[] = [
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

const optionsFlat: ButtonDropdownOptionType[] = [
	{ id: '0', label: 'Carrots' },
	{ id: '1', label: 'Broccoli' },
	{ id: '2', label: 'Tomatoes' },
	{ id: '3', label: 'Spinach' },
	{ id: '4', label: 'Bell Peppers' },
	{ id: '6', label: 'Apple' },
	{ id: '7', label: 'Banana' },
	{ id: '8', label: 'Orange' },
	{ id: '9', label: 'Strawberry' },
	{ id: '10', label: 'Pineapple' },
];

const optionsWithDisabled: ButtonDropdownOptionType[] = [
	{ id: '0', label: 'Carrots' },
	{ id: '1', label: 'Broccoli', disabled: true },
	{ id: '2', label: 'Tomatoes' },
	{ id: '3', label: 'Spinach', disabled: true },
	{ id: '4', label: 'Bell Peppers' },
	{ id: '6', label: 'Apple', disabled: true },
	{ id: '7', label: 'Banana' },
	{ id: '8', label: 'Orange' },
	{ id: '9', label: 'Strawberry' },
	{ id: '10', label: 'Pineapple' },
];

const optionsWithSectionsNoGroups: ButtonDropdownOptionType[] = [
	{ id: '0', label: 'Carrots', section: 'Main' },
	{ id: '1', label: 'Broccoli', section: 'Main' },
	{ id: '2', label: 'Tomatoes', section: 'Main' },
	{ id: '3', label: 'Spinach', section: 'Main' },
	{ id: '4', label: 'Bell Peppers', section: 'Main' },
	{ id: '6', label: 'Apple', section: 'Secondary' },
	{ id: '7', label: 'Banana', section: 'Secondary' },
	{ id: '8', label: 'Orange', section: 'Secondary' },
	{ id: '9', label: 'Strawberry', section: 'Secondary' },
	{ id: '10', label: 'Pineapple', section: 'Secondary' },
];

const Template: StoryFn<ComponentType> = (args) => {
	const initialValue = args.value ?? [args.options[0].id];
	const [value, setValue] = useState<string[]>(initialValue);

	const onApply = (val: string[]) => {
		setValue(val);
	};

	return (
		<>
			<div className="flex gap-6 lg:gap-16 mx-24 flex-wrap min-h-[300px]">
				<div className="flex ">
					<ButtonDropdownComponent
						{...args}
						label="Column Selector"
						value={value}
						onApplyClick={onApply}
						options={args.options}
					/>
				</div>
			</div>
			<div className="mt-3">
				<span className="font-bold">Selected Values: </span>
				{JSON.stringify(value, null, 2)}
			</div>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/ButtonDropdown',
	component: ButtonDropdownComponent,
	render: Template,
};

export default StoryMeta;

export const ButtonDropdown: StoryObj<ComponentType> = {
	args: {
		options: optionsFlat,
	},
	parameters: {
		docs: {
			description: {
				story: 'ButtonDropdown with a flat list of items.',
			},
		},
	},
};

export const ButtonDropdownDisabled: StoryObj<ComponentType> = {
	args: {
		options: optionsFlat,
		disabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'ButtonDropdown with a flat list of items.',
			},
		},
	},
};

export const GroupedButtonDropdown: StoryObj<ComponentType> = {
	args: {
		options: optionsWithGroups,
	},
	parameters: {
		docs: {
			description: {
				story: 'ButtonDropdown with items grouped by category.',
			},
		},
	},
};

export const SectionedGroupedButtonDropdown: StoryObj<ComponentType> = {
	args: {
		options: optionsWithSections,
	},
	parameters: {
		docs: {
			description: {
				story: 'ButtonDropdown with both sections and groups. Items are organized first by section.',
			},
		},
	},
};

export const SectionedButtonDropdown: StoryObj<ComponentType> = {
	args: {
		options: optionsWithSectionsNoGroups,
	},
	parameters: {
		docs: {
			description: {
				story: 'ButtonDropdown with items organized by section.',
			},
		},
	},
};

export const ButtonDropdownWithDisabledItems: StoryObj<ComponentType> = {
	args: {
		options: optionsWithDisabled,
		value: ['1', '6'],
	},
	parameters: {
		docs: {
			description: {
				story: 'ButtonDropdown with disabled items. Disabled items cannot be toggled and keep their current state.',
			},
		},
	},
};

export const ButtonDropdownParentValueUpdate: StoryObj<ComponentType> = {
	args: {
		options: optionsWithGroups,
		value: ['0', '1'],
	},
	render: (args) => {
		const [externalValue, setExternalValue] = useState<string[]>(args.value ?? []);

		return (
			<div className="mx-24 min-h-[300px]">
				<div className="mb-4 flex gap-2">
					<Button
						variant="secondary"
						onClick={() => {
							setExternalValue(['0', '1']);
						}}
					>
						Set Vegetables
					</Button>
					<Button
						variant="secondary"
						onClick={() => {
							setExternalValue(['6', '7', '8']);
						}}
					>
						Set Fruits
					</Button>
					<Button
						variant="secondary"
						onClick={() => {
							setExternalValue([]);
						}}
					>
						Clear
					</Button>
				</div>

				<div className="flex">
					<ButtonDropdownComponent
						{...args}
						label="Column Selector"
						value={externalValue}
						onApplyClick={(val) => {
							setExternalValue(val);
						}}
					/>
				</div>

				<div className="mt-3">
					<span className="font-bold">Parent Value: </span>
					{JSON.stringify(externalValue, null, 2)}
				</div>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					'Reproduction story: update `value` from parent buttons, then open dropdown to verify selected checkboxes reflect latest parent state.',
			},
		},
	},
};
