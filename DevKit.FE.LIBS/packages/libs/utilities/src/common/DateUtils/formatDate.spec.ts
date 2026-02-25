import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { formatDate } from '.';

const sampleStartDay = new Date('2020-04-22T00:00:00.000Z');

beforeEach(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date('2020-04-24T22:59:59.000Z'));

	setDateUtilsConfig({
		timezone: 'Africa/Cairo',
	});
});

describe('formatDate tests', () => {
	test('formatDate With default format no skip rtl ‎ character', () => {
		const formattedDateWithUserTimeZone = formatDate(sampleStartDay, {
			skipRTLCharacter: false,
		});

		expect(formattedDateWithUserTimeZone).toBe('‎22/04/2020');
	});

	test('formatDate With default format skip character', () => {
		const formattedDateWithUserTimeZone = formatDate(sampleStartDay, {
			skipRTLCharacter: true,
		});

		expect(formattedDateWithUserTimeZone).toBe('22/04/2020');
	});

	test('formatDate With default format custom format', () => {
		const formattedDateWithUserTimeZone = formatDate(sampleStartDay, {
			dateFormat: 'dd--MM--yyyy',
			skipRTLCharacter: true,
		});

		expect(formattedDateWithUserTimeZone).toBe('22--04--2020');
	});

	test('formatDate should return empty string', () => {
		const formattedDateWithUserTimeZone = formatDate(undefined);

		expect(formattedDateWithUserTimeZone).toBe('');
	});
});
