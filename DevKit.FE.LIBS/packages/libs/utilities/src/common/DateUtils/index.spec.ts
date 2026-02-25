import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { formatDate, getIsoDateTime } from '.';

const sampleUTCStartDay = new Date('2020-04-22T00:00:00.000Z');
const sampleUTCEndOfDay = new Date('2020-04-24T23:59:59.000Z');

beforeEach(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date('2020-04-24T22:59:59.000Z'));

	setDateUtilsConfig({
		timezone: 'Africa/Cairo',
	});
});

describe('index tests', () => {
	test('format date With default format no skip rtl character', () => {
		const formattedDateWithUserTimeZone = formatDate(sampleUTCStartDay);

		expect(formattedDateWithUserTimeZone).toBe('‎22/04/2020');
	});

	test('format date With default format skip character', () => {
		const formattedDateWithUserTimeZone = formatDate(sampleUTCStartDay, {
			skipRTLCharacter: true,
		});

		expect(formattedDateWithUserTimeZone).toBe('22/04/2020');
	});

	test('format date With default format custom format', () => {
		const formattedDateWithUserTimeZone = formatDate(sampleUTCStartDay, {
			dateFormat: 'dd--MM--yyyy',
			skipRTLCharacter: true,
		});

		expect(formattedDateWithUserTimeZone).toBe('22--04--2020');
	});

	test('format date With default parse iso format', () => {
		const formattedDateWithUserTimeZone = getIsoDateTime(sampleUTCEndOfDay);

		expect(formattedDateWithUserTimeZone).toBe('2020-04-24T23:59:59.000Z');
	});
});
