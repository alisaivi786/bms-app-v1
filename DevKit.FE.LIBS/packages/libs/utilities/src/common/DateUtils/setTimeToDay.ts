import { add, getHours, getMinutes, getSeconds, startOfDay } from 'date-fns';
import { convertSystemDateToZonedDate, convertZonedDateToSystemDate } from './base';

/**
 * Copy the time from the source date into target date regardless of the timezone
 * @param sourceDate
 * @param targetDate
 * @returns
 */
export const setTimeToDay = (sourceDate: Date | number, targetDate: Date | number) => {
	const systemTargetDate = convertZonedDateToSystemDate(targetDate);
	const systemSourceDate = convertZonedDateToSystemDate(sourceDate);

	const targetStartDate = startOfDay(systemTargetDate);

	const hoursToAdd = getHours(systemSourceDate);
	const minutesToAdd = getMinutes(systemSourceDate);
	const secondsToAdd = getSeconds(systemSourceDate);

	const newDate = add(targetStartDate, {
		hours: hoursToAdd,
		minutes: minutesToAdd,
		seconds: secondsToAdd,
	});

	return convertSystemDateToZonedDate(newDate);
};
