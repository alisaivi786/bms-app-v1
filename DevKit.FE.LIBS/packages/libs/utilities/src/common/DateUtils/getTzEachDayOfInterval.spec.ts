import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzEachDayOfInterval, parseIsoDateTime } from '.';

const sampleUTCStartDayDate = new Date('2020-04-22T00:00:00.000Z');
const sampleUTCEndDayDate = new Date('2020-04-24T23:59:59.000Z');

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'GMT',
	});
});

describe('getTzEachDayOfInterval tests', () => {
	test('getTzEachDayOfInterval should be Undefined', () => {
		const getTzEachDays = getTzEachDayOfInterval({
			tzDateStart: sampleUTCEndDayDate,
			tzDateEnd: sampleUTCStartDayDate,
		});

		expect(getTzEachDays).toEqual([]);
	});

	test('getTzEachDayOfInterval array length should be 4', () => {
		const getTzEachDays = getTzEachDayOfInterval({
			tzDateStart: sampleUTCStartDayDate,
			tzDateEnd: sampleUTCEndDayDate,
		});

		expect(getTzEachDays).toHaveLength(3);
	});

	test('getTzEachDayOfInterval should be array of 4 dates', () => {
		const getTzEachDays = getTzEachDayOfInterval({
			tzDateStart: sampleUTCStartDayDate,
			tzDateEnd: sampleUTCEndDayDate,
		});
		const dateWithUserTimeZoneArr = [
			parseIsoDateTime('2020-04-22T00:00:00.000Z'),
			parseIsoDateTime('2020-04-23T00:00:00.000Z'),
			parseIsoDateTime('2020-04-24T00:00:00.000Z'),
		];

		expect(getTzEachDays).toEqual(dateWithUserTimeZoneArr);
	});
});
