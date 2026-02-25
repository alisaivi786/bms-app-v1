import { getDuration } from './getDuration';
import { getNow } from './getNow';

export const getDurationFromNow = (tzDate: Date | number) => {
	return getDuration(tzDate, getNow());
};
