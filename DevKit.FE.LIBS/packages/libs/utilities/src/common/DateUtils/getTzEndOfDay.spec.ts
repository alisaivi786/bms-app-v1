import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzEndOfDay } from '.';

const sampleUTCStartDay = new Date('2020-04-22T00:00:00.000Z');
const sampleUAEEndOfDay = new Date('2020-04-22T19:59:59.999Z'); // End of the day in UAE time (UTC -4hr).
const sampleUAEEndOfNextDay = new Date('2020-04-23T19:59:59.999Z'); // End of the Next day in the UAE time (UTC -4hr).

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'Asia/Dubai',
	});
});

describe('getTzEndOfDay tests', () => {
	test('getTzEndOfDay should equal sampleUAEEndOfDay', () => {
		const getUAEEndOfDay = getTzEndOfDay(sampleUTCStartDay);

		expect(getUAEEndOfDay).toEqual(sampleUAEEndOfDay);
	});

	test('getTzEndOfDay should Not equal sampleUAEEndOfNextDay', () => {
		const getUAEEndOfDay = getTzEndOfDay(sampleUTCStartDay);

		expect(getUAEEndOfDay).not.toEqual(sampleUAEEndOfNextDay);
	});
});
