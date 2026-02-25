import { ECalendars, formatDate, formatDateTime } from '@devkit/utilities';
import type { CalendarViewMode } from '../components/CalendarView';

export const getDateFormatter = (viewMode: CalendarViewMode | undefined, enableTimeSelection: boolean) => {
	switch (viewMode) {
		case 'time':
			return (
				date: string | number | Date,
				options?: {
					calendar?: ECalendars;
				}
			) => formatDate(date, { ...options, dateFormat: 'HH:mm' });
		case 'months':
			return (
				date: string | number | Date,
				options?: {
					calendar?: ECalendars;
				}
			) => formatDate(date, { ...options, dateFormat: 'MM/yyyy' });
		case 'years':
			return (
				date: string | number | Date,
				options?: {
					calendar?: ECalendars;
				}
			) => formatDate(date, { ...options, dateFormat: 'yyyy' });
		case 'days':
		default:
			return enableTimeSelection ? formatDateTime : formatDate;
	}
};
