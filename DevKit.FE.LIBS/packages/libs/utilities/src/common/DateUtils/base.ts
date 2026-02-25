import { addMilliseconds } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';

declare global {
	// eslint-disable-next-line no-var
	var dateTimeConfig: DateTimeUtilConfig;
}

export type TzDateState = {
	year: number;
	month: number;
	day: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
};

export type DateTimeUtilConfig = {
	isoFormat: 'iso-tz-offset' | 'utc';
	timezone: string;
	timeFormat: '24hr' | '12hr';
	systemTimezone: string;
	locale: 'ar' | 'en';
};

export const getDateUtilsConfig = () => {
	return { ...getDateTimeConfig(), ...dateTimeUtilFormats[getDateTimeConfig().timeFormat] };
};

const dateTimeUtilFormats: Record<
	DateTimeUtilConfig['timeFormat'],
	{
		dateFormat: string;
		dateTimeFormat: string;
		dateTimeFormatWithSeconds: string;
		datePickerMask: string;
		dateTimePickerMaskDate: string;
		timePickerMaskDate: string;
		monthPickerMaskDate: string;
		yearPickerMaskDate: string;
		datePickerPlaceholder: string;
		dateTimePickerPlaceholder: string;
		timePickerPlaceholder: string;
		monthPickerPlaceholder: string;
	}
> = {
	'12hr': {
		dateFormat: 'dd/MM/yyyy',
		dateTimeFormat: 'dd/MM/yyyy hh:mm aa',
		dateTimeFormatWithSeconds: 'dd/MM/yyyy hh:mm:ss aa',
		datePickerMask: '99/99/9999',
		dateTimePickerMaskDate: '99/99/9999 99:99 aa',
		timePickerMaskDate: '99:99 aa',
		monthPickerMaskDate: '99/9999',
		yearPickerMaskDate: '9999',
		datePickerPlaceholder: '  /  /     ',
		dateTimePickerPlaceholder: '  /  /       :   AM',
		timePickerPlaceholder: '  :   AM',
		monthPickerPlaceholder: '  /     ',
	},
	'24hr': {
		dateFormat: 'dd/MM/yyyy',
		dateTimeFormat: 'dd/MM/yyyy HH:mm',
		dateTimeFormatWithSeconds: 'dd/MM/yyyy HH:mm:ss',
		datePickerMask: '99/99/9999',
		dateTimePickerMaskDate: '99/99/9999 99:99',
		timePickerMaskDate: '99:99',
		monthPickerMaskDate: '99/9999',
		yearPickerMaskDate: '9999',
		datePickerPlaceholder: '  /  /     ',
		dateTimePickerPlaceholder: '  /  /       :  ',
		timePickerPlaceholder: '  :  ',
		monthPickerPlaceholder: '  /     ',
	},
} as const;

const dateDefaults = {
	isoFormat: 'utc',
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	timeFormat: '24hr',
	systemTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	locale: 'en',
} as const;

export const getDateTimeConfig = () => {
	return globalThis.dateTimeConfig ?? dateDefaults;
};

export const getDefaultFormats = () => ({
	defaultFormats: dateTimeUtilFormats[getDateTimeConfig().timeFormat],
	timezone: getDateTimeConfig().timezone,
	isoFormat: getDateTimeConfig().isoFormat,
});

export const convertZonedDateToSystemDate = (zonedDate: Date | number) => {
	const systemOffsetMs = getTimezoneOffset(getDateTimeConfig().systemTimezone, zonedDate);
	const offsetMs = getTimezoneOffset(getDateTimeConfig().timezone, zonedDate);

	return addMilliseconds(zonedDate, offsetMs - systemOffsetMs);
};

export const convertSystemDateToZonedDate = (systemDate: Date | number) => {
	const systemOffsetMs = getTimezoneOffset(getDateTimeConfig().systemTimezone, systemDate);
	const offsetMs = getTimezoneOffset(getDateTimeConfig().timezone, systemDate);

	return addMilliseconds(systemDate, systemOffsetMs - offsetMs);
};
