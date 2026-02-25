import { setDateUtilsConfig, updateDateUtilsConfig } from '@devkit/config/dist/date';
import { parseTzFormattedDateTime } from '.';

const sampleUTCUAEDate = new Date('2020-01-01T20:00:00.000Z'); // End of the Day in UAE time (UTC -4hr).
const sampleUTCEgyptDate = new Date('2020-01-01T22:00:00.000Z'); // End of the Day in Egypt time (UTC -2hr).

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'Asia/Dubai',
	});
});

describe('parseTzFormattedDateTime tests', () => {
	test('parseTzFormattedDateTime should equal date: undefined and isValid: false', () => {
		const parseFormattedDate = parseTzFormattedDateTime(undefined);

		expect(parseFormattedDate).toEqual({
			date: undefined,
			isValid: false,
		});
	});

	test('parseTzFormattedDateTime should equal date: sampleUTCUAEDate and isValid: true', () => {
		const parseFormattedDate = parseTzFormattedDateTime('02/01/2020 00:00', false);

		expect(parseFormattedDate).toEqual({
			date: sampleUTCUAEDate,
			isValid: true,
		});
	});

	test('parseTzFormattedDateTime should equal date: sampleUTCEgyptDate and isValid: true', () => {
		updateDateUtilsConfig({
			timezone: 'Africa/Cairo',
		});
		const parseFormattedDate = parseTzFormattedDateTime('02/01/2020 00:00:00', true);

		expect(parseFormattedDate).toEqual({
			date: sampleUTCEgyptDate,
			isValid: true,
		});
	});

	test('parseTzFormattedDateTime dateString should equal date: undefined and isValid: false', () => {
		const parseFormattedDate = parseTzFormattedDateTime('This is not a dateString');

		expect(parseFormattedDate).toEqual({
			date: undefined,
			isValid: false,
		});
	});
});
