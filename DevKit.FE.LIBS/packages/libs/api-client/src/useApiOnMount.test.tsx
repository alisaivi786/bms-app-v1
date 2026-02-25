import { z } from 'zod';
import { renderHook, waitFor } from '@testing-library/react';
import { createAPIDefinition } from './apiCreateDefinition';
import * as requestAxiosApi from './helpers/request-axios-api';
import useApiOnMount from './useApiOnMount';

jest.mock('./helpers/request-axios-api');
jest.mock('uuid', () => ({
	v4: () => 'mock-uuid-123',
}));

describe('useApiOnMount', () => {
	const mockAxiosRequest = requestAxiosApi.requestAxiosApi as jest.MockedFunction<
		typeof requestAxiosApi.requestAxiosApi
	>;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should fetch data on mount', async () => {
		mockAxiosRequest.mockResolvedValue({ data: { id: 1, name: 'Test User' }, status: 200, headers: {} });

		const api = createAPIDefinition({
			url: '/users/1',
			method: 'GET',
			responseSchema: z.object({
				id: z.number(),
				name: z.string(),
			}),
		});

		const { result } = renderHook(() => useApiOnMount(api, []));

		// Initially loading
		expect(result.current.isLoading).toBe(true);
		expect(result.current.result).toBeUndefined();
		expect(result.current.errors).toBeUndefined();

		// Wait for data to load
		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.result).toEqual({ id: 1, name: 'Test User' });
		expect(result.current.errors).toBeUndefined();
	});

	it('should handle errors', async () => {
		const mockError = { mapped: [{ code: 'ERROR', message: 'Failed to fetch' }], status: 500 };

		mockAxiosRequest.mockRejectedValue(mockError);

		const api = createAPIDefinition({
			url: '/users/1',
			method: 'GET',
			responseSchema: z.object({
				id: z.number(),
				name: z.string(),
			}),
		});

		const { result } = renderHook(() => useApiOnMount(api, []));

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.result).toBeUndefined();
		expect(result.current.errors).toEqual(mockError);
	});

	it('should not automatically refetch when props change (current implementation)', async () => {
		mockAxiosRequest.mockResolvedValue({ data: { id: 1, name: 'User 1' }, status: 200, headers: {} });

		const api = createAPIDefinition({
			url: '/users/:id',
			method: 'GET',
			requestParameters: {
				id: ['required', 'string'],
			},
			responseSchema: z.object({
				id: z.number(),
				name: z.string(),
			}),
		});

		const { result, rerender } = renderHook(({ userId }) => useApiOnMount(api, [{ parameters: { id: userId } }]), {
			initialProps: { userId: '1' },
		});

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(mockAxiosRequest).toHaveBeenCalledTimes(1);

		// Change dependency - current implementation doesn't auto-refetch
		mockAxiosRequest.mockResolvedValue({ data: { id: 2, name: 'User 2' }, status: 200, headers: {} });
		rerender({ userId: '2' });

		// The hook doesn't automatically refetch (useEffect has empty deps)
		// So it should still show the old result
		expect(result.current.result).toEqual({ id: 1, name: 'User 1' });
		expect(mockAxiosRequest).toHaveBeenCalledTimes(1);
	});

	it('should not refetch when dependencies do not change', async () => {
		mockAxiosRequest.mockResolvedValue({ data: { id: 1, name: 'User 1' }, status: 200, headers: {} });

		const api = createAPIDefinition({
			url: '/users/1',
			method: 'GET',
			responseSchema: z.object({
				id: z.number(),
				name: z.string(),
			}),
		});

		const { result, rerender } = renderHook(() => useApiOnMount(api, []));

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(mockAxiosRequest).toHaveBeenCalledTimes(1);

		// Rerender without changing dependencies
		rerender();

		expect(mockAxiosRequest).toHaveBeenCalledTimes(1);
	});
});
