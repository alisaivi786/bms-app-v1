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

export type DateTimeUtilOptions = Omit<Partial<DateTimeUtilConfig>, 'systemTimezone'>;

globalThis.dateTimeConfig = {
	isoFormat: 'utc',
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	timeFormat: '24hr',
	systemTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	locale: 'en',
};

export const setDateUtilsConfig = (options: DateTimeUtilOptions) => {
	const defaultsOptions = { ...globalThis.dateTimeConfig, ...options };
	const currentUserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	globalThis.dateTimeConfig['timeFormat'] = defaultsOptions['timeFormat'];
	globalThis.dateTimeConfig['isoFormat'] = defaultsOptions['isoFormat'];
	globalThis.dateTimeConfig['timezone'] = defaultsOptions['timezone'];
	globalThis.dateTimeConfig['systemTimezone'] = currentUserTimeZone;
};

export const updateDateUtilsConfig = (options: DateTimeUtilOptions) => {
	Object.keys(options).forEach((optionKey) => {
		const key = optionKey as keyof DateTimeUtilOptions;

		(globalThis.dateTimeConfig as Record<string, unknown>)[key] = options[key];
	});
};
