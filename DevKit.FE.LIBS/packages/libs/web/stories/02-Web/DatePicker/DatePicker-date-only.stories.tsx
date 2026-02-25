import { useState } from 'react';
import { logger } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { DatePicker, IDatePickerFieldProps } from '../../../src/components/DatePicker';

type ComponentType = (args: Omit<IDatePickerFieldProps, 'valueType'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<string | undefined>();

	return (
		<>
			<DatePicker
				{...args}
				value={state}
				onChange={(val) => {
					setState(val);
					logger.log('Selected Date: ', val);
				}}
			/>
			<div className="mt-28">{state}</div>
		</>
	);
};

const StoryMeta: Meta<IDatePickerFieldProps> = {
	title: 'WEB/Forms/Inputs/DatePicker',
	component: DatePicker,
	render: Template,
};

export default StoryMeta;

export const StringDateFormat = {
	args: { format: 'date-only' },
};
