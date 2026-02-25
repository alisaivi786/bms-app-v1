import { useState } from 'react';
import { DropdownProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import { Dropdown } from '../../../src/components/Dropdown/Dropdown';

type ItemType = { id: string; label: string };

type ComponentType = (args: DropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [dropDownState, setDropdownState] = useState<string>();
	const options = [
		{ id: '0', label: 'Inpatient', group: 'test1' },
		{ id: '1', label: 'Dental', group: 'test1' },
		{ id: '2', label: 'Outpatient', group: 'test2' },
		{ id: '3', label: 'Inpatient2', group: 'test2' },
		{ id: '4', label: 'Dental2', group: 'test2' },
		{ id: '5', label: 'Outpatient2', group: 'test2' },
	];

	return (
		<>
			<div className="p-5">
				<Dropdown
					{...args}
					value={dropDownState}
					onChange={(val) => setDropdownState(val)}
					placeholder={args.placeholder}
					options={options}
					valueKey="id"
					labelKey="label"
					label={args.label}
					disabled={args.disabled}
					groupKey="group"
					description="Test Description"
					getIsItemDisabled={(item) => {
						return item.id === '2';
					}}
				/>
			</div>
			<div className="p-5">
				<Button
					onClick={() => {
						setDropdownState(undefined);
					}}
				>
					Reset
				</Button>
			</div>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Dropdown',
	component: Dropdown,
	render: Template,
};

export default StoryMeta;

export const Default: StoryObj<DropdownProps<ItemType, 'label', never, undefined>> = {
	args: { label: 'Dropdown', placeholder: 'Please select', onSearch: undefined },
};

export const HideValueLabel: StoryObj<DropdownProps<ItemType, 'label', never, undefined>> = {
	args: { label: 'Dropdown', placeholder: 'Please select', onSearch: undefined, hideValueLabel: true },
};
