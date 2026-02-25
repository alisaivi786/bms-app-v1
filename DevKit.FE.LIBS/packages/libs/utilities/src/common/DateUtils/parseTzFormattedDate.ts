import { parse } from 'date-fns';
import { convertSystemDateToZonedDate, getDefaultFormats } from './base';
import { getNow } from './getNow';
import { ECalendars, getHijriMonthDaysNumber, hijriToGregorian } from './hijri';

/**
 *
 * @param tzFormattedDate string of formatted date
 * @param format
 * @param calendar hijri or gregorian, default is gregorian
 * @param unMaskedDate the date to parse in format "DDMMYYYY", this is used for hijri only
 * @returns parsing result, isValid with valid Date in case of validity
 */
export const parseTzFormattedDate = (
	tzFormattedDate: string | undefined,
	format: string = getDefaultFormats().defaultFormats.dateFormat,
	calendar?: ECalendars,
	unMaskedDate?: string | undefined
) => {
	if (!tzFormattedDate)
		return {
			date: undefined,
			isValid: false as const,
		};

	if (calendar === 'hijri') {
		const hijriSplit = [unMaskedDate?.substring(0, 2), unMaskedDate?.substring(2, 4), unMaskedDate?.substring(4, 8)];

		if (hijriSplit?.[0] && hijriSplit?.[1] && hijriSplit?.[2]) {
			const d = parseInt(hijriSplit?.[0]);
			const m = parseInt(hijriSplit?.[1]);
			const y = parseInt(hijriSplit?.[2]);

			if (m > 0 && m < 13 && d > 0 && d < 31 && d <= getHijriMonthDaysNumber(m, y)) {
				return {
					date: convertSystemDateToZonedDate(hijriToGregorian(d, m, y)),
					isValid: true as const,
				};
			}
		}

		return {
			date: undefined,
			isValid: false as const,
		};
	}

	const newDate = parse(tzFormattedDate, format, getNow());

	if (!isNaN(newDate.getTime()) && format.length === tzFormattedDate.length) {
		const validDate = convertSystemDateToZonedDate(newDate);

		return {
			date: validDate,
			isValid: true as const,
		};
	} else {
		return {
			date: undefined,
			isValid: false as const,
		};
	}
};
