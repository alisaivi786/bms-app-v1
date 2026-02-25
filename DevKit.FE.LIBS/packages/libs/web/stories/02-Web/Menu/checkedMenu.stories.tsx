import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { CheckActionMenu as ActionMenuComponent, ICheckActionMenuProps } from '../../../src/components/ActionMenu';

type ComponentType = (args: ICheckActionMenuProps<string>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const items = [
		{ id: '0', label: 'Premium (High-Low)' },
		{ id: '1', label: 'Annual Limit (Low-High)' },
		{ id: '2', label: 'Annual Limit (Hight-Low)' },
	];
	const [selectedItem, setSelectedItem] = useState<string>(items[0].id);

	return (
		<div className="flex flex-wrap">
			<div className="flex flex-1">
				<ActionMenuComponent {...args} items={items} value={selectedItem} onChange={(id) => setSelectedItem(id)}>
					{items.find((ele) => ele.id === selectedItem)?.label || ''}
				</ActionMenuComponent>
			</div>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/ActionMenu',
	component: ActionMenuComponent,
	render: Template,
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

export const CheckMenu = {
	args: {
		disabled: false,
		textSize: 'medium',
		variant: 'text',
	},
};
