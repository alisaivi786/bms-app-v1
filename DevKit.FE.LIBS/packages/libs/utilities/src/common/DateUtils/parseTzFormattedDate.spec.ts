import { setDateUtilsConfig, updateDateUtilsConfig } from '@devkit/config/dist/date';
import { parseTzFormattedDate } from '.';
import { getDefaultFormats } from './base';

const sampleUTCUAEDate = new Date('2020-01-01T20:00:00.000Z'); // End of the Day in UAE time (UTC -4hr).
const sampleUTCEgyptDate = new Date('2020-01-01T22:00:00.000Z'); // End of the Day in Egypt time (UTC -2hr).

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'Asia/Dubai',
	});
});

describe('parseTzFormattedDate tests', () => {
	test('parseTzFormattedDate should equal date: undefined and isValid: false', () => {
		const parseFormattedDate = parseTzFormattedDate(undefined);

		expect(parseFormattedDate).toEqual({
			date: undefined,
			isValid: false,
		});
	});

	test('parseTzFormattedDate should equal date: sampleUTCUAEDate and isValid: true', () => {
		const parseFormattedDate = parseTzFormattedDate('02/01/2020');

		expect(parseFormattedDate).toEqual({
			date: sampleUTCUAEDate,
			isValid: true,
		});
	});

	test('parseTzFormattedDate should equal date: sampleUTCEgyptDate and isValid: true', () => {
		updateDateUtilsConfig({
			timezone: 'Africa/Cairo',
		});
		const parseFormattedDate = parseTzFormattedDate(
			'02/01/2020 00:00:00',
			getDefaultFormats().defaultFormats.dateTimeFormatWithSeconds
		);

		expect(parseFormattedDate).toEqual({
			date: sampleUTCEgyptDate,
			isValid: true,
		});
	});

	test('parseTzFormattedDate dateString should equal date: undefined and isValid: false', () => {
		const parseFormattedDate = parseTzFormattedDate('This is not a dateString');

		expect(parseFormattedDate).toEqual({
			date: undefined,
			isValid: false,
		});
	});
});
