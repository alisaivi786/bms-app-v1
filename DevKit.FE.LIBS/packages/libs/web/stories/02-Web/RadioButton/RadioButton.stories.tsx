import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { RadioButtonProps, RadioButton as SingleRadioButton } from '../../../src/components/RadioButton';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import visaIcon from './visa-card.png';

type ComponentType = (args: RadioButtonProps<number>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [formValue, setFormValue] = useState<number>();

	return <SingleRadioButton {...args} onChange={(value) => setFormValue(value)} value={formValue} />;
};

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/Forms/RadioButton',
	component: SingleRadioButton,
};

export default StoryMeta;

export const RadioButton: StoryObj<ComponentType> = {
	render: Template,
	args: {
		id: 10,
		label: (
			<div className="flex items-center justify-between w-full">
				<p>Credit or Debit</p>
				<img alt="logo" src={visaIcon} />
			</div>
		),
	},
};
