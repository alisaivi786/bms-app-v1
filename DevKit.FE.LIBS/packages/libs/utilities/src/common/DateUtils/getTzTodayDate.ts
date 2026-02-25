import { intervalToDuration } from 'date-fns';
import { getTimezoneOffset, utcToZonedTime } from 'date-fns-tz';
import { getDefaultFormats } from './base';
import { getNow } from './getNow';

export const getTzTodayDate = () => {
	const { timezone } = getDefaultFormats();

	const currentZonedDate = getNow();

	const newDate = utcToZonedTime(currentZonedDate, timezone);
	const offsetMs = getTimezoneOffset(timezone);
	const offsetData = intervalToDuration({ start: 0, end: offsetMs });

	newDate.setUTCHours(
		(offsetMs > 0 ? -1 : 1) * (offsetData.hours ?? 0),
		offsetData.minutes,
		offsetData.seconds,
		offsetData.seconds
	);

	const tempDate = new Date(newDate);

	tempDate.setUTCFullYear(currentZonedDate.getUTCFullYear());
	tempDate.setUTCMonth(currentZonedDate.getUTCMonth());
	tempDate.setUTCDate(currentZonedDate.getUTCDate());

	if (tempDate > currentZonedDate) return newDate;
	else return tempDate;
};
