import { addMilliseconds, addMonths as dateFnsAddMonths } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate, getDateTimeConfig } from './base';

export const addMonths = (tzDate: Date, amount: number) => {
	const systemDate = convertZonedDateToSystemDate(tzDate);
	const newDate = dateFnsAddMonths(systemDate, amount);

	const offset = getTimezoneOffset(getDateTimeConfig().systemTimezone, systemDate);
	const offsetNewDate = getTimezoneOffset(getDateTimeConfig().systemTimezone, newDate);

	const offsetDiff = Math.abs(offsetNewDate - offset);

	return convertSystemDateToZonedDate(addMilliseconds(newDate, offsetDiff));
};
