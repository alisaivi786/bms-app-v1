import { baseFormat } from './baseFormat';
import { ECalendars } from './hijri';

export const formatDate = (
	date?: string | number | Date,
	options?: {
		dateFormat?: string;
		skipRTLCharacter?: boolean;
		calendar?: ECalendars;
		locale?: 'ar' | 'en';
	}
) => {
	return baseFormat(date, options);
};
