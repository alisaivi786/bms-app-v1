import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { IYesNoToggleProps, YesNoToggle as YesNoToggleComponent } from '../../../src/components/ToggleSwitch';

type ComponentType = (args: IYesNoToggleProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [value, setValue] = useState(false);

	return (
		<div className="w-min">
			<YesNoToggleComponent {...args} onChange={(val) => setValue(val)} value={value} />
		</div>
	);
};

/**A toggle with Yes/No option, or any passed text for the YesNoToggle buttons */

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/YesNoToggle',
	component: YesNoToggleComponent,
	render: Template,
	argTypes: {
		variant: {
			control: 'select',
			options: ['black', 'primary'],
			defaultValue: 'primary',
		},
	},
};

export default StoryMeta;

export const YesNoToggle = {};
