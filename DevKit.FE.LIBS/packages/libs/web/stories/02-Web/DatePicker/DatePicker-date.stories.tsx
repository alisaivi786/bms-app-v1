import { useState } from 'react';
import { formatDate, logger } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { DatePicker, IDatePickerFieldProps } from '../../../src/components/DatePicker';

type ComponentType = (args: Omit<IDatePickerFieldProps, 'valueType'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args: Omit<IDatePickerFieldProps, 'valueType'>) => {
	const [state, setState] = useState<Date | undefined>();

	return (
		<>
			<DatePicker
				{...args}
				value={state}
				valueType="date"
				onChange={(val) => {
					setState(val);
					logger.log('Selected Date: ', val);
				}}
				format={undefined}
			/>
			<div className="mt-28">{formatDate(state)}</div>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/Forms/Inputs/DatePicker',
	component: Template,
};

export default StoryMeta;

export const DatePickerDateValue = {
	args: {
		autoFocus: true,
		label: 'Date of Birth',
		isRequired: false,
		isDateOfBirth: false,
	},
};
