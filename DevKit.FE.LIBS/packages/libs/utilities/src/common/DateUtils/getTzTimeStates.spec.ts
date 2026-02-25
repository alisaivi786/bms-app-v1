import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzTimeStates } from '.';

const sampleUTCDay = new Date('2020-01-02T03:04:05.000Z');

describe('getTzTimeStates tests', () => {
	test('getTzTimeStates should equal { year: 2020, month: 1, day: 2, hours: 3, minutes: 4, seconds: 5 }', () => {
		setDateUtilsConfig({
			timezone: 'GMT',
		});
		const getTimeStates = getTzTimeStates(sampleUTCDay);

		expect(getTimeStates).toEqual({ year: 2020, month: 1, day: 2, hours: 3, minutes: 4, seconds: 5 });
	});

	test('getTzTimeStates should be equal the same +4hr', () => {
		setDateUtilsConfig({
			timezone: 'Asia/Dubai',
		});
		const getTimeStates = getTzTimeStates(sampleUTCDay);

		expect(getTimeStates).toEqual({ year: 2020, month: 1, day: 2, hours: 7, minutes: 4, seconds: 5 });
	});
});
