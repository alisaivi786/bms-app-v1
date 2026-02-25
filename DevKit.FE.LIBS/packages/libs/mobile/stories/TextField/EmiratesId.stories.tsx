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
					value={state}
					onChange={setState}
					onPaste={(value: string) => {
						const pastedValue = value.replace(/-|\s/g, '');
						const finalValue = pastedValue.startsWith('784') ? pastedValue.substring(3) : pastedValue;

						return finalValue;
					}}
					{...args}
				/>
			</View>
			<Text style={tw`p-5`}>Value is : {state ? `784${state}` : ''}</Text>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Text Field',
	component: Template,
};

export default StoryMeta;

export const EmiratesId = {
	args: {
		label: 'Emirates Id',
		type: 'text',
		suffix: '784 -',
		placeholder: '1990 - 1234567 - 8',
		mask: '9999 - 9999999 - 9',
		inputMode: 'numeric',
		layoutClassName: 'flex flex-col',
	},
};
