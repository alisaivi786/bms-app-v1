import { getNow } from '.';

beforeEach(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date('2020-01-01T00:00:00.000Z'));
});

describe('getNow test', () => {
	test('getNow should be equal now Date', () => {
		const getNowDate = getNow();
		const nowDate = new Date();

		expect(getNowDate).toEqual(nowDate);
	});
	test('getNow should be not equal next Day Date', () => {
		const getNowDate = getNow();
		const nextDayDate = new Date('2020-01-02T00:00:00.000Z');

		expect(getNowDate).not.toEqual(nextDayDate);
	});
});
