import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { IToggleSwitchProps, ToggleSwitch as ToggleSwitchNormal } from '../../../src/components/ToggleSwitch';

type ComponentType = (args: IToggleSwitchProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [checked, setChecked] = useState(false);

	return (
		<>
			<ToggleSwitchNormal
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
	title: 'Web/Forms/ToggleSwitchNormal',
	component: ToggleSwitchNormal,
	render: Template,
};

export default StoryMeta;

export const ToggleSwitch = {
	args: {
		disabled: false,
	},
};
