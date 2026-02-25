import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { IToggleSwitchProps, ToggleSwitch as ToggleSwitchComponent } from '../../../src/components/ToggleSwitch';

type ComponentType = (args: IToggleSwitchProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [checked, setChecked] = useState(false);

	return (
		<>
			<ToggleSwitchComponent
				{...args}
				checked={checked}
				onChange={(checked) => {
					setChecked(checked);
				}}
			/>
			<p>Status: {`${checked}`}</p>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/ToggleSwitch',
	component: ToggleSwitchComponent,
	render: Template,
};

export default StoryMeta;

export const ToggleSwitch = {
	args: {
		disabled: false,
	},
};
