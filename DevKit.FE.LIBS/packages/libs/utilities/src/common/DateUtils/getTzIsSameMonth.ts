import { isSameMonth } from 'date-fns';
import { convertZonedDateToSystemDate } from './base';
import { ECalendars, gregorianToHijri } from './hijri';

export const getTzIsSameMonth = (tzDateLeft: Date, tzDateRight: Date, calendar: ECalendars = 'gregorian') => {
	const systemLeftDate = convertZonedDateToSystemDate(tzDateLeft);
	const systemRightDate = convertZonedDateToSystemDate(tzDateRight);

	if (calendar === 'gregorian') return isSameMonth(systemLeftDate, systemRightDate);

	return gregorianToHijri(systemLeftDate).month === gregorianToHijri(systemRightDate).month;
};
