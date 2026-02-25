import { getDurationFromNow, getNow } from '.';

const sampleUTCDate = new Date('2023-07-30T22:50:59.000Z');

beforeEach(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date('2021-04-24T22:59:50.000Z'));
});

describe('getDurationFromNow tests', () => {
	test('years difference should be 2', () => {
		const dateDifference = getDurationFromNow(sampleUTCDate);

		expect(dateDifference.years).toEqual(2);
	});

	test('months difference should be 27', () => {
		const dateDifference = getDurationFromNow(sampleUTCDate);

		expect(dateDifference.months).toEqual(27);
	});

	test('days difference should be 5', () => {
		const dateDifference = getDurationFromNow(sampleUTCDate);

		expect(dateDifference.days).toEqual(5);
	});

	test('hours difference should be 23', () => {
		const dateDifference = getDurationFromNow(sampleUTCDate);

		expect(dateDifference.hours).toEqual(23);
	});

	test('minutes difference should be 51', () => {
		const dateDifference = getDurationFromNow(sampleUTCDate);

		expect(dateDifference.minutes).toEqual(51);
	});

	test('seconds difference should be 9', () => {
		const dateDifference = getDurationFromNow(sampleUTCDate);

		expect(dateDifference.seconds).toEqual(9);
	});

	test('difference should be 0 for all cases', () => {
		const dateDifference = getDurationFromNow(getNow());

		expect(dateDifference.years).toEqual(0);
		expect(dateDifference.months).toEqual(0);
		expect(dateDifference.minutes).toEqual(0);
		expect(dateDifference.seconds).toEqual(0);
	});
});
