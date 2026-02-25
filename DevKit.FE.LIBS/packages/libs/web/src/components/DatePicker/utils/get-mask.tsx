import { getDateUtilsConfig } from '@devkit/utilities';
import { CalendarViewMode } from '../components/CalendarView';

export const getMask = (viewMode: CalendarViewMode | undefined, enableTimeSelection: boolean) => {
	const {
		datePickerMask,
		dateTimePickerMaskDate,
		timePickerMaskDate,
		monthPickerMaskDate,
		yearPickerMaskDate,
		datePickerPlaceholder,
		dateTimePickerPlaceholder,
		timePickerPlaceholder,
	} = getDateUtilsConfig();

	switch (viewMode) {
		case 'time':
			return {
				value: timePickerMaskDate,
				placeholder: timePickerPlaceholder,
			};
		case 'months':
			return {
				value: monthPickerMaskDate,
				placeholder: undefined,
			};
		case 'years':
			return {
				value: yearPickerMaskDate,
				placeholder: undefined,
			};
		case 'days':
		default:
			return {
				value: enableTimeSelection ? dateTimePickerMaskDate : datePickerMask,
				placeholder: enableTimeSelection ? dateTimePickerPlaceholder : datePickerPlaceholder,
			};
	}
};
