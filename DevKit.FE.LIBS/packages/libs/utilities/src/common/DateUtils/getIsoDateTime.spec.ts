import { setDateUtilsConfig, updateDateUtilsConfig } from '@devkit/config/dist/date';
import { getIsoDateTime } from '.';

const sampleUTCStartDay = new Date('2020-04-22T00:00:00.000Z');

beforeEach(() => {
	setDateUtilsConfig({
		isoFormat: 'utc',
	});
});

describe('getIsoDateTime tests', () => {
	test('isoDateTime should be undefined', () => {
		const isoDateTime = getIsoDateTime(undefined);

		expect(isoDateTime).toBeUndefined();
	});

	test('isoDateTime should be date only', () => {
		const isoDateTime = getIsoDateTime(sampleUTCStartDay, true);

		expect(isoDateTime).toBe('2020-04-22');
	});

	test('isoDateTime should be in isoFormat', () => {
		const isoDateTime = getIsoDateTime(sampleUTCStartDay);

		expect(isoDateTime).toBe('2020-04-22T00:00:00.000Z');
	});
	test('isoDateTime should show iso-tz-offset', () => {
		updateDateUtilsConfig({
			isoFormat: 'iso-tz-offset',
			timezone: 'Asia/Dubai',
		});
		const isoDateTime = getIsoDateTime(sampleUTCStartDay);

		expect(isoDateTime).toBe('2020-04-22"1587528000000"04:00:00+0400');
	});
});
