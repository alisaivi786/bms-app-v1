import { parseNumberDate } from '.';

const sampleUTCDate = new Date(1577836800000); // equal to "1-1-2020" date.
const sampleDate = new Date(1577923200000); // equal to "2-1-2020" date.

describe('parseDateTime tests', () => {
	test('parseDateTime should equal sampleUTCDate', () => {
		const parseDateTime = parseNumberDate(1577836800000);

		expect(parseDateTime).toEqual(sampleUTCDate);
	});

	test('parseDateTime should not equal sampleDate', () => {
		const parseDateTime = parseNumberDate(1577836800000);

		expect(parseDateTime).not.toEqual(sampleDate);
	});

	test('parseDateTime should equal arg is not date it should be undefined', () => {
		const parseDateTime = parseNumberDate(undefined);

		expect(parseDateTime).toBeUndefined();
	});
});
