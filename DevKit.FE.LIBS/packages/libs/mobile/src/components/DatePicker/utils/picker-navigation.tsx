import {
	ECalendars,
	addDays,
	getDuration,
	getTzIsSameDay,
	getTzIsSameMonth,
	getTzIsSameYear,
	getTzStartOfMonth,
	getTzStartOfYear,
	subDays,
} from '@devkit/utilities';

interface IntervalCheckProps {
	isIntervalPicker: boolean;
	maxSelectionRangeDays?: number;
	intervalStartDate: Date | undefined;
	intervalEndDate: Date | undefined;
	fromDate?: Date;
	toDate?: Date;
}

export const checkIsValidRangeForDaysView = ({
	isIntervalPicker,
	maxSelectionRangeDays,
	intervalStartDate,
	intervalEndDate,
	fromDate,
	toDate,
	currentDate,
	refDate,
}: IntervalCheckProps & {
	currentDate: Date | undefined;
	refDate: Date;
}) => {
	const isValidCaseOfRange =
		isIntervalPicker && maxSelectionRangeDays && !intervalEndDate && intervalStartDate && currentDate;

	const isValidRange =
		!isValidCaseOfRange ||
		(isValidCaseOfRange &&
			refDate <= addDays(currentDate, maxSelectionRangeDays) &&
			refDate >= subDays(currentDate, maxSelectionRangeDays));

	const isValidFrom = !fromDate || (fromDate && (getTzIsSameDay(fromDate, refDate) || fromDate <= refDate));
	const isValidToDate = !toDate || (toDate && (getTzIsSameDay(toDate, refDate) || toDate >= refDate));

	return isValidFrom && isValidToDate && isValidRange;
};

export const checkIsValidRangeForDaysHeader = ({
	isIntervalPicker,
	maxSelectionRangeDays,
	intervalStartDate,
	intervalEndDate,
	refDate,
}: IntervalCheckProps & {
	refDate: Date;
}) => {
	const isValidCaseOfRange = isIntervalPicker && maxSelectionRangeDays && !intervalEndDate && intervalStartDate;

	const allowNextMonth = !(
		isValidCaseOfRange &&
		getDuration(getTzStartOfMonth(refDate), getTzStartOfMonth(addDays(intervalStartDate, maxSelectionRangeDays)))
			.months >= 0
	);

	const allowPreviousMonth = !(
		isValidCaseOfRange &&
		getDuration(getTzStartOfMonth(subDays(intervalStartDate, maxSelectionRangeDays)), getTzStartOfMonth(refDate))
			.months >= 0
	);

	return { allowNextMonth, allowPreviousMonth };
};

export const checkIsValidRangeForMonthView = ({
	isIntervalPicker,
	maxSelectionRangeDays,
	intervalStartDate,
	intervalEndDate,
	currentMonthDate,
	fromDate,
	toDate,
	currentCalendar,
}: IntervalCheckProps & {
	currentCalendar: ECalendars;
	currentMonthDate: Date;
}) => {
	const isValidCaseOfRange = isIntervalPicker && maxSelectionRangeDays && !intervalEndDate && intervalStartDate;

	const isValidRange =
		!isValidCaseOfRange ||
		(isValidCaseOfRange &&
			currentMonthDate <= getTzStartOfMonth(addDays(intervalStartDate, maxSelectionRangeDays)) &&
			currentMonthDate >= getTzStartOfMonth(subDays(intervalStartDate, maxSelectionRangeDays)));

	const isValidFrom =
		!fromDate ||
		(fromDate && (getTzIsSameMonth(fromDate, currentMonthDate, currentCalendar) || fromDate <= currentMonthDate));
	const isValidToDate =
		!toDate || (toDate && (getTzIsSameMonth(toDate, currentMonthDate, currentCalendar) || toDate >= currentMonthDate));

	return isValidFrom && isValidToDate && isValidRange;
};

