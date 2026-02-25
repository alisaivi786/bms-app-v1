import { endOfDay } from 'date-fns';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';

export const getTzEndOfDay = (tzDate: Date) => {
	const systemDate = convertZonedDateToSystemDate(tzDate);

	const newDate = endOfDay(systemDate);

	return convertSystemDateToZonedDate(newDate);
};
