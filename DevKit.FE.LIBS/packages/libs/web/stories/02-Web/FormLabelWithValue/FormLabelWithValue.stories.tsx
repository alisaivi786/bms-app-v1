import { Meta, StoryFn } from '@storybook/react-vite';
import {
	FormLabelWithValue as FormLabelWithValueComponent,
	IFormLabelWithValueProps,
} from '../../../src/components/FormLabelWithValue';

type ComponentType = (args: IFormLabelWithValueProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return <FormLabelWithValueComponent {...args} />;
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/FormLabelWithValue',
	component: FormLabelWithValueComponent,
	render: Template,
};

export default StoryMeta;

export const FormLabelWithValue = {
	args: {
		label: 'Email',
		value: <p className="text-paragraph font-medium py-3 pr-4 ">user@shory.com</p>,
	},
};

export const FormLabelWithCustomValue = {
	args: {
		label: 'Status',
		value: <p className="rounded-md py-0.5 px-2.5 capitalize bg-yellow-500">Pending</p>,
	},
};
