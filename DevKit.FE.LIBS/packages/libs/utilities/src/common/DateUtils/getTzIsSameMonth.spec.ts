import { getTzIsSameMonth } from '.';

const sampleUAEStartDay = new Date('2020-12-30');
const sampleUAEDateInSameMonth = new Date('2020-12-20');
const sampleUAEDateNotInSameMonth = new Date('2020-11-20');

describe('getTzIsSameMonth tests', () => {
	test('getTzIsSameMonth should equal true', () => {
		const getIsSameMonth = getTzIsSameMonth(sampleUAEStartDay, sampleUAEDateInSameMonth);

		expect(getIsSameMonth).toEqual(true);
	});
	test('getTzIsSameMonth should equal false', () => {
		const getIsSameMonth = getTzIsSameMonth(sampleUAEStartDay, sampleUAEDateNotInSameMonth);

		expect(getIsSameMonth).toEqual(false);
	});
});
