import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzStartOfMonth } from '.';

const sampleStartDay = new Date('2020-04-01T00:00:00.000Z');
const sampleUAEStartOfMonth = new Date('2020-03-31T20:00:00.000Z'); // End of the Month in UAE time (UTC -4hr).
const sampleUAEStartOfNextMonth = new Date('2020-05-30T19:59:59.999Z'); // End of the Next Month in UAE time (UTC -4hr).

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'Asia/Dubai',
	});
});

describe('getTzStartOfMonth tests', () => {
	test('getTzStartOfMonth should equal sampleUAEStartOfMonth', () => {
		const getUAEEndOfMonth = getTzStartOfMonth(sampleStartDay);

		expect(getUAEEndOfMonth).toEqual(sampleUAEStartOfMonth);
	});
	test('getTzStartOfMonth should Not equal sampleUAEEndOfNextWeek', () => {
		const getUAEEndOfWeek = getTzStartOfMonth(sampleStartDay);

		expect(getUAEEndOfWeek).not.toEqual(sampleUAEStartOfNextMonth);
	});
});
