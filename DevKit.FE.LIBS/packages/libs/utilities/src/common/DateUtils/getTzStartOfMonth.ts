import { startOfMonth } from 'date-fns';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';
import { ECalendars, gregorianToHijri, hijriToGregorian } from './hijri';

export const getTzStartOfMonth = (tzDate: Date, calendar: ECalendars = 'gregorian') => {
	const systemDate = convertZonedDateToSystemDate(tzDate);

	const hijriSystemDate = gregorianToHijri(systemDate);
	const gregorianStartOfHijriMonth = hijriToGregorian(1, hijriSystemDate.month, hijriSystemDate.year);
	const newDate = calendar === 'gregorian' ? startOfMonth(systemDate) : gregorianStartOfHijriMonth;

	return convertSystemDateToZonedDate(newDate);
};
