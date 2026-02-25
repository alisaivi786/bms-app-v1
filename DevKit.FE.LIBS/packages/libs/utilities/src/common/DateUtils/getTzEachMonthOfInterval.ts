import { eachMonthOfInterval } from 'date-fns';
import { logger } from '../Debug';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';
import { ECalendars, gregorianToHijri, hijriToGregorian } from './hijri';

export const getTzEachMonthOfInterval = ({
	tzDateStart,
	tzDateEnd,
	calendar = 'gregorian',
}: {
	tzDateStart: Date;
	tzDateEnd: Date;
	calendar?: ECalendars;
}) => {
	const systemStartDate = convertZonedDateToSystemDate(tzDateStart);
	const systemEndDate = convertZonedDateToSystemDate(tzDateEnd);

	if (systemStartDate > systemEndDate) {
		logger.error('[DateUtils][getTzEachDayOfInterval]: systemStartDate > systemEndDate');

		return [];
	}

	if (calendar === 'gregorian')
		return eachMonthOfInterval({
			start: systemStartDate,
			end: systemEndDate,
		}).map((date) => {
			return convertSystemDateToZonedDate(date);
		});

	return eachMonthOfInterval({
		start: gregorianToHijri(systemStartDate).toDate(true),
		end: gregorianToHijri(systemEndDate).toDate(true),
	}).map((date) => {
		return convertSystemDateToZonedDate(hijriToGregorian(date.getDate(), date.getMonth() + 1, date.getFullYear()));
	});
};
