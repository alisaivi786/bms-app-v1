import { startOfYear } from 'date-fns';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';
import { ECalendars, gregorianToHijri, hijriToGregorian } from './hijri';

export const getTzStartOfYear = (tzDate: Date, calendar: ECalendars = 'gregorian') => {
	const systemDate = convertZonedDateToSystemDate(tzDate);
	const newDate = startOfYear(systemDate);

	if (calendar === 'gregorian') return convertSystemDateToZonedDate(newDate);

	const hijriSystemDate = gregorianToHijri(systemDate);
	const gregorianEndOfHijriYear = hijriToGregorian(1, 1, hijriSystemDate.year);

	return convertSystemDateToZonedDate(gregorianEndOfHijriYear);
};
