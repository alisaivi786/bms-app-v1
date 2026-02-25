import React from 'react';
import { Text, View } from 'react-native';
import * as Yup from 'yup';
import { ITextFieldProps, logger, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { TextField } from '../../src/components/TextField/TextField';
import { useMobileUIConfigOptions } from '../../src/layouts/ThemeProvider/theme-context';

type ComponentType = (args: ITextFieldProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const validation = Yup.object().shape({
		name: Yup.string().required(),
	});

	const reactForm = useReactForm<{ name?: string }>({
		initialValues: {},
		validation: validation,
		onFormSubmit: (values) => {
			logger.log(values.name);
		},
	});

	const name = reactForm.getValues('name');
	const { tw } = useMobileUIConfigOptions();

	return (
		<>
			<View style={tw`p-5`}>
				<TextField
					{...args}
					form={reactForm}
					field="name"
					debounceTimeInMilliseconds={300}
					onChange={(v) => {
						logger.log(v);
					}}
				/>
			</View>
			<Text style={tw`p-5`}>Value is : {name}</Text>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Text Field',
	component: Template,
};

export default StoryMeta;

export const ReactForm = {
	args: {
		label: 'User Name',
		type: 'text',
		suffix: '+971',
		isRequired: true,
	},
};
