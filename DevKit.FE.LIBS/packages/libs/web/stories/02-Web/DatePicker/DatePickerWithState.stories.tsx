import { useState } from 'react';
import { getTzDate } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { DatePicker, IDatePickerFieldProps } from '../../../src/components/DatePicker';

type ComponentType = (args: Omit<IDatePickerFieldProps, 'valueType'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<string | undefined>();

	return (
		<>
			<DatePicker
				{...args}
				onChange={(val) => {
					setState(val);
				}}
				value={state}
				defaultMonth={args.fromDate}
			></DatePicker>
			<br />
			<br />
			<br />
			Preview:
			{state}
		</>
	);
};

const StoryMeta: Meta<IDatePickerFieldProps> = {
	title: 'WEB/Forms/Inputs/DatePicker',
	component: DatePicker,
	render: Template,
};

export default StoryMeta;

export const WithState = {
	args: {
		label: 'Date of Birth',
		isRequired: false,
	},
};

export const FromDate = {
	args: {
		label: 'Date of Birth',
		isRequired: false,
		placeholder: 'Select Date',
		fromDate: getTzDate({ year: 2023, month: 12, day: 10, hours: 1, minutes: 15 }),
		toDate: getTzDate({ year: 2023, month: 12, day: 10, hours: 10, minutes: 20 }),
		isDateOfBirth: false,
		enableTimeSelection: true,
	},
};
