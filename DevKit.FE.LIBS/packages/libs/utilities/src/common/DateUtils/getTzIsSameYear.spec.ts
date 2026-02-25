import { getTzIsSameYear } from '.';

const sampleUAEStartDay = new Date('2020-12-30');
const sampleUAEInSameYear = new Date('2020-1-30');
const sampleUAENotInSameYear = new Date('2021-12-30');

describe('getTzIsSameYear tests', () => {
	test('getTzIsSameYear should equal true', () => {
		const getIsSameYear = getTzIsSameYear(sampleUAEStartDay, sampleUAEInSameYear);

		expect(getIsSameYear).toEqual(true);
	});
	test('getTzIsSameYear should equal false', () => {
		const getIsSameYear = getTzIsSameYear(sampleUAEStartDay, sampleUAENotInSameYear);

		expect(getIsSameYear).toEqual(false);
	});
});