export const checkIsValidRangeForMonthHeaderView = ({
	isIntervalPicker,
	maxSelectionRangeDays,
	intervalStartDate,
	intervalEndDate,
	currentYearDate,
	toDate,
	fromDate,
}: IntervalCheckProps & {
	currentYearDate: Date;
}) => {
	const isValidCaseOfRange = isIntervalPicker && maxSelectionRangeDays && !intervalEndDate && intervalStartDate;

	const isValidRangeForNext =
		!isValidCaseOfRange ||
		(isValidCaseOfRange &&
			getDuration(getTzStartOfYear(addDays(intervalStartDate, maxSelectionRangeDays)), currentYearDate).years > 0);

	const isValidRangeForPrevious =
		!isValidCaseOfRange ||
		(isValidCaseOfRange &&
			getDuration(currentYearDate, getTzStartOfYear(subDays(intervalStartDate, maxSelectionRangeDays))).years > 0);

	const allowNextYear =
		(!toDate || (!!toDate && getDuration(getTzStartOfYear(toDate), currentYearDate).years > 0)) && isValidRangeForNext;

	const allowPreviousYear =
		(!fromDate || (!!fromDate && getDuration(currentYearDate, getTzStartOfYear(fromDate)).years > 0)) &&
		isValidRangeForPrevious;

	return { allowNextYear, allowPreviousYear };
};

export const checkIsValidRangeForYearView = ({
	isIntervalPicker,
	maxSelectionRangeDays,
	intervalStartDate,
	intervalEndDate,
	currentYearDate,
	fromDate,
	toDate,
	currentCalendar,
}: IntervalCheckProps & {
	currentYearDate: Date;
	currentCalendar?: ECalendars;
}) => {
	const isValidCaseOfRange = isIntervalPicker && maxSelectionRangeDays && !intervalEndDate && intervalStartDate;

	const isValidRange =
		!isValidCaseOfRange ||
		(isValidCaseOfRange &&
			getTzStartOfYear(currentYearDate) <= getTzStartOfYear(addDays(intervalStartDate, maxSelectionRangeDays)) &&
			getTzStartOfYear(currentYearDate) >= getTzStartOfYear(subDays(intervalStartDate, maxSelectionRangeDays)));

	const isValidFrom =
		!fromDate ||
		(fromDate && (getTzIsSameYear(fromDate, currentYearDate, currentCalendar) || fromDate <= currentYearDate));
	const isValidToDate =
		!toDate || (toDate && (getTzIsSameYear(toDate, currentYearDate, currentCalendar) || toDate >= currentYearDate));

	return isValidFrom && isValidToDate && isValidRange;
};

export const checkIsValidRangeForYearHeaderView = ({
	isIntervalPicker,
	maxSelectionRangeDays,
	intervalStartDate,
	intervalEndDate,
	currentCalendar,
	startYearDate,
	toDate,
	fromDate,
	endYearDate,
}: IntervalCheckProps & {
	currentCalendar: ECalendars;
	startYearDate: Date;
	endYearDate: Date;
}) => {
	const isValidCaseOfRange = isIntervalPicker && maxSelectionRangeDays && !intervalEndDate && intervalStartDate;
	const isValidRangeForNext =
		!isValidCaseOfRange ||
		(isValidCaseOfRange &&
			getDuration(
				getTzStartOfYear(addDays(intervalStartDate, maxSelectionRangeDays), currentCalendar),
				getTzStartOfYear(startYearDate, currentCalendar)
			).years >= 12);
	const isValidRangeForPrevious =
		!isValidCaseOfRange ||
		(isValidCaseOfRange &&
			getDuration(
				getTzStartOfYear(startYearDate, currentCalendar),
				getTzStartOfYear(subDays(intervalStartDate, maxSelectionRangeDays), currentCalendar)
			).years >= 12);

	const allowNextYears =
		(!toDate ||
			(!!toDate &&
				getDuration(getTzStartOfYear(toDate, currentCalendar), getTzStartOfYear(startYearDate, currentCalendar)).years >
					12)) &&
		isValidRangeForNext;

	const allowPreviousYears =
		(!fromDate ||
			(!!fromDate &&
				getDuration(getTzStartOfYear(endYearDate, currentCalendar), getTzStartOfYear(fromDate, currentCalendar))
					.years >= 12)) &&
		isValidRangeForPrevious;

	return { allowNextYears, allowPreviousYears };
};
