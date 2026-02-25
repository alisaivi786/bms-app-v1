import { setDateUtilsConfig, updateDateUtilsConfig } from '@devkit/config/dist/date';
import { getNow, getTzDate } from '.';

const sampleDate = new Date('2020-04-24T18:59:59.000Z');

beforeEach(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date('2020-04-24T20:59:59.000Z'));

	setDateUtilsConfig({
		timezone: 'Africa/Cairo',
	});
});

describe('getTZDate test', () => {
	test('getTZDate should be equal sampleEgyptDate', () => {
		const dateObj = { year: 2020, month: 4, day: 24, hours: 20, minutes: 59, seconds: 59 };
		const getTZDate = getTzDate(dateObj);

		expect(getTZDate).toEqual(sampleDate);
	});

	test('getTZDate should be equal now Date', () => {
		// Clock is increase by 2 hr. due to time difference.
		const dateObj = { year: 2020, month: 4, day: 24, hours: 22, minutes: 59, seconds: 59 };
		const getNowDate = getNow();
		const getTZDate = getTzDate(dateObj);

		expect(getTZDate).toEqual(getNowDate);
	});
});
test('getTZDate should be equal 2020-01-01 without sec., min. and hours', () => {
	updateDateUtilsConfig({
		timezone: 'GMT',
	});
	const dateObj = { year: 2020, month: 1, day: 1 };
	const getTZDate = getTzDate(dateObj);

	expect(getTZDate).toEqual(new Date('2020-01-01T00:00:00.000Z'));
});
