import { Meta, StoryFn } from '@storybook/react-vite';
import {
	FormFieldErrors as FormFieldErrorsComponent,
	IFormFieldErrorsProps,
} from '../../../src/components/FormFieldErrors/FormFieldErrors';

type ComponentType = (args: IFormFieldErrorsProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => <FormFieldErrorsComponent {...args} />;

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/Forms/FormErrors',
	component: FormFieldErrorsComponent,
	render: Template,
};

export default StoryMeta;

export const FormErrorsWithoutModal = {
	args: {
		errors: [
			{ errorCode: 'error1', errorMessage: 'Error Message 1' },
			{ errorCode: 'error1', errorMessage: 'Error Message 1' },
		],
		errorModal: {
			enabled: false,
			message: 'Multiple Validation Errors Occurred',
		},
	},
};

export const FormErrorsWithModal = {
	args: {
		errors: [
			{ errorCode: 'error1', errorMessage: 'Error Message 1' },
			{ errorCode: 'error1', errorMessage: 'Error Message 1' },
		],
		errorModal: {
			enabled: true,
			message: 'Multiple Validation Errors Occurred',
		},
	},
};
