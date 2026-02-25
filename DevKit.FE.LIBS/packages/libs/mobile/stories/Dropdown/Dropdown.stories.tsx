import React, { useState } from 'react';
import { View } from 'react-native';
import { DropdownProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { Button } from '../../src/components/Buttons';
import Dropdown from '../../src/components/Dropdown/Dropdown';

type ItemType = { id: string; label: string };

type ComponentType = (args: DropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	const [dropDownState, setDropdownState] = useState('');
	const options: ItemType[] = [
		{ id: '1', label: 'Inpatient' },
		{ id: '2', label: 'Dental' },
		{ id: '3', label: 'Outpatient' },
		{ id: '4', label: 'Inpatient2' },
		{ id: '5', label: 'Dental2' },
		{ id: '6', label: 'Outpatient2' },
		{ id: '7', label: 'Inpatient3' },
		{ id: '8', label: 'Dental3' },
		{ id: '9', label: 'Outpatient3' },
		{ id: '14', label: 'Inpatient4' },
		{ id: '15', label: 'Dental4' },
		{ id: '16', label: 'Outpatient4' },
		{ id: '17', label: 'Inpatient5' },
		{ id: '22', label: 'Dental5' },
		{ id: '23', label: 'Outpatient5' },
		{ id: '24', label: 'Inpatient6' },
		{ id: '25', label: 'Dental6' },
		{ id: '26', label: 'Outpatient6' },
		{ id: '67', label: 'Inpatient7' },
		{ id: '72', label: 'Dental7' },
		{ id: '83', label: 'Outpatient7' },
		{ id: '84', label: 'Inpatient8' },
		{ id: '85', label: 'Dental8' },
		{ id: '86', label: 'Outpatient8' },
	];

	return (
		<View>
			<Dropdown
				label="Label"
				options={options}
				labelKey="label"
				valueKey="id"
				value={dropDownState}
				placeholder="Select an option"
				getIsItemDisabled={(item) => {
					return item.id === '2';
				}}
				onChange={(selectedItem) => {
					setDropdownState(selectedItem || '');
				}}
			/>
			<View style={{ padding: 20 }}>
				<Button
					onPress={() => {
						setDropdownState('');
					}}
				>
					Reset
				</Button>
			</View>
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Dropdown',
	render: Template,
};

export default StoryMeta;

export const Default: StoryObj<DropdownProps<ItemType, 'label', never, undefined>> = {
	args: { label: 'Dropdown', placeholder: 'Please select', onSearch: undefined },
};
