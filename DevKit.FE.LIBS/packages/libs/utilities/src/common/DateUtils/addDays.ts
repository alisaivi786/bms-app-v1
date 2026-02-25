import { addMilliseconds, addDays as dateFnsAddDays } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate, getDateTimeConfig } from './base';

export const addDays = (tzDate: Date, amount: number) => {
	const systemDate = convertZonedDateToSystemDate(tzDate);
	const newDate = dateFnsAddDays(systemDate, amount);

	const offset = getTimezoneOffset(getDateTimeConfig().systemTimezone, systemDate);
	const offsetNewDate = getTimezoneOffset(getDateTimeConfig().systemTimezone, newDate);

	const offsetDiff = Math.abs(offsetNewDate - offset);

	return convertSystemDateToZonedDate(addMilliseconds(newDate, offsetDiff));
};
