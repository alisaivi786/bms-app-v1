import { TzDateState, convertZonedDateToSystemDate } from './base';

export const getSystemDate = ({ year, month, day, hours = 0, minutes = 0, seconds = 0 }: TzDateState) => {
	const newDate = new Date(year, month - 1, day, hours, minutes, seconds);

	return convertZonedDateToSystemDate(newDate);
};
