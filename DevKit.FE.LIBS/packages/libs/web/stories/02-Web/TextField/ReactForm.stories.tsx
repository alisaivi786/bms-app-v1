import * as Yup from 'yup';
import { ITextFieldProps, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { TextField } from '../../../src/components/TextField/TextField';

type ComponentType = (args: ITextFieldProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const validation = Yup.object().shape({
		name: Yup.string().required(),
	});

	const reactForm = useReactForm<{ name?: string }>({
		initialValues: {},
		validation: validation,
		onFormSubmit: (values) => {
			alert(values.name);
		},
	});

	const name = reactForm.getValues('name');

	return (
		<form
			onReset={() => {
				reactForm.resetForm();
			}}
			onSubmit={() => {
				reactForm.submitForm();
			}}
		>
			<div className="p-5">
				<TextField
					{...args}
					form={reactForm}
					field="name"
					debounceTimeInMilliseconds={300}
					onChange={(v) => {
						alert(`changed ${v}`);
					}}
				/>
			</div>
			<div className="p-5">Value is : {name}</div>
		</form>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Text Field',
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
