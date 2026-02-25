import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzEndOfWeek } from '.';

const sampleUTCStartDay = new Date('2020-04-01T00:00:01.000Z');
const sampleUAEEndOfThisWeek = new Date('2020-04-05T19:59:59.999Z'); // End of this Week in UAE time (UTC +4hr).
const sampleUAEEndOfNextWeek = new Date('2020-04-11T19:59:59.999Z'); // End of the next Week in UAE time (UTC +4hr).

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'Asia/Dubai',
	});
});

describe('getTzEndOfWeek tests', () => {
	test('getTzEndOfWeek should equal sampleUAEEndOfThisWeek', () => {
		const getUAEEndOfWeek = getTzEndOfWeek(sampleUTCStartDay);

		expect(getUAEEndOfWeek).toEqual(sampleUAEEndOfThisWeek);
	});

	test('getTzEndOfWeek should Not equal sampleUAEEndOfNextWeek', () => {
		const getUAEEndOfWeek = getTzEndOfWeek(sampleUTCStartDay);

		expect(getUAEEndOfWeek).not.toEqual(sampleUAEEndOfNextWeek);
	});
});
