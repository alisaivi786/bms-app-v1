import { IFormSchema, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button, ResetButton, SubmitButton } from '../../../src/components/Buttons';
import { DynamicForm, DynamicFormProps } from '../../../src/components/DynamicForm';
import { Form } from '../../../src/components/Form/Form';
import { IUserData, getFormSchema } from './form-schema';

type ComponentType = (args: {
	columnsCount: number;
	isEditable: boolean;
	validationMode?: 'zod' | 'yup';
}) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const schema: IFormSchema<IUserData> = getFormSchema(args);

	const form = useReactForm<IUserData>({
		...schema,
		initialValues: schema.initialValues,
		onFormSubmit: async (values) => {
			alert(`The form has been submitted successfully. values: \n${JSON.stringify(values, null, 2)}`);

			return new Promise((resolve) => setTimeout(resolve, 10000));
		},
		validateBehavior: 'on-submit',
	});

	const formValues = form.watchValues();

	const addCategories = async () => {
		const errors = await form.validateField('userName');

		if (errors) {
			alert(JSON.stringify(errors));
		}
	};

	return (
		<div className="p-5 bg-gray-50">
			<Form form={form}>
				<DynamicForm {...args} form={form} fieldsStructure={schema.fields} />
				<div className="flex flex-row-reverse flex-wrap gap-5 my-5">
					<SubmitButton disabled={form.disableSubmit}>Submit</SubmitButton>
					<ResetButton>Reset</ResetButton>
				</div>
				<SubmitButton>Test Submit</SubmitButton>
			</Form>
			<hr />
			<div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
				<div>
					<span className="font-bold text-title">Errors</span>
					<pre className="overflow-auto bg-white border border-double">
						{JSON.stringify(form.fieldsErrors, null, 2)}
					</pre>
				</div>
				<div>
					<span className="font-bold text-title">Values</span>
					<pre className="overflow-auto bg-white border border-double">
						{JSON.stringify(form.watchValues(), null, 2)}
					</pre>
				</div>
			</div>
			<hr />
			<div className="flex flex-wrap gap-5 mt-5 justify-evenly">
				<Button onClick={form.submitForm}>Submit without Disable</Button>
				<Button
					onClick={() => {
						form.setFieldValue('userName', 'values');
						const values = form.getValues();

						alert(JSON.stringify(values));
					}}
				>
					Test Set Then GetValues
				</Button>
				<Button
					onClick={() => {
						form.setFieldValue('userName', 'watch values');
						const values = form.watchValues();

						alert(JSON.stringify(values));
					}}
				>
					Test Set Then Watch Values
				</Button>
				<Button
					onClick={() => {
						form.setFieldValue('userName', 'outside');

						alert(JSON.stringify(formValues));
					}}
				>
					Test Set Then Watch Values
				</Button>
				<Button onClick={() => form.setFieldError('userName', 'Test Error')}>Set Error on User name</Button>
				<Button onClick={() => form.setFieldError('userName', undefined)}>Unset Error on User name</Button>
				<Button onClick={addCategories}>Test Validation</Button>
			</div>
		</div>
	);
};

const StoryMeta: Meta<DynamicFormProps<IUserData>> = {
	title: 'Web/Forms/DynamicForm',
	component: DynamicForm,
};

export default StoryMeta;

export const DynamicForms: StoryObj<ComponentType> = {
	render: Template,
	args: {
		columnsCount: 2,
		isEditable: true,
		validationMode: 'yup',
	},
	argTypes: {
		validationMode: {
			options: ['zod', 'yup'],
			control: { type: 'radio' },
		},
	},
};
