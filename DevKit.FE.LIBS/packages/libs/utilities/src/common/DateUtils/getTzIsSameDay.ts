import { isSameDay } from 'date-fns';
import { convertZonedDateToSystemDate } from './base';

export const getTzIsSameDay = (tzDateLeft: Date, tzDateRight: Date) => {
	const systemLeftDate = convertZonedDateToSystemDate(tzDateLeft);
	const systemRightDate = convertZonedDateToSystemDate(tzDateRight);

	return isSameDay(systemLeftDate, systemRightDate);
};
