import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzIsSameDay } from '.';

const sampleStartDay = new Date('2020-12-31T21:59:59.999Z');
const sampleUAEInSameDay = new Date('2020-12-31T21:50:59.999Z');
const sampleUAENotInSameDay = new Date('2020-12-30T21:59:59.999Z');

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'utc',
	});
});

describe('getTzIsSameDay tests', () => {
	test('getTzIsSameDay should equal true', () => {
		const getIsSameDay = getTzIsSameDay(sampleStartDay, sampleUAEInSameDay);

		expect(getIsSameDay).toEqual(true);
	});
	test('getTzIsSameDay should equal false', () => {
		const getIsSameDay = getTzIsSameDay(sampleStartDay, sampleUAENotInSameDay);

		expect(getIsSameDay).toEqual(false);
	});
});
