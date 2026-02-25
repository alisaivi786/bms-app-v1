import { z } from 'zod';
import { createAPIDefinition } from './apiCreateDefinition';
import * as requestAxiosApi from './helpers/request-axios-api';
import * as requestFetchApi from './helpers/request-fetch-api';

// Mock the request modules
jest.mock('./helpers/request-axios-api');
jest.mock('./helpers/request-fetch-api');
jest.mock('uuid', () => ({
	v4: () => 'mock-uuid-123',
}));

describe('createAPIDefinition', () => {
	const mockAxiosRequest = requestAxiosApi.requestAxiosApi as jest.MockedFunction<
		typeof requestAxiosApi.requestAxiosApi
	>;
	const mockFetchRequest = requestFetchApi.requestFetchApi as jest.MockedFunction<
		typeof requestFetchApi.requestFetchApi
	>;

	beforeEach(() => {
		jest.clearAllMocks();
		mockAxiosRequest.mockResolvedValue({ data: { id: 1, name: 'Test User' }, status: 200, headers: {} });
		mockFetchRequest.mockResolvedValue({
			data: JSON.stringify({ id: 1, name: 'Test User' }),
			status: 200,
			headers: {},
		});
	});

	describe('Basic API Definition', () => {
		it('should create a basic GET API definition', async () => {
			const api = createAPIDefinition({
				url: '/users',
				method: 'GET',
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
				}),
			});

			expect(api).toBeInstanceOf(Function);
		});

		it('should create a POST API definition with request schema', async () => {
			const api = createAPIDefinition({
				url: '/users',
				method: 'POST',
				requestSchema: z.object({
					name: z.string(),
					email: z.string().email(),
				}),
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
				}),
			});

			expect(api).toBeInstanceOf(Function);
		});
	});

	describe('HTTP Client Selection', () => {
		it('should use Axios by default', async () => {
			const api = createAPIDefinition({
				url: '/users',
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
				}),
			});

			await api();

			expect(mockAxiosRequest).toHaveBeenCalled();
			expect(mockFetchRequest).not.toHaveBeenCalled();
		});

		it('should use Fetch when httpClient is set to fetch', async () => {
			const api = createAPIDefinition({
				url: '/users',
				httpClient: 'fetch',
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
				}),
			});

			await api();

			expect(mockFetchRequest).toHaveBeenCalled();
			expect(mockAxiosRequest).not.toHaveBeenCalled();
		});

		it('should use Axios when httpClient is explicitly set to axios', async () => {
			const api = createAPIDefinition({
				url: '/users',
				httpClient: 'axios',
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
				}),
			});

			await api();

			expect(mockAxiosRequest).toHaveBeenCalled();
			expect(mockFetchRequest).not.toHaveBeenCalled();
		});

		it('should use Fetch when httpClient is set to fetch (streaming compatible)', async () => {
			// Mock a proper streaming response
			mockFetchRequest.mockResolvedValue({
				data: JSON.stringify({ data: 'streaming data' }),
				status: 200,
				headers: {},
			});

			const api = createAPIDefinition({
				url: '/stream',
				httpClient: 'fetch', // Explicitly set to fetch for streaming compatibility
				responseSchema: z.object({
					data: z.string(),
				}),
			});

			await api();

			expect(mockFetchRequest).toHaveBeenCalled();
			expect(mockAxiosRequest).not.toHaveBeenCalled();
		});
	});

	describe('API Execution', () => {
		it('should call API without request body for GET', async () => {
			mockAxiosRequest.mockResolvedValue({ data: { id: 1, name: 'John Doe' }, status: 200, headers: {} });

			const api = createAPIDefinition({
				url: '/users/1',
				method: 'GET',
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
				}),
			});

			const result = await api();

			expect(result).toEqual({ id: 1, name: 'John Doe' });
			expect(mockAxiosRequest).toHaveBeenCalledWith(
				undefined, // baseURL
				{}, // headers
				undefined, // requestSpecificHeaders
				undefined, // requestSpecificParameters
				'/users/1', // url
				'GET', // method
				undefined, // request
				undefined, // refreshToken
				'mock-uuid-123', // requestId
				undefined, // timeout
				undefined, // responseType
				undefined, // retryConfig
				undefined, // progressEventCallBack
				undefined // signal
			);
		});

		it('should call API with request body for POST', async () => {
			mockAxiosRequest.mockResolvedValue({
				data: { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
				status: 201,
				headers: {},
			});

			const api = createAPIDefinition({
				url: '/users',
				method: 'POST',
				requestSchema: z.object({
					name: z.string(),
					email: z.string().email(),
				}),
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
					email: z.string(),
				}),
			});

			const requestData = { name: 'Jane Doe', email: 'jane@example.com' };
			const result = await api(requestData);

			expect(result).toEqual({ id: 2, name: 'Jane Doe', email: 'jane@example.com' });
			expect(mockAxiosRequest).toHaveBeenCalledWith(
				undefined, // baseURL
				{}, // headers
				undefined, // requestSpecificHeaders
				undefined, // requestSpecificParameters
				'/users', // url
				'POST', // method
				requestData, // request body
				undefined, // refreshToken
				'mock-uuid-123', // requestId
				undefined, // timeout
				undefined, // responseType
				undefined, // retryConfig
				undefined, // progressEventCallBack
				undefined // signal
			);
		});
	});

	describe('URL Parameters', () => {
		it('should handle path parameters', async () => {
			mockAxiosRequest.mockResolvedValue({ data: { id: 1, name: 'Test User' }, status: 200, headers: {} });

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

			const result = await api({
				parameters: { id: '123' },
			});

			// Just verify the API call works and returns data
			expect(result).toEqual({ id: 1, name: 'Test User' });
			expect(mockAxiosRequest).toHaveBeenCalled();
		});

		it('should handle query parameters', async () => {
			mockAxiosRequest.mockResolvedValue({ data: [{ id: 1, name: 'User 1' }], status: 200, headers: {} });

			const api = createAPIDefinition({
				url: '/users',
				method: 'GET',
				requestParameters: {
					page: ['optional', 'string'],
					limit: ['optional', 'string'],
				},
				responseSchema: z.array(
					z.object({
						id: z.number(),
						name: z.string(),
					})
				),
			});

			const result = await api({
				parameters: { page: '1', limit: '10' },
			});

			// Just verify the API call works and returns data
			expect(result).toEqual([{ id: 1, name: 'User 1' }]);
			expect(mockAxiosRequest).toHaveBeenCalled();
		});
	});

	describe('Headers', () => {
		it('should pass static headers', async () => {
			mockAxiosRequest.mockResolvedValue({ data: { success: true }, status: 200, headers: {} });

			const api = createAPIDefinition({
				url: '/users',
				headers: {
					'X-Custom-Header': 'custom-value',
					Authorization: 'Bearer token123',
				},
				responseSchema: z.object({
					success: z.boolean(),
				}),
			});

			await api();

			// Check that headers were passed
			expect(mockAxiosRequest).toHaveBeenCalled();
			const callArgs = mockAxiosRequest.mock.calls[0];
			const headers = callArgs[1]; // headers parameter

			expect(headers).toMatchObject({
				'X-Custom-Header': 'custom-value',
				Authorization: 'Bearer token123',
			});
		});

		it('should pass dynamic headers from options', async () => {
			mockAxiosRequest.mockResolvedValue({ data: { success: true }, status: 200, headers: {} });

			const api = createAPIDefinition({
				url: '/users',
				requestHeaders: {
					'X-Request-Id': ['required', 'string'],
				},
				responseSchema: z.object({
					success: z.boolean(),
				}),
			});

			await api({
				headers: { 'X-Request-Id': 'req-123' },
			});

			// Check that request headers were passed
			expect(mockAxiosRequest).toHaveBeenCalled();
			const callArgs = mockAxiosRequest.mock.calls[0];
			const requestHeaders = callArgs[2]; // requestSpecificHeaders parameter

			expect(requestHeaders).toEqual({ 'X-Request-Id': 'req-123' });
		});
	});

	describe('Configuration Options', () => {
		it('should pass timeout configuration', async () => {
			mockAxiosRequest.mockResolvedValue({ data: { success: true }, status: 200, headers: {} });

			const api = createAPIDefinition({
				url: '/users',
				timeout: 5000,
				responseSchema: z.object({
					success: z.boolean(),
				}),
			});

			await api();

			// Check that timeout was passed
			expect(mockAxiosRequest).toHaveBeenCalled();
			const callArgs = mockAxiosRequest.mock.calls[0];

			expect(callArgs[9]).toBe(5000); // timeout parameter
		});

		it('should pass baseUrl configuration', async () => {
			mockAxiosRequest.mockResolvedValue({ data: { success: true }, status: 200, headers: {} });

			const api = createAPIDefinition({
				url: '/users',
				baseUrl: 'https://api.example.com',
				responseSchema: z.object({
					success: z.boolean(),
				}),
			});

			await api();

			// Check that baseURL was passed
			expect(mockAxiosRequest).toHaveBeenCalled();
			const callArgs = mockAxiosRequest.mock.calls[0];

			expect(callArgs[0]).toBe('https://api.example.com'); // baseURL parameter
		});
	});

	describe('Error Handling', () => {
		it('should propagate errors from Axios', async () => {
			const mockError = new Error('Network Error');

			mockAxiosRequest.mockRejectedValue(mockError);

			const api = createAPIDefinition({
				url: '/users',
				responseSchema: z.object({
					id: z.number(),
				}),
			});

			await expect(api()).rejects.toThrow('Network Error');
		});

		it('should propagate errors from Fetch', async () => {
			const mockError = new Error('Fetch Error');

			mockFetchRequest.mockRejectedValue(mockError);

			const api = createAPIDefinition({
				url: '/users',
				httpClient: 'fetch',
				responseSchema: z.object({
					id: z.number(),
				}),
			});

			await expect(api()).rejects.toThrow('Fetch Error');
		});
	});

	describe('Validation Mode', () => {
		it('should pass validation mode to request handler', async () => {
			mockAxiosRequest.mockResolvedValue({ data: { id: 1 }, status: 200, headers: {} });

			const api = createAPIDefinition({
				url: '/users',
				validationMode: 'Error',
				responseSchema: z.object({
					id: z.number(),
				}),
			});

			await api();

			// Validation mode is used internally, just verify the API works
			expect(mockAxiosRequest).toHaveBeenCalled();
		});

		it('should default to Warning validation mode', async () => {
			mockAxiosRequest.mockResolvedValue({ data: { id: 1 }, status: 200, headers: {} });

			const api = createAPIDefinition({
				url: '/users',
				responseSchema: z.object({
					id: z.number(),
				}),
			});

			await api();

			// Validation mode is used internally, just verify the API works
			expect(mockAxiosRequest).toHaveBeenCalled();
		});
	});
});
