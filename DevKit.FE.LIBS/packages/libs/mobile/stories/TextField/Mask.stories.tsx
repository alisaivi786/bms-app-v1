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
				<TextField size="large" {...args} value={state} onChange={setState} />
			</View>
			<Text style={tw`px-5`}>Value is : {state || ''}</Text>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Text Field',
	component: Template,
};

export default StoryMeta;

export const Mask = {
	args: {
		label: 'User Name',
		type: 'text',
		suffix: '+971',
		isRequired: true,
		mask: '99 999 9999',
		layoutClassName: 'flex flex-col',
	},
};
