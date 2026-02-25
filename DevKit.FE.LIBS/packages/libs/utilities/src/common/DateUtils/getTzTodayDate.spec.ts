import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzTodayDate, parseIsoDateTime } from '.';

beforeEach(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date('2020-01-01T10:00:00.000Z'));
});

describe('getTzTodayDate tests', () => {
	test('getTzTodayDate should equal GMT time', () => {
		setDateUtilsConfig({
			timezone: 'GMT',
		});
		const getTodayDate = getTzTodayDate();
		const currentZonedDate = parseIsoDateTime('2020-01-01T00:00:00.000Z');

		expect(getTodayDate).toEqual(currentZonedDate);
	});
	test('getTzTodayDate should equal Dubai', () => {
		setDateUtilsConfig({
			timezone: 'Asia/Dubai',
		});
		const getTodayDate = getTzTodayDate();
		// UTC time -4hr.
		const currentZonedDate = parseIsoDateTime('2019-12-31T20:00:00.000Z');

		expect(getTodayDate).toEqual(currentZonedDate);
	});
});
