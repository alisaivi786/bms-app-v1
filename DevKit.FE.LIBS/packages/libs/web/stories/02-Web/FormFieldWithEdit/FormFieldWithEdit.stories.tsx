import { useState } from 'react';
import * as Yup from 'yup';
import { IFormSchema, mapPasswordField, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { FormFieldWithEdit, IFormFieldWithEdit } from '../../../src/components/FormFieldWithEdit';

interface IResetPasswordFieldValues {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}
type ComponentType = (args: IFormFieldWithEdit<IResetPasswordFieldValues>) => JSX.Element;

const schema: IFormSchema<IResetPasswordFieldValues> = {
	fields: [
		mapPasswordField({
			field: 'currentPassword',
			label: 'current password',
			placeholder: 'current password',
		}),
		mapPasswordField({
			field: 'newPassword',
			label: 'new password',
			placeholder: 'new password',
		}),
		mapPasswordField({
			field: 'confirmPassword',
			label: 'confirm password',
			placeholder: 'confirm password',
		}),
	],
	initialValues: {
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	},
	validation: Yup.object().shape({
		password: Yup.string().required(),
		newPassword: Yup.string().required(),
		confirmPassword: Yup.string().required(),
	}),
};

const Template: StoryFn<ComponentType> = (args) => {
	const [isEditOpen, setIsEditOpen] = useState(false);
	const form = useReactForm<IResetPasswordFieldValues>({
		initialValues: schema.initialValues,
		validation: schema.validation,
		onFormSubmit: async (values) => {
			alert(`The form has been submitted successfully. values: \n${JSON.stringify(values, null, 2)}`);
		},
	});

	const formValues = form.watchValues();

	return (
		<div>
			<div className="flex w-1/2 flex-col gap-2.5">
				<FormFieldWithEdit<IResetPasswordFieldValues>
					{...args}
					form={form}
					label="long label for some tests"
					value="dummyPassword"
					fieldsStructure={schema.fields}
					isEditFormOpen={isEditOpen}
					showEditForm={() => setIsEditOpen(true)}
					popover="Parent popover"
					buttonGroup={[
						{
							label: 'Cancel',
							variant: 'secondary',
							onClick: () => setIsEditOpen(false),
						},
						{
							label: 'Update',
							onClick: () => {
								// eslint-disable-next-line no-console
								console.log(formValues);
								setIsEditOpen(false);
							},
							variant: 'primary',
						},
					]}
				/>
			</div>
			<br />
			<hr />
			Errors password form
			<div>{JSON.stringify(form.fieldsErrors)}</div>
			<hr />
			Values password form
			<div>{JSON.stringify(form.watchValues())}</div>
		</div>
	);
};

/** Is a custom component used to handle Edit operations on any type of field, build above the Dynamic form */

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/FormFieldWithEdit',
	component: FormFieldWithEdit,
	render: Template,
};

export default StoryMeta;

export const FormWithEdit = {};

export const FormWithEditWithDisable = {
	args: {
		hideEdit: true,
	},
};
