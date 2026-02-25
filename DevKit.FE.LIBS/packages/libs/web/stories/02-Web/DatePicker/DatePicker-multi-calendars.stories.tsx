import { useState } from 'react';
import { ECalendars, formatDate, logger } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { DatePicker, IDatePickerFieldProps } from '../../../src/components/DatePicker';

type ComponentType = (args: Omit<IDatePickerFieldProps, 'valueType'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<string | undefined>();
	const [selectedCalendar, setSelectedCalendar] = useState<ECalendars | undefined>();

	return (
		<>
			<DatePicker
				{...args}
				value={state}
				onChange={(val) => {
					setState(val);
					logger.log('Selected Date: ', val);
				}}
				selectedCalendar={selectedCalendar}
				onCalendarChange={setSelectedCalendar}
			/>
			<div className="mt-28">{formatDate(state)}</div>
		</>
	);
};

const StoryMeta: Meta<IDatePickerFieldProps> = {
	title: 'WEB/Forms/Inputs/DatePicker',
	component: DatePicker,
	render: Template,
};

export default StoryMeta;

export const MultiCalendarDatePicker = {
	args: { format: 'date-only', calendars: ['gregorian', 'hijri'] },
};
