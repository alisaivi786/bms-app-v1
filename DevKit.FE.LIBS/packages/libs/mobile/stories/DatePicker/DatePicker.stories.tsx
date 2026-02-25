import { useState } from 'react';
import { DatePickerMode, FieldValues, IDatePickerRangeInputValues } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { DatePicker, IDatePickerFieldProps } from '../../src/components/DatePicker';

type ComponentType = (args: IDatePickerFieldProps<FieldValues, DatePickerMode>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [value, setValue] = useState<Date | IDatePickerRangeInputValues<Date> | undefined>(undefined);

	return <DatePicker {...args} value={value} onChange={setValue} />;
};

const DatePickerMeta: Meta<typeof DatePicker> = {
	title: 'Mobile/Forms/Inputs/DatePicker',
	component: DatePicker,
	render: Template,
	args: {
		variant: 'default',
		mode: 'single',
	},
	argTypes: {
		variant: {
			name: 'Variant',
			control: 'select',
			options: ['default', 'iconOnly', 'staticCalendar'],
		},
		mode: {
			name: 'Mode',
			control: 'select',
			options: ['single', 'interval'],
		},
	},
};

export default DatePickerMeta;

export const _1Default: StoryObj<typeof DatePicker> = {
	args: {},
};
