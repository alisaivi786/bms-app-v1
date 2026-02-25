import { compareAsc, differenceInCalendarMonths, isLastDayOfMonth, toDate } from 'date-fns';

export function getDifferenceInMonth<DateType extends Date>(
	dateLeft: DateType | number,
	dateRight: DateType | number
): number {
	const _dateLeft = toDate(dateLeft);
	const _dateRight = toDate(dateRight);

	const sign = compareAsc(_dateLeft, _dateRight);
	const difference = Math.abs(differenceInCalendarMonths(_dateLeft, _dateRight));
	let result;

	if (difference < 1) {
		result = 0;
	} else {
		if (_dateLeft.getMonth() === 1 && _dateLeft.getDate() > 27) {
			_dateLeft.setDate(30);
		}

		_dateLeft.setMonth(_dateLeft.getMonth() - sign * difference);

		let isLastMonthNotFull = compareAsc(_dateLeft, _dateRight) === -sign;

		if (isLastDayOfMonth(toDate(dateLeft)) && difference === 1 && compareAsc(dateLeft, _dateRight) === 1) {
			isLastMonthNotFull = false;
		}

		result = sign * (difference - Number(isLastMonthNotFull));
	}

	return result === 0 ? 0 : result;
}
