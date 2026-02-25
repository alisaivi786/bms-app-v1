import { useState } from 'react';
import { IDatePickerRangeInputValues, IDatePickerRangeProps } from '@devkit/utilities';
import { FieldValues } from '@devkit/utilities/src/hooks/useReactForm';
import { Meta, StoryFn } from '@storybook/react-vite';
import { DatePickerRange } from '../../../src/components/DatePickerRange';

type ComponentType = (args: Omit<IDatePickerRangeProps<FieldValues>, 'valueType'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<IDatePickerRangeInputValues<string>>();

	return (
		<>
			<div className="grid grid-cols-3 gap-4">
				<DatePickerRange
					{...args}
					label={args.label}
					value={state}
					onChange={(values) => {
						setState(values);
					}}
					layoutClassName="col-span-2"
				/>
				<DatePickerRange
					{...args}
					label={args.label}
					value={state}
					onChange={(values) => {
						setState(values);
					}}
					layoutClassName="col-span-2"
					autoSelectTime
				/>
			</div>
			<br />
			<br />
			<br />
			Preview:
			{state?.startDate} - {state?.endDate}
		</>
	);
};

const StoryMeta: Meta<IDatePickerRangeProps<FieldValues>> = {
	title: 'WEB/Forms/Inputs/DatePickerRange',
	component: DatePickerRange,
	render: Template,
};

export default StoryMeta;

export const DatePickerRangeDateValue = {
	args: { label: 'Date Picker Range', valueType: 'string' },
};

export const DateTimePickerRange = {
	args: { label: 'Date Time Picker Range', enableTimeSelection: true },
};
