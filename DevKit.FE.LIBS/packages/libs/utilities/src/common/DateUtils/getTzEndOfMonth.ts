import { endOfMonth } from 'date-fns';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';
import { ECalendars, getHijriMonthDaysNumber, gregorianToHijri, hijriToGregorian } from './hijri';

export const getTzEndOfMonth = (tzDate: Date, calendar: ECalendars = 'gregorian') => {
	const systemDate = convertZonedDateToSystemDate(tzDate);

	const newDate = endOfMonth(systemDate);

	if (calendar === 'gregorian') return convertSystemDateToZonedDate(newDate);

	const hijriSystemDate = gregorianToHijri(systemDate);
	const daysNumber = getHijriMonthDaysNumber(hijriSystemDate.month, hijriSystemDate.year);
	const gregorianEndOfHijriMonth = hijriToGregorian(daysNumber, hijriSystemDate.month, hijriSystemDate.year);

	return convertSystemDateToZonedDate(gregorianEndOfHijriMonth);
};
