import { getDefaultFormats } from './base';
import { baseFormat } from './baseFormat';
import { ECalendars } from './hijri';

export const formatDateTime = (
	date?: Date | string | number,
	options?: {
		showSecondes?: boolean;
		calendar?: ECalendars;
	}
) => {
	const { showSecondes } = { showSecondes: false, ...options };

	const { defaultFormats } = getDefaultFormats();

	return baseFormat(date, {
		...options,
		dateFormat: showSecondes ? defaultFormats.dateTimeFormatWithSeconds : defaultFormats.dateTimeFormat,
	});
};
