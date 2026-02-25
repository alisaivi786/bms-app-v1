import { formatInTimeZone } from 'date-fns-tz';
import { TzDateState, getDefaultFormats } from './base';
import { ECalendars, islamicCalendarFormat } from './hijri';

const localeScript = `en-${islamicCalendarFormat}`;

export const getTzTimeStates = (tzDate: Date, calendar: ECalendars = 'gregorian'): Required<TzDateState> => {
	const { timezone } = getDefaultFormats();
	const getFormat = (key: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second') => {
		const obj: { [k: string]: string } = {};

		obj[key] = 'numeric';

		return new Intl.DateTimeFormat(localeScript, { ...obj, timeZone: timezone } as Intl.DateTimeFormatOptions);
	};

	if (calendar === 'hijri') {
		return {
			year: Number(getFormat('year').format(tzDate).replace(' AH', '')),
			month: Number(getFormat('month').format(tzDate)),
			day: Number(getFormat('day').format(tzDate)),
			hours: Number(getFormat('hour').format(tzDate)),
			minutes: Number(getFormat('minute').format(tzDate)),
			seconds: Number(getFormat('second').format(tzDate)),
		};
	}
	const state = {
		year: Number(formatInTimeZone(tzDate, timezone, 'yyyy')),
		month: Number(formatInTimeZone(tzDate, timezone, 'MM')),
		day: Number(formatInTimeZone(tzDate, timezone, 'dd')),
		hours: Number(formatInTimeZone(tzDate, timezone, 'HH')),
		minutes: Number(formatInTimeZone(tzDate, timezone, 'mm')),
		seconds: Number(formatInTimeZone(tzDate, timezone, 'ss')),
	};

	return state;
};
