import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzStartOfDay } from '.';

const sampleUTCDate = new Date('2020-04-22T12:00:00.000Z');
const sampleUAEStartOfDay = new Date('2020-04-21T20:00:00.000Z'); // Start of the day in UAE time (UTC -4hr).
const sampleUAEStartOfNextDay = new Date('2020-04-22T20:00:00.000Z'); // End of the Next day in UAE time (UTC -4hr).

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'Asia/Dubai',
	});
});

describe('getTzStartOfDay tests', () => {
	test('getTzStartOfDay should equal sampleUAEStartOfDay', () => {
		const getUAEEndOfDay = getTzStartOfDay(sampleUTCDate);

		expect(getUAEEndOfDay).toEqual(sampleUAEStartOfDay);
	});

	test('getTzStartOfDay should Not equal sampleUAEStartOfNextDay', () => {
		const getUAEEndOfDay = getTzStartOfDay(sampleUTCDate);

		expect(getUAEEndOfDay).not.toEqual(sampleUAEStartOfNextDay);
	});
});
