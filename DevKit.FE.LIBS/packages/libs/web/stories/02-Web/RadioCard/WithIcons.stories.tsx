import { useState } from 'react';
import { PeopleNetworkIcon, RoundedUserIcon, ToothIcon, WalletIcon } from '@devkit/icons/web';
import { Meta, StoryFn } from '@storybook/react-vite';
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

export const RadioCardWithIcon = {
	args: {
		cards: [
			{
				id: 1,
				label: 'Only me',
				placeholder: 'PLACEHOLDER',
				iconStart: RoundedUserIcon,
				iconEnd: RoundedUserIcon,
			},
			{ id: 2, label: 'Me and Family', iconEnd: ToothIcon },
			{
				id: 3,
				label: 'Only Family',
				iconStart: WalletIcon,
				iconEnd: PeopleNetworkIcon,
			},
			{ id: 4, label: 'Domestic Worker' },
		],
	},
};
