import React, { useState } from 'react';
import { View } from 'react-native';
import { ITextFieldProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { TextField } from '../../src/components/TextField/TextField';
import { useMobileUIConfigOptions } from '../../src/layouts/ThemeProvider/theme-context';

type ComponentType = (args: ITextFieldProps) => JSX.Element;

const storyToolTip = {
	header: 'Number of lives for SME',
	description: 'A minimum of 5 and a maximum of 150 counts are allowed to proceed with SME Health',
};

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<string | undefined>();
	const { tw } = useMobileUIConfigOptions();

	return (
		<View style={tw`p-5`}>
			<TextField
				value={state}
				onChange={(value) => {
					setState(value);
				}}
				{...args}
			/>
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Text Field',
	component: Template,
};

export default StoryMeta;

export const WithPopover = {
	args: {
		label: 'Number of Lives',
		popover: storyToolTip,
	},
};
