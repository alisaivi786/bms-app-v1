import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzStartOfWeek } from '.';

const sampleUTCDate = new Date('2020-04-04T00:00:00.000Z');
const sampleUAEStartOfWeek = new Date('2020-03-29T20:00:00.000Z'); // Start of the Week in UAE time (UTC +4hr).
const sampleUAEStartOfNextWeek = new Date('2020-04-08T20:00:00.000Z'); // End of the Week in UAE time (UTC +4hr).

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'Asia/Dubai',
	});
});

describe('getTzStartOfWeek tests', () => {
	test('getTzStartOfWeek should equal sampleUAEStartOfWeek', () => {
		const getUAEEndOfWeek = getTzStartOfWeek(sampleUTCDate);

		expect(getUAEEndOfWeek).toEqual(sampleUAEStartOfWeek);
	});

	test('getTzStartOfWeek should Not equal sampleUAEStartOfNextWeek', () => {
		const getUAEEndOfWeek = getTzStartOfWeek(sampleUTCDate);

		expect(getUAEEndOfWeek).not.toEqual(sampleUAEStartOfNextWeek);
	});
});
