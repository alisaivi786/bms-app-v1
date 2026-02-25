import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { GroupButtons as GroupButtonsComponent, GroupButtonsProps } from '../../../src/components/GroupButtons';

type ItemType = { id: number; label: string };

type ComponentType = (args: GroupButtonsProps<ItemType, 'id'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [selectedButton, setSelectedButton] = useState<number | undefined>(1);

	return (
		<div className="flex flex-col w-fit gap-5">
			<GroupButtonsComponent
				{...args}
				selected={selectedButton}
				onChange={(index) => {
					setSelectedButton(index);
				}}
			/>
			<p>{`Selected: ${args.options.find((o) => o.id === selectedButton)?.label}`}</p>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/GroupButtons',
	component: GroupButtonsComponent,
	render: Template,
};

export default StoryMeta;

export const GroupButtons = {
	args: {
		options: [
			{ id: 1, label: '<strong>Benefits</strong>' },
			{ id: 2, label: 'Network List' },
			{ id: 3, label: 'Member Prices' },
			{ id: 4, label: 'Co Payments' },
			{ id: 5, label: 'Exclusion' },
		],
		valueKey: 'id',
		labelKey: 'label',
	},
};

export const GroupButtonsWithDateRanges = {
	args: {
		options: [
			{ id: 1, label: 'Today' },
			{ id: 2, label: 'Yesterday' },
			{ id: 3, label: 'Last 7 Days' },
			{ id: 4, label: 'Last 30 Days' },
			{ id: 5, label: 'Custom Date' },
		],
		valueKey: 'id',
		labelKey: 'label',
	},
};
