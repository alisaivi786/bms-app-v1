import { endOfYear } from 'date-fns';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';
import { ECalendars, getHijriMonthDaysNumber, gregorianToHijri, hijriToGregorian } from './hijri';

export const getTzEndOfYear = (tzDate: Date, calendar: ECalendars = 'gregorian') => {
	const systemDate = convertZonedDateToSystemDate(tzDate);

	const hijriSystemDate = gregorianToHijri(systemDate);
	const daysNumber = getHijriMonthDaysNumber(12, hijriSystemDate.year);
	const gregorianEndOfHijriYear = hijriToGregorian(daysNumber, 12, hijriSystemDate.year);

	const newDate = calendar === 'gregorian' ? endOfYear(systemDate) : gregorianEndOfHijriYear;

	return convertSystemDateToZonedDate(newDate);
};
