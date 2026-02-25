import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { INumberFieldProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { NumberField } from '../../src/components/TextField/TextField';
import { useMobileUIConfigOptions } from '../../src/layouts/ThemeProvider/theme-context';

type ComponentType = (args: INumberFieldProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<number | undefined>();
	const { tw } = useMobileUIConfigOptions();

	return (
		<>
			<View style={tw`p-5`}>
				<NumberField value={state} decimalPlaces={4} onChange={setState} directionForInput="ltr" {...args} />
			</View>
			<Text style={tw`p-5`}>Value is : {state || ''}</Text>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Text Field',
	component: NumberField,
	render: Template,
};

export default StoryMeta;

export const Numeric: StoryObj<ComponentType> = {};
