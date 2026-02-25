import { useState } from 'react';
import { RadioButtonFieldProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { RadioButtonGroup as MultiRadioOptions } from '../../../src/components/RadioButton';

type ComponentType = (args: RadioButtonFieldProps<never, number>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [checked, setChecked] = useState<number | undefined>();

	return (
		<div className="flex flex-col gap-5">
			<MultiRadioOptions {...args} value={checked} onChange={setChecked} />
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/Forms/RadioButton',
	component: MultiRadioOptions,
};

export default StoryMeta;

export const RadioButtonGroup: StoryObj<ComponentType> = {
	render: Template,
	args: {
		columnsCount: 4,
		options: [
			{ id: 10, label: 'Radio Button 1', highlighted: true },
			{ id: 20, label: 'Radio Button 2' },
			{ id: 30, label: 'Radio Button 3' },
			{ id: 40, label: 'Radio Button 4' },
			{ id: 50, label: 'Radio Button 5' },
			{ id: 60, label: 'Radio Button 6' },
			{ id: 70, label: 'Radio Button 7' },
			{ id: 80, label: 'Radio Button 8' },
			{ id: 90, label: 'Radio Button 9' },
		],
	},
};
