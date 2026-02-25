import { TzDateState, convertSystemDateToZonedDate } from './base';

export const getTzDate = ({ year, month, day, hours = 0, minutes = 0, seconds = 0 }: TzDateState) => {
	const newDate = new Date(year, month - 1, day, hours, minutes, seconds);

	return convertSystemDateToZonedDate(newDate);
};
