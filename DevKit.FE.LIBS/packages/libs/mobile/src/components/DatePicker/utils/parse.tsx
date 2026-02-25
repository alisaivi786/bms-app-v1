import { ECalendars, parseTzFormattedDate, parseTzFormattedDateTime } from '@devkit/utilities';
import { CalendarViewMode } from '../components/CalendarView';

export const parse = (viewMode: CalendarViewMode | undefined, enableTimeSelection: boolean) => {
	switch (viewMode) {
		case 'time':
			return (value: string, format?: undefined, calendar?: ECalendars, unMaskedDate?: string | undefined) =>
				parseTzFormattedDate(value, 'HH:mm', calendar, unMaskedDate);
		case 'months':
			return (value: string, format?: undefined, calendar?: ECalendars, unMaskedDate?: string | undefined) =>
				parseTzFormattedDate(value, 'MM/yyyy', calendar, unMaskedDate);
		case 'years':
			return (value: string, format?: undefined, calendar?: ECalendars, unMaskedDate?: string | undefined) =>
				parseTzFormattedDate(value, 'yyyy', calendar, unMaskedDate);
		case 'days':
		default:
			return enableTimeSelection ? parseTzFormattedDateTime : parseTzFormattedDate;
	}
};
