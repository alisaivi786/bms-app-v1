import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ITextFieldProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { TextField } from '../../src/components/TextField/TextField';
import { useMobileUIConfigOptions } from '../../src/layouts/ThemeProvider/theme-context';

type ComponentType = (args: ITextFieldProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<string | undefined>();
	const { tw } = useMobileUIConfigOptions();

	return (
		<>
			<View style={tw`p-5`}>
				<TextField
					{...args}
					value={state}
					onChange={(value) => {
						setState(value);
					}}
				/>
			</View>
			<Text style={tw`p-5`}>Value is : {state || ''}</Text>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Text Field',
	component: TextField,

	render: Template,
};

export default StoryMeta;

export const TextArea = {
	args: { label: 'User Name', type: 'text-area' },
};

export const TextAreaWithDescription = {
	args: { label: 'User Name', type: 'text-area', maxLength: 200, showCharactersCounter: true },
};

export const TextAreaWithError = {
	args: {
		label: 'User Name',
		type: 'text-area',
		errors: 'This field is required',
		maxLength: 200,
		showCharactersCounter: true,
	},
};
