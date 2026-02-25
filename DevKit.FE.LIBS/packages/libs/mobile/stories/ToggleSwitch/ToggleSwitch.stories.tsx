import { useState } from 'react';
import { Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { ToggleSwitch, ToggleSwitchProps } from '../../src/components//ToggleSwitch';

type ComponentType = (args: ToggleSwitchProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [checked, setChecked] = useState(false);

	const statusText = () => {
		if (args.disabled) return 'Disabled';

		return checked.toString();
	};

	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, gap: 6 }}>
			<ToggleSwitch
				{...args}
				isChecked={args.isChecked ?? checked}
				onChange={(checked) => {
					setChecked(checked);
				}}
			/>
			<Text>Status: {statusText()}</Text>
		</View>
	);
};

const ToggleSwitchMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/ToggleSwitch',
	component: ToggleSwitch,
	render: Template,
};

export default ToggleSwitchMeta;

export const _1Default: StoryObj<typeof ToggleSwitch> = {
	argTypes: {
		size: { control: 'radio', options: ['lg', 'md'] },
	},
	args: {
		disabled: false,
		size: 'md',
		hasError: false,
	},
};

export const _2DisabledSwitch: StoryObj<typeof ToggleSwitch> = {
	args: { disabled: true },
};
