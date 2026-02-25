import { isBeforeNow } from '.';

const sampleUTCDay = new Date('2020-02-01T10:00:00.000Z');
const sampleUTCBeforeNow = new Date('2020-01-01T10:00:00.000Z');

beforeEach(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date('2020-02-01T10:00:00.000Z'));
});

describe('isBeforeNow tests', () => {
	test('isBeforeNow should equal false', () => {
		const isBefore = isBeforeNow(sampleUTCDay);

		expect(isBefore).toEqual(false);
	});
	test('isBeforeNow should equal true', () => {
		const isBefore = isBeforeNow(sampleUTCBeforeNow);

		expect(isBefore).toEqual(true);
	});
	test('isBeforeNow arg is not date should equal false', () => {
		const isBefore = isBeforeNow('this is not a date');

		expect(isBefore).toEqual(false);
	});
});
