import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { RadioCard as RadioCardComponent, RadioCardProps } from '../../../src/components/RadioCard';

type ComponentType = (args: RadioCardProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [selectedCardId, setSelectedCardId] = useState<number | string>();

	return (
		<>
			<RadioCardComponent {...args} value={selectedCardId} onChange={setSelectedCardId} />
			<p className="pt-5">Toggled: {`${selectedCardId ?? 'None'}`}</p>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/RadioCard',
	component: RadioCardComponent,
	render: Template,
};

export default StoryMeta;

const cards = [
	{
		id: 1,
		label: 'Only me',
		placeholder: 'PLACEHOLDER',
	},
	{
		id: 2,
		label: 'Me and Family',
	},
	{
		id: 3,
		label: 'Only Family',
	},
	{
		id: 4,
		label: 'Domestic Worker',
		placeholder: 'PLACEHOLDER4',
	},
];

export const Row: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', cards, hasErrors: false },
};

export const Col: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', cards, hasErrors: false, direction: 'col' },
};

export const WithErrors: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', cards, hasErrors: true, direction: 'row' },
};

export const TwoColumns: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', cards, hasErrors: false, columnsCount: 2 },
};

export const FilledVariant: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', cards, hasErrors: false, variant: 'filled' },
};

export const FilledVariantCol: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', cards, hasErrors: false, variant: 'filled', direction: 'col' },
};


export const FilledGrayVariant: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', cards, hasErrors: false, variant: 'filled-gray' },
};

export const FilledGrayVariantCol: StoryObj<RadioCardProps> = {
	args: {
		label: 'RadioCard', cards, hasErrors: false, variant: 'filled-gray', direction: 'col'
	},
};

export const FilledDarkVariant: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', cards, hasErrors: false, variant: 'filled-dark' },
};

export const FilledDarkVariantCol: StoryObj<RadioCardProps> = {
	args: {
		label: 'RadioCard', cards, hasErrors: false, variant: 'filled-dark', direction: 'col'
	},
};
