import { formatInTimeZone } from 'date-fns-tz';
import { getDefaultFormats } from './base';

export const getIsoDateTime = (date: Date | undefined, dateOnly = false) => {
	if (!date) return undefined;

	const { isoFormat, timezone } = getDefaultFormats();

	if (dateOnly) return formatInTimeZone(date, timezone, 'yyyy-MM-dd');

	if (isoFormat === 'iso-tz-offset') return formatInTimeZone(date, timezone, 'yyyy-MM-dd"T"HH:mm:ssXX');
	else return date.toISOString();
};
