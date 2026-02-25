import { useState } from 'react';
import { IDatePickerRangeInputValues, IDatePickerRangeProps, formatDate, getTzDate } from '@devkit/utilities';
import { FieldValues } from '@devkit/utilities/src/hooks/useReactForm';
import { Meta, StoryFn } from '@storybook/react-vite';
import { DatePickerRange } from '../../../src/components/DatePickerRange';

type ComponentType = (args: Omit<IDatePickerRangeProps<FieldValues>, 'valueType'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<IDatePickerRangeInputValues<Date>>();

	return (
		<>
			<DatePickerRange
				{...args}
				valueType="date"
				label={args.label}
				value={state}
				onChange={(values) => {
					setState(values);
				}}
			/>
			<br />
			<br />
			<br />
			Preview:
			{formatDate(state?.startDate)} - {formatDate(state?.endDate)}
		</>
	);
};

const StoryMeta: Meta<IDatePickerRangeProps<FieldValues>> = {
	title: 'WEB/Forms/Inputs/DatePickerRange',
	component: DatePickerRange,
	render: Template,
	argTypes: {
		enableTimeSelection: {
			defaultValue: false,
			control: 'boolean',
		},
		minStartDate: {
			defaultValue: getTzDate({ year: 2023, month: 2, day: 1 }),
			control: 'date',
		},
		maxStartDate: {
			defaultValue: getTzDate({ year: 2023, month: 2, day: 15 }),
			control: 'date',
		},
		minEndDate: {
			defaultValue: getTzDate({ year: 2023, month: 2, day: 1 }),
			control: 'date',
		},
		maxEndDate: {
			defaultValue: getTzDate({ year: 2023, month: 2, day: 15 }),
			control: 'date',
		},
	},
};

export default StoryMeta;

export const Default = {
	args: {
		label: 'Date Picker Range',
		valueType: 'date',
	},
};
