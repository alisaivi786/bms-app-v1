import { parse } from 'date-fns';
import { convertSystemDateToZonedDate, getDefaultFormats } from './base';
import { getNow } from './getNow';
import { ECalendars, hijriToGregorian } from './hijri';

/**
 * @param tzFormattedDate string of formatted date
 * @param hasSeconds
 * @param calendar hijri or gregorian, default is gregorian
 * @param unMaskedDate the date to parse in format "DDMMYYYY", this is used for hijri only
 * @returns parsing result, isValid with valid Date in case of validity
 */
export const parseTzFormattedDateTime = (
	tzFormattedDate: string | undefined,
	hasSeconds = false,
	calendar?: ECalendars,
	unMaskedDate?: string | undefined
) => {
	const { defaultFormats } = getDefaultFormats();

	if (!tzFormattedDate)
		return {
			date: undefined,
			isValid: false as const,
		};

	const format = hasSeconds ? defaultFormats.dateTimeFormatWithSeconds : defaultFormats.dateTimeFormat;

	const newDate = parse(tzFormattedDate, format, getNow());

	if (!isNaN(newDate.getTime()) && format.length === tzFormattedDate.length) {
		const validDate = convertSystemDateToZonedDate(newDate);

		return {
			date:
				calendar === 'hijri'
					? hijriToGregorian(validDate.getDate(), validDate?.getMonth() + 1, validDate?.getFullYear())
					: validDate,
			isValid: true as const,
		};
	} else {
		if (calendar === 'hijri') {
			// handle the case of parse failure for 29/2/YYYY hijri date
			const hijriSplit = [unMaskedDate?.substring(0, 2), unMaskedDate?.substring(2, 4), unMaskedDate?.substring(4, 8)];

			if (hijriSplit?.[0] == '29' && hijriSplit?.[1] == '02') {
				const year = hijriSplit?.[2] ? parseInt(hijriSplit?.[2]) : undefined;

				if (year)
					return {
						date: hijriToGregorian(29, 2, year),
						isValid: true as const,
					};
			}
		}

		return {
			date: undefined,
			isValid: false as const,
		};
	}
};
