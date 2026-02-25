import React, { useState } from 'react';
import { View } from 'react-native';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { GroupButtons as GroupButtonsComponent, GroupButtonsProps } from '../../src/components/GroupButtons';

type ItemType = { id: number; label: string };

type ComponentType = (args: GroupButtonsProps<ItemType, 'id'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [selectedButton, setSelectedButton] = useState<number | undefined>(1);

	return (
		<View style={{ flex: 1 }}>
			<GroupButtonsComponent
				{...args}
				selected={selectedButton}
				onChange={(index) => {
					setSelectedButton(index);
				}}
			/>
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/GroupButtons',
	component: GroupButtonsComponent,
	render: Template,
};

export default StoryMeta;

export const GroupButtons = {
	args: {
		options: [
			{ id: 1, label: 'Benefits' },
			{ id: 2, label: 'Network List' },
			{ id: 3, label: 'Member Prices' },
			{ id: 4, label: 'Co Payments' },
			{ id: 5, label: 'Exclusion' },
		],
		valueKey: 'id',
		labelKey: 'label',
	},
};

