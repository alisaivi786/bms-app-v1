import { startOfWeek } from 'date-fns';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';

export const getTzStartOfWeek = (tzDate: Date) => {
	const systemDate = convertZonedDateToSystemDate(tzDate);

	const newDate = startOfWeek(systemDate, { weekStartsOn: 1 });

	return convertSystemDateToZonedDate(newDate);
};
