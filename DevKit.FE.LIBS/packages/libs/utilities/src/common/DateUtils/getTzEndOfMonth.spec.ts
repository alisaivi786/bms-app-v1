import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzEndOfMonth } from '.';

const sampleUTCStartDay = new Date('2020-04-01T00:00:01.000Z');
const sampleUAEEndOfThisMonth = new Date('2020-04-30T19:59:59.999Z'); // End of the Month in UAE time (UTC -4hr).
const sampleUAEEndOfNextMonth = new Date('2020-05-30T19:59:59.999Z'); // End of the Next Month in UAE time (UTC -4hr).

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'Asia/Dubai',
	});
});

describe('getTzEndOfMonth tests', () => {
	test('getTzEndOfMonth should equal sampleUAEEndOfThisMonth', () => {
		const getUAEEndOfMonth = getTzEndOfMonth(sampleUTCStartDay);

		expect(getUAEEndOfMonth).toEqual(sampleUAEEndOfThisMonth);
	});
	test('getTzEndOfMonth should Not equal sampleUAEEndOfNextWeek', () => {
		const getUAEEndOfWeek = getTzEndOfMonth(sampleUTCStartDay);

		expect(getUAEEndOfWeek).not.toEqual(sampleUAEEndOfNextMonth);
	});
});
