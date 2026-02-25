import React, { useState } from 'react';
import { View } from 'react-native';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { CheckActionMenu, ICheckActionMenuProps } from '../../src/components/ActionMenu';

type ComponentType = (args: ICheckActionMenuProps<string>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const items = [
		{ id: '0', label: 'Premium (High-Low)' },
		{ id: '1', label: 'Premium (Low-High)' },
		{ id: '2', label: 'Annual Limit (Low-High)' },
		{ id: '3', label: 'Annual Limit (Hight-Low)' },
	];
	const [selectedItem, setSelectedItem] = useState<string>(items[0].id);

	return (
		<View style={{ flex: 1, flexWrap: 'wrap', gap: 20, marginTop: 30 }}>
			<CheckActionMenu {...args} items={items} value={selectedItem} onChange={(id) => setSelectedItem(id)}>
				{items.find((ele) => ele.id === selectedItem)?.label || ''}
			</CheckActionMenu>
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/ActionMenu',
	component: Template,
	argTypes: {
		textSize: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			defaultValue: 'small',
		},
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'text'],
			defaultValue: 'primary',
		},
	},
};

export default StoryMeta;

export const CheckAction = {
	args: {
		disabled: false,
		textSize: 'medium',
		variant: 'text',
	},
};
