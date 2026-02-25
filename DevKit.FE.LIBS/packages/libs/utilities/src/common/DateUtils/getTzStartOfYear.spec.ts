import { setDateUtilsConfig } from '@devkit/config/dist/date';
import { getTzStartOfYear } from '.';

const sampleUTCDate = new Date('2020-04-22T00:00:00.000Z');
const sampleUTCStartOfYear = new Date('2020-01-01T00:00:00.000Z');
const sampleUTCStartOfNextYear = new Date('2021-01-01T00:00:00.000Z');

beforeEach(() => {
	setDateUtilsConfig({
		timezone: 'GMT',
	});
});

describe('getTzStartOfYear tests', () => {
	test('getTzStartOfYear should equal sampleUAEEndOfWeek', () => {
		const getUAEStartOfYear = getTzStartOfYear(sampleUTCDate);

		expect(getUAEStartOfYear).toEqual(sampleUTCStartOfYear);
	});

	test('getUAEStartOfYear should Not equal sampleUAEStartOfNextYear', () => {
		const getUAEStartOfYear = getTzStartOfYear(sampleUTCDate);

		expect(getUAEStartOfYear).not.toEqual(sampleUTCStartOfNextYear);
	});
});
