import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { CapsuleButton as CapsuleButtonComponent, CapsuleButtonProps } from '../../../src/components/CapsuleButton';

type ItemType = { id: number; label: string };

type ComponentType = (args: CapsuleButtonProps<ItemType, 'id'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [selectedCardId, setSelectedCardId] = useState<number | undefined>();

	return (
		<>
			<CapsuleButtonComponent
				{...args}
				selected={selectedCardId}
				onChange={(id) => {
					setSelectedCardId(id);
				}}
			/>
			<p className="pt-5">Toggled: {`${selectedCardId ?? 'None'}`}</p>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/CapsuleButton',
	component: CapsuleButtonComponent,
	render: Template,
};

export default StoryMeta;

export const CapsuleButton: StoryObj<ComponentType> = {
	args: {
		options: [
			{
				id: 1,
				label: 'long text to show that the second button will have a minimum width by flex basis',
			},
			{
				id: 2,
				label: 'A',
			},
			{
				id: 3,
				label: 'normal text',
			},
		],
		labelKey: 'label',
		valueKey: 'id',
	},
};
