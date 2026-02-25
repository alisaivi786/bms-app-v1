import { formatInTimeZone } from 'date-fns-tz';
import { arEG, enGB } from 'date-fns/locale';
import { logger } from '../Debug';
import { convertZonedDateToSystemDate, getDateUtilsConfig, getDefaultFormats } from './base';
import { getIsoDateTime } from './getIsoDateTime';
import { ECalendars, islamicCalendarFormat } from './hijri';

export const baseFormat = (
	date?: string | number | Date,
	options?: {
		dateFormat?: string;
		skipRTLCharacter?: boolean;
		calendar?: ECalendars;
		locale?: 'ar' | 'en';
	}
) => {
	let formattedDate =
		getIsoDateTime(typeof date === 'string' || typeof date === 'number' ? new Date(date) : date) ?? '';

	if (!date) return '';
	const { defaultFormats, timezone } = getDefaultFormats();
	const { locale: localeFromConfig } = getDateUtilsConfig();
	//const locale = 'ar';
	const localeScript = `${options?.locale ?? localeFromConfig}-${islamicCalendarFormat}`;
	const { dateFormat = defaultFormats.dateFormat, skipRTLCharacter = false, calendar = 'gregorian' } = options ?? {};

	try {
		if (calendar === 'hijri') {
			// default format
			let hijriFormatOptions: Intl.DateTimeFormatOptions | undefined;

			switch (dateFormat) {
				case 'dd/MM/yyyy':
					hijriFormatOptions = {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
					};
					break;
				case 'd':
					hijriFormatOptions = {
						day: 'numeric',
					};
					break;
				case 'EEEEE':
					hijriFormatOptions = {
						weekday: 'short',
					};
					break;
				case 'EEEEEE':
					hijriFormatOptions = {
						weekday: 'short',
					};
					break;
				case 'MMM':
					hijriFormatOptions = {
						month: 'short',
					};
					break;
				case 'MMMM':
					hijriFormatOptions = {
						month: 'long',
					};
					break;
				case 'yyyy':
					hijriFormatOptions = {
						year: 'numeric',
					};
					break;
				case 'MM/yyyy':
					hijriFormatOptions = {
						year: 'numeric',
						month: '2-digit',
					};
					break;
				case 'HH:mm':
					hijriFormatOptions = {
						hour: '2-digit',
						minute: '2-digit',
					};
					break;
				default:
					hijriFormatOptions = {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
					};
					break;
			}

			const format = new Intl.DateTimeFormat(localeScript, {
				...hijriFormatOptions,
			} as Intl.DateTimeFormatOptions);
			let parts = [];
			const systemDate = convertZonedDateToSystemDate(
				typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
			);

			switch (dateFormat) {
				case 'dd/MM/yyyy':
					parts = format.formatToParts(systemDate);

					formattedDate = `${parts.find((p) => p.type === 'day')?.value ?? ''}/${
						parts.find((p) => p.type === 'month')?.value ?? ''
					}/${parts.find((p) => p.type === 'year')?.value ?? ''}`;
					break;
				default:
					formattedDate = format.format(systemDate);
					break;
			}
		} else {
			// gregorian
			formattedDate = formatInTimeZone(date, timezone, dateFormat, {
				locale: (options?.locale ?? localeFromConfig) === 'ar' ? arEG : enGB,
			});
		}
	} catch (ex) {
		logger.error(ex);
	}

	return skipRTLCharacter ? formattedDate : `‎${formattedDate}`;
};
