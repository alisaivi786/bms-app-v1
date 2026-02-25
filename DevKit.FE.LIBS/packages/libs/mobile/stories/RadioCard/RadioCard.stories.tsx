import React, { useState } from 'react';
import { View } from 'react-native';
import { SfCatFillIcon, SfDogFillIcon } from '@devkit/icons/native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { RadioCard, RadioCardProps } from '../../src/components/RadioCard';

type ItemType = {
	id: string;
	label: string;
	iconStart?: React.FC<React.SVGProps<SVGSVGElement>>;
	iconEnd?: React.FC<React.SVGProps<SVGSVGElement>>;
	className?: string;
	center?: boolean;
	placeholder?: string;
};

type ComponentType = (args: RadioCardProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [radioCardState, setRadioCardState] = useState<string | number>('');
	const cards: ItemType[] = [
		{
			id: '1',
			label: 'Dog',
			center: true,
			iconStart: SfDogFillIcon,
		},
		{ id: '2', label: 'Cat', iconStart: SfCatFillIcon, center: true },
	];

	return (
		<View>
			<RadioCard
				{...args}
				cards={cards}
				value={radioCardState}
				onChange={(value) => {
					setRadioCardState(value ?? '');
				}}
			/>
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/RadioCard',
	render: Template,
};

export default StoryMeta;

export const Default: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', isRequired: true, hasErrors: false, variant: 'primary' },
	argTypes: {
		variant: {
			name: 'Variant',
			control: 'select',
			options: ['primary', 'checkmarks', 'filled', 'filled-gray', 'filled-dark'],
		},
	},
};

export const DirectionRow: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', isRequired: true, hasErrors: false, direction: 'row', variant: 'primary' },
	argTypes: {
		variant: {
			name: 'Variant',
			control: 'select',
			options: ['primary', 'checkmarks'],
		},
	},
};
