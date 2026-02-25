import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { parseIsoDateTime } from '.';

const sampleUTCDate = new Date('2020-01-01T10:00:00.000Z');
const sampleDate = new Date('2020-01-02');
const sampleStartOfDay = new Date('2020-01-01T00:00:00.000Z');

beforeEach(() => {
	setDateUtilsConfig({
		isoFormat: 'utc',
		timezone: 'GMT',
	});
});

describe('parseDateTime tests', () => {
	test('parseDateTime should equal sampleUTCDate', () => {
		const parseDateTime = parseIsoDateTime('2020-01-01T10:00:00.000Z');

		expect(parseDateTime).toEqual(sampleUTCDate);
	});

	test('parseDateTime should equal sampleDate', () => {
		const parseDateTime = parseIsoDateTime('2020-01-01T10:00:00.000Z');

		expect(parseDateTime).not.toEqual(sampleDate);
	});

	test('parseDateTime should equal sampleStartOfDay', () => {
		const parseDateTime = parseIsoDateTime('2020-01-01');

		expect(parseDateTime).toEqual(sampleStartOfDay);
	});

	test('parseDateTime should equal arg is not date it should be undefined', () => {
		const parseDateTime = parseIsoDateTime('this is not a date');

		expect(parseDateTime).toBeUndefined();
	});

	test('parseDateTime should be undefined', () => {
		// with logger error.
		const parseDateTime = parseIsoDateTime(undefined);

		expect(parseDateTime).toBeUndefined();
	});
});
