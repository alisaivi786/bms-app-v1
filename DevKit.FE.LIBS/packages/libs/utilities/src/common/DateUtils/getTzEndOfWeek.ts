import { endOfWeek } from 'date-fns';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';

export const getTzEndOfWeek = (tzDate: Date) => {
	const systemDate = convertZonedDateToSystemDate(tzDate);

	const newDate = endOfWeek(systemDate, { weekStartsOn: 1 });

	return convertSystemDateToZonedDate(newDate);
};
