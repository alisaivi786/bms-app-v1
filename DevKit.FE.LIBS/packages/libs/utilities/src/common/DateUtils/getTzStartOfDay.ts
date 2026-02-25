import { startOfDay } from 'date-fns';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';

export const getTzStartOfDay = (tzDate: Date) => {
	const systemDate = convertZonedDateToSystemDate(tzDate);

	const newDate = startOfDay(systemDate);

	return convertSystemDateToZonedDate(newDate);
};
