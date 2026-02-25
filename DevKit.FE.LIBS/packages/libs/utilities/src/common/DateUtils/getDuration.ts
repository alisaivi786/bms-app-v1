import { differenceInMilliseconds, intervalToDuration } from 'date-fns';
import { getDifferenceInMonth } from './getDifferenceInMonth';

type IntervalDuration = Required<Omit<Duration, 'weeks'>>;

export const getDuration = (leftDate: Date | number, rightDate: Date | number) => {
	const difference = differenceInMilliseconds(leftDate, rightDate);

	const duration = intervalToDuration({ start: 0, end: difference > 0 ? difference : 0 });
	const isPast = difference <= 0;

	const requiredDuration: IntervalDuration = {
		days: 0,
		hours: 0,
		minutes: 0,
		months: 0,
		seconds: 0,
		years: 0,
	};

	Object.keys(duration).forEach((key) => {
		requiredDuration[key as keyof IntervalDuration] = duration[key as keyof Duration] ?? 0;
	});

	const monthDuration = getDifferenceInMonth(leftDate, rightDate);

	const totalSeconds = difference / 1000;
	const totalMinutes = totalSeconds / 60;
	const totalHours = totalMinutes / 60;

	return {
		...requiredDuration,
		months: monthDuration,
		isPast,
		totalSeconds: totalSeconds,
		totalMinutes: totalMinutes,
		totalHours: totalHours,
	};
};
