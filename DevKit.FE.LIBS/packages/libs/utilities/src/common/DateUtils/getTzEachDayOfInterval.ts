import { eachDayOfInterval } from 'date-fns';
import { logger } from '../Debug';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';

export const getTzEachDayOfInterval = ({ tzDateStart, tzDateEnd }: { tzDateStart: Date; tzDateEnd: Date }) => {
	const systemStartDate = convertZonedDateToSystemDate(tzDateStart);
	const systemEndDate = convertZonedDateToSystemDate(tzDateEnd);

	if (systemStartDate > systemEndDate) {
		logger.error('[DateUtils][getTzEachDayOfInterval]: systemStartDate > systemEndDate');

		return [];
	}

	return eachDayOfInterval({
		start: systemStartDate,
		end: systemEndDate,
	}).map((date) => {
		return convertSystemDateToZonedDate(date);
	});
};
