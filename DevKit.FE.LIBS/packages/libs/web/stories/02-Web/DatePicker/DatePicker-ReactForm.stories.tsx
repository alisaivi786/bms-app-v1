import * as Yup from 'yup';
import { useReactForm } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { DatePicker, IDatePickerFieldProps } from '../../../src/components/DatePicker';

type ComponentType = (args: IDatePickerFieldProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const validation = Yup.object().shape({
		dateOfBirth: Yup.date().required(),
	});

	const reactForm = useReactForm<{ dateOfBirth?: string }>({
		initialValues: {
			dateOfBirth: '2000-01-01',
		},
		validation: validation,
		onFormSubmit: (values) => {
			alert(values.dateOfBirth);
		},
	});

	const values = reactForm.getValues();

	return (
		<>
			<DatePicker {...args} form={reactForm} field="dateOfBirth" placeholder="Select Date" />
			<div className="mt-28">{values.dateOfBirth}</div>
		</>
	);
};

const StoryMeta: Meta<IDatePickerFieldProps> = {
	title: 'WEB/Forms/Inputs/DatePicker',
	component: DatePicker,
	render: Template,
};

export default StoryMeta;

export const ReactForm = {
	args: {
		autoFocus: true,
		label: 'Date of Birth',
		isRequired: false,
		isDateOfBirth: true,
	},
};

export const DateOfBirthDisabled = {
	args: {
		label: 'Date of Birth',
		placeholder: 'Select Date',
		isDateOfBirth: true,
		disabled: true,
	},
};
