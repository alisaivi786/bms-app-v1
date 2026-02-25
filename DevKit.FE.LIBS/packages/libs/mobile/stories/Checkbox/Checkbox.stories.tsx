import { useState } from 'react';
import { Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { Checkbox, TCheckboxProps } from '../../src/components/Checkbox';

type ComponentType = (args: TCheckboxProps<never>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [checked, setChecked] = useState(false);

	const statusText = () => {
		if (args.disabled) return 'Disabled';

		return checked.toString();
	};

	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, gap: 6 }}>
			<Checkbox
				{...args}
				isChecked={args.isChecked ?? checked}
				onChange={(checked) => {
					setChecked(checked);
				}}
				label="Checkbox Label"
			/>

			<Text>Status: {statusText()}</Text>
		</View>
	);
};

const CheckboxMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Checkbox',
	component: Checkbox,
	render: Template,
	argTypes: {
		size: {
			name: 'Size',
			control: 'select',
			options: ['x-small', 'small', 'medium', 'large'],
		},
	},
	args: {
		size: 'small',
	},
};

export default CheckboxMeta;

export const _1Default: StoryObj<typeof Checkbox> = {
	args: {},
};

export const _2DisabledCheckbox: StoryObj<typeof Checkbox> = {
	args: { disabled: true },
};
