import { isSameYear } from 'date-fns';
import { convertZonedDateToSystemDate } from './base';
import { ECalendars, gregorianToHijri } from './hijri';

export const getTzIsSameYear = (tzDateLeft: Date, tzDateRight: Date, calendar: ECalendars = 'gregorian') => {
	const systemLeftDate = convertZonedDateToSystemDate(tzDateLeft);
	const systemRightDate = convertZonedDateToSystemDate(tzDateRight);

	if (calendar === 'gregorian') return isSameYear(systemLeftDate, systemRightDate);

	return gregorianToHijri(systemLeftDate).year === gregorianToHijri(systemRightDate).year;
};
