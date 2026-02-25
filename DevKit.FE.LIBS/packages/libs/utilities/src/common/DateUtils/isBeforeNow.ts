import { isBefore } from 'date-fns';
import { getNow } from './getNow';
import { parseIsoDateTime } from './parseIsoDateTime';

export const isBeforeNow = (date: Date | string | number | undefined) => {
	const newDate = typeof date === 'string' ? parseIsoDateTime(date) : date;

	if (!newDate) return false;

	return isBefore(newDate, getNow());
};
