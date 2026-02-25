import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzEndOfYear } from '.';

const sampleUTCStartDay = new Date('2020-04-22T00:00:00.000Z');
const sampleUTCEndOfThisYear = new Date('2020-12-31T23:59:59.999Z');
const sampleUTCEndOfNextYear = new Date('2021-12-31T23:59:59.999Z');

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'GMT',
	});
});

describe('getTzEndOfYear tests', () => {
	test('getTzEndOfYear should equal sampleUAEEndOfThisYear', () => {
		const getUAEEndOfYear = getTzEndOfYear(sampleUTCStartDay);

		expect(getUAEEndOfYear).toEqual(sampleUTCEndOfThisYear);
	});

	test('getUAEEndOfYear should Not equal sampleUAEEndOfNextYear', () => {
		const getUAEEndOfYear = getTzEndOfYear(sampleUTCStartDay);

		expect(getUAEEndOfYear).not.toEqual(sampleUTCEndOfNextYear);
	});
});
