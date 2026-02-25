import React, { useState } from 'react';
import { View } from 'react-native';
import { DropdownProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import Dropdown from '../../src/components/Dropdown/Dropdown';

type ItemType = { id: string; label: string };

type ComponentType = (args: DropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	const [dropDownState, setDropdownState] = useState<string>('');
	const options: ItemType[] = [
		{ id: '1', label: 'Inpatient' },
		{ id: '2', label: 'Dental' },
		{ id: '3', label: 'Outpatient' },
		{ id: '4', label: 'Inpatient2' },
		{ id: '5', label: 'Dental2' },
		{ id: '6', label: 'Outpatient2' },
	];

	return (
		<View style={{ padding: 20, height: '100%' }}>
			<Dropdown
				options={options}
				value={dropDownState}
				labelKey="label"
				valueKey="id"
				placeholder="Select an option"
				onChange={(selectedItem) => {
					setDropdownState(selectedItem || '');
				}}
				disabled={true}
			/>
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Dropdown',
	render: Template,
};

export default StoryMeta;

export const DisabledDropdown: StoryObj<DropdownProps<ItemType, 'label', never, undefined>> = {
	args: { label: 'Dropdown', placeholder: 'Please select', onSearch: undefined },
};
