import { getDuration } from '.';

const sampleStartDay = new Date('2020-04-22T00:00:00.000Z');
const sampleUTCEndOfDay = new Date('2020-04-28T22:50:59.000Z');
const sampleUTCDate = new Date('2021-07-30T22:50:59.000Z');

beforeEach(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date('2021-01-01T00:00:00.000Z')); // unify current time
});

describe('getDuration tests', () => {
	test('getDuration isPast should be true', () => {
		const dateDifference = getDuration(sampleStartDay, sampleUTCEndOfDay);

		expect(dateDifference.isPast).toBe(true);
	});
	test('getDuration isPast should be false', () => {
		const dateDifference = getDuration(sampleUTCEndOfDay, sampleStartDay);

		expect(dateDifference.isPast).toBe(false);
	});

	test('days difference should be 0 if inPaste is true', () => {
		const dateDifference = getDuration(sampleStartDay, sampleUTCEndOfDay);

		expect(dateDifference.days).toEqual(0);
	});

	test('days difference should be 6', () => {
		const dateDifference = getDuration(sampleUTCEndOfDay, sampleStartDay);

		expect(dateDifference.days).toEqual(6);
	});

	test('hours difference should be 22', () => {
		const dateDifference = getDuration(sampleUTCEndOfDay, sampleStartDay);

		expect(dateDifference.hours).toEqual(22);
	});

	test('minutes difference should be 50', () => {
		const dateDifference = getDuration(sampleUTCEndOfDay, sampleStartDay);

		expect(dateDifference.minutes).toEqual(50);
	});

	test('months difference should be 15', () => {
		const dateDifference = getDuration(sampleUTCDate, sampleStartDay);

		expect(dateDifference.months).toEqual(15);
	});

	test('seconds difference should be 59', () => {
		const dateDifference = getDuration(sampleUTCDate, sampleStartDay);

		expect(dateDifference.seconds).toEqual(59);
	});

	test('years difference should be 3', () => {
		const dateDifference = getDuration(sampleUTCDate, sampleStartDay);

		expect(dateDifference.years).toEqual(1);
	});

	test('difference should be 0 for all cases', () => {
		const dateDifference = getDuration(sampleUTCDate, sampleUTCDate);

		expect(dateDifference.years).toEqual(0);
		expect(dateDifference.months).toEqual(0);
		expect(dateDifference.minutes).toEqual(0);
		expect(dateDifference.seconds).toEqual(0);
	});
});
