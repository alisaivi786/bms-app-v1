import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzEachMonthOfInterval, parseIsoDateTime } from '.';

const sampleUTCStartDate = new Date('2020-04-20T00:00:00.000Z');
const sampleUTCEndDate = new Date('2020-07-20T00:00:00.000Z');

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'GMT',
	});
});

describe('getTzEachMonthOfInterval tests', () => {
	test('getTzEachMonthOfInterval should be Undefined with error in logs', () => {
		const getTzEachDays = getTzEachMonthOfInterval({ tzDateStart: sampleUTCEndDate, tzDateEnd: sampleUTCStartDate });

		expect(getTzEachDays).toEqual([]);
	});
	test('getTzEachMonthOfInterval array length should be 4', () => {
		const getTzEachDays = getTzEachMonthOfInterval({ tzDateStart: sampleUTCStartDate, tzDateEnd: sampleUTCEndDate });

		expect(getTzEachDays).toHaveLength(4);
	});

	test('getTzEachMonthOfInterval should be array of 4 dates', () => {
		const getTzEachDays = getTzEachMonthOfInterval({ tzDateStart: sampleUTCStartDate, tzDateEnd: sampleUTCEndDate });
		const dateWithUserTimeZoneArr = [
			parseIsoDateTime('2020-04-01T00:00:00.000Z'),
			parseIsoDateTime('2020-05-01T00:00:00.000Z'),
			parseIsoDateTime('2020-06-01T00:00:00.000Z'),
			parseIsoDateTime('2020-07-01T00:00:00.000Z'),
		];

		expect(getTzEachDays).toEqual(dateWithUserTimeZoneArr);
	});
});
