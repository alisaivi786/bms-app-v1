import { act, renderHook } from '@testing-library/react';
import { useCountDownTimer } from './index';

jest.useFakeTimers();

describe('useCountDownTimer', () => {
	it('should behave correctly when a date is passed', async () => {
		const today = new Date();

		today.setMinutes(today.getMinutes() + 1);

		const { result } = renderHook(() => useCountDownTimer({ dueToDate: today }));

		expect(result.current.totalRemainingSeconds).toBe(60);

		act(() => {
			jest.advanceTimersByTime(30 * 1000);
		});

		expect(result.current.totalRemainingSeconds).toBe(30);

		act(() => {
			jest.advanceTimersByTime(30 * 1000);
		});

		expect(result.current.totalRemainingSeconds).toBe(0);
	});
	it('should behave correctly when a number is passed', async () => {
		const today = new Date();

		today.setMinutes(today.getMinutes() + 1);

		const { result } = renderHook(() => useCountDownTimer({ dueToDate: today.getTime() }));

		expect(result.current.totalRemainingSeconds).toBe(60);
	});
});
