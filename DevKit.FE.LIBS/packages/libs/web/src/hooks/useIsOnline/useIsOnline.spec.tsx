import { act, renderHook } from '@testing-library/react';
import { useIsOnline } from './index';

describe('useIsOnline', () => {
	it('should return initial online state', () => {
		const { result } = renderHook(() => useIsOnline());

		expect(result.current).toBe(true); // Initial state from useState
	});

	it('should update state and call onOnline when "online" event occurs', () => {
		const onOnline = jest.fn();
		const { result } = renderHook(() => useIsOnline({ onOnline }));

		act(() => {
			window.dispatchEvent(new Event('online'));
		});

		expect(onOnline).toHaveBeenCalledTimes(1);
		expect(result.current).toBe(true);
	});

	it('should update state and call onOffline when "offline" event occurs', () => {
		const onOffline = jest.fn();
		const { result } = renderHook(() => useIsOnline({ onOffline }));

		act(() => {
			window.dispatchEvent(new Event('offline'));
		});

		expect(onOffline).toHaveBeenCalledTimes(1);
		expect(result.current).toBe(false);
	});

	it('should clean up event listeners on unmount', () => {
		const removerListener = jest.spyOn(global, 'removeEventListener').mockImplementation(jest.fn());
		const { unmount } = renderHook(() => useIsOnline());

		unmount();

		expect(removerListener).toHaveBeenCalledTimes(2); // 2 events, each added and removed
	});
});
