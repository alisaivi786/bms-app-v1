import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ArrowDownIcon, ArrowUpIcon } from '@devkit/icons/native';
import { DropdownProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import Dropdown from '../../src/components/Dropdown/Dropdown';
import { useMobileUIConfigOptions } from '../../src/layouts';

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
		{ id: '8', label: 'Dental4' },
		{ id: '9', label: 'Outpatient5' },
		{ id: '10', label: 'Inpatient6' },
		{ id: '11', label: 'Dental7' },
		{ id: '12', label: 'Outpatient8' },
	];

	const { tw } = useMobileUIConfigOptions();

	return (
		<View style={{ padding: 20, height: '100%' }}>
			<Dropdown
				options={options}
				value={dropDownState}
				valueKey="id"
				labelKey="label"
				placeholder="Select an option"
				onChange={(selectedItem) => {
					setDropdownState(selectedItem || '');
				}}
				renderItem={(item, index: number) => (
					<View style={tw`justify-center items-center`}>
						<Text style={tw`text-normal	text-body text-gray-900 px-6 py-2.5 text-center`}>
							{item?.label} - {index}
						</Text>
					</View>
				)}
				renderSelectedItem={(item, isOpen) => {
					const isPlaceholder = !item?.label;

					return (
						<View
							style={tw`bg-white placeholder:text-left w-full rounded-md border border-gray-400 placeholder:text-gray-500 px-4 py-2.5 h-12 mt-1.5 flex-row justify-between items-center`}
						>
							<Text style={isPlaceholder ? tw`text-body` : tw`text-body text-gray-500`}>
								{item?.label ?? 'Select an option'}
							</Text>
							{isOpen ? (
								<ArrowDownIcon width={14} height={14} style={tw`text-body`} />
							) : (
								<ArrowUpIcon width={14} height={14} style={tw`text-body`} />
							)}
						</View>
					);
				}}
				bottomSheetTitle="Select an Option"
				bottomSheetCloseButton={true}
			/>
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Dropdown',
	render: Template,
};

export default StoryMeta;

export const CustomRenderer: StoryObj<DropdownProps<ItemType, 'label', never, undefined>> = {
	args: { label: 'Dropdown', placeholder: 'Please select', onSearch: undefined },
};
