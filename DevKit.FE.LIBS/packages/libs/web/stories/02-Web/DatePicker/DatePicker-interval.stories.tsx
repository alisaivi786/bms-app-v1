import { useState } from 'react';
import { ArrowDownIcon } from '@devkit/icons/web';
import {
	IDatePickerRangeInputValues,
	addYears,
	formatDateTime,
	getDateUtilsConfig,
	getIsoDateTime,
	getNow,
	getTzDate,
	getTzEndOfMonth,
	getTzEndOfWeek,
	getTzStartOfDay,
	getTzStartOfMonth,
	getTzStartOfWeek,
	getTzTodayDate,
	parseIsoDateTime,
} from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { Collapsible, CollapsibleButton, CollapsiblePanel } from '../../../src/components/Collapsible/Collapsible';
import { DatePicker, IDatePickerFieldProps } from '../../../src/components/DatePicker';

type ComponentType = (args: Omit<IDatePickerFieldProps, 'valueType'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args, context) => {
	const [state, setState] = useState<IDatePickerRangeInputValues<string>>();
	const { systemTimezone, timezone } = getDateUtilsConfig();

	return (
		<>
			<div className="p-2 text-paragraph bg-gray-200 mb-4">
				<Collapsible>
					<CollapsibleButton>
						<div className="flex justify-between nj-text-brand font-medium">
							<div className="flex gap-5 ">
								<div>
									Website Timezone ({timezone})
									{context.globals.timeZone === 'UserSystem'
										? ''
										: ` (${
												Intl.DateTimeFormat([], {
													timeZone: timezone,
													timeZoneName: 'shortOffset',
												})
													.formatToParts()
													.find((p) => p.type === 'timeZoneName')?.value
										  })`}
								</div>
								<div>|</div>
								<div>
									User System Timezone ({systemTimezone})
									{context.globals.timeZone === 'UserSystem'
										? ''
										: ` (${
												Intl.DateTimeFormat([], {
													timeZone: systemTimezone,
													timeZoneName: 'shortOffset',
												})
													.formatToParts()
													.find((p) => p.type === 'timeZoneName')?.value
										  })`}
								</div>
							</div>
							<ArrowDownIcon />
						</div>
					</CollapsibleButton>
					<CollapsiblePanel>
						<div className="table w-full mt-4">
							<div className="table-row">
								<div className="table-cell font-medium ">Now</div>
								<div className="table-cell">{formatDateTime(getNow())}</div>
								<div className="table-cell font-medium">Now ISO</div>
								<div className="table-cell">{getIsoDateTime(getNow())}</div>
							</div>
							<div className="table-row">
								<div className="table-cell font-medium ">Today</div>
								<div className="table-cell">{formatDateTime(getTzTodayDate())}</div>
								<div className="table-cell font-medium">Today ISO</div>
								<div className="table-cell">{getIsoDateTime(getTzTodayDate())}</div>
							</div>
							<div className="table-row">
								<div className="table-cell font-medium ">Get Date (2023-12-1 09:15)</div>
								<div className="table-cell">
									{formatDateTime(getTzDate({ year: 2023, month: 12, day: 1, hours: 9, minutes: 15 }))}
								</div>
								<div className="table-cell font-medium">Today ISO</div>
								<div className="table-cell">
									{getIsoDateTime(getTzDate({ year: 2023, month: 12, day: 1, hours: 9, minutes: 15 }))}
								</div>
							</div>
							<div className="table-row">
								<div className="table-cell font-medium ">Start Of Day (2023-12-1 09:15)</div>
								<div className="table-cell">
									{formatDateTime(getTzStartOfDay(getTzDate({ year: 2023, month: 12, day: 1, hours: 9, minutes: 15 })))}
								</div>
								<div className="table-cell font-medium">Start of ISO</div>
								<div className="table-cell">
									{getIsoDateTime(getTzStartOfDay(getTzDate({ year: 2023, month: 12, day: 1, hours: 9, minutes: 15 })))}
								</div>
							</div>
							<div className="table-row">
								<div className="table-cell font-medium ">Start Of Week</div>
								<div className="table-cell">{formatDateTime(getTzStartOfWeek(getNow()))}</div>
								<div className="table-cell font-medium">Start of Week ISO</div>
								<div className="table-cell">{getIsoDateTime(getTzStartOfWeek(getNow()))}</div>
							</div>
							<div className="table-row">
								<div className="table-cell font-medium ">End Of Week</div>
								<div className="table-cell">{formatDateTime(getTzEndOfWeek(getNow()))}</div>
								<div className="table-cell font-medium">End Of Week ISO</div>
								<div className="table-cell">{getIsoDateTime(getTzEndOfWeek(getNow()))}</div>
							</div>
							<div className="table-row">
								<div className="table-cell font-medium ">Start Of Month</div>
								<div className="table-cell">{formatDateTime(getTzStartOfMonth(getNow()))}</div>
								<div className="table-cell font-medium">Start of Month ISO</div>
								<div className="table-cell">{getIsoDateTime(getTzStartOfMonth(getNow()))}</div>
							</div>
							<div className="table-row">
								<div className="table-cell font-medium ">End Of Month</div>
								<div className="table-cell">{formatDateTime(getTzEndOfMonth(getNow()))}</div>
								<div className="table-cell font-medium">End Of Month ISO</div>
								<div className="table-cell">{getIsoDateTime(getTzEndOfMonth(getNow()))}</div>
							</div>
						</div>
					</CollapsiblePanel>
				</Collapsible>
			</div>
			<DatePicker
				{...args}
				mode="interval"
				value={state}
				onChange={(val) => {
					setState(val);
				}}
			/>
			<div className="mt-28">
				{state?.startDate} {' - '} {state?.endDate}
			</div>
			<div className="mt-28">
				{formatDateTime(parseIsoDateTime(state?.startDate))} {' - '} {formatDateTime(parseIsoDateTime(state?.endDate))}
			</div>
		</>
	);
};

const StoryMeta: Meta<IDatePickerFieldProps> = {
	title: 'WEB/Forms/Inputs/DatePicker',
	component: DatePicker,
	render: Template,
};

export default StoryMeta;

const startDate = new Date();
// const endDate = addMonths(startDate, 5);
const endDate = addYears(startDate, 5);

export const DateInterval = {
	args: {
		toDate: endDate,
		label: 'Enrolment Date Range',
		enableTimeSelection: false,
		isRequired: false,
		isDateOfBirth: false,
	},
};

export const DateAndTimeInterval = {
	args: {
		toDate: endDate,
		label: 'Enrolment Date Range',
		enableTimeSelection: true,
		isRequired: false,
		isDateOfBirth: false,
	},
};

export const DateAndTimeIntervalWithRange = {
	args: {
		// fromDate: startDate,
		// toDate: endDate,
		label: 'Enrolment Date Range',
		enableTimeSelection: true,
		isRequired: false,
		isDateOfBirth: false,
		maxSelectionRangeDays: 60,
	},
};
