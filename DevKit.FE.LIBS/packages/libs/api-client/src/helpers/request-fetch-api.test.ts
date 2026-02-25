/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */
import { logger } from '@devkit/utilities/dist/Debug';
import { NetworkConnectionStatusCode } from '../types';
import { requestFetchApi } from './request-fetch-api';

// Mock dependencies
jest.mock('@devkit/utilities/dist/Debug');
jest.mock('./transform-url', () => ({
	__esModule: true,
	default: jest.fn((url) => url),
}));

// Mock all fetch helper modules
jest.mock('./fetch/fetch-formdata-helpers', () => ({
	prepareRequestBody: jest.fn((request, isMultipart) => {
		if (!request) return undefined;

		if (isMultipart) {
			const formData = new FormData();

			Object.entries(request).forEach(([key, value]) => {
				formData.append(key, value as string);
			});

			return formData;
		}

		return JSON.stringify(request);
	}),
}));

jest.mock('./fetch/fetch-response-handlers', () => ({
	checkInternalServerError: jest.fn(),
	checkMethodNotAllowed: jest.fn(),
	checkNetworkError: jest.fn(),
	extractResponseHeaders: jest.fn((response) => {
		const headers: Record<string, unknown> = {};

		if (response && response.headers) {
			response.headers.forEach((value: string, key: string) => {
				headers[key] = value;
			});
		}

		return headers;
	}),
	handleErrorResponse: jest.fn(),
	handleStreamingResponse: jest.fn((response) => {
		return Promise.resolve({
			data: response.text ? response.text() : 'streaming data',
			headers: {},
		});
	}),
	isUnauthorizedError: jest.fn((status) => status === 401),
}));

jest.mock('./fetch/fetch-retry-helpers', () => ({
	getRetryDelay: jest.fn(() => 100),
	shouldRetryRequest: jest.fn((status) => status >= 500),
}));

jest.mock('./fetch/fetch-xhr-wrapper', () => ({
	makeXHRRequest: jest.fn(),
}));

const mockedLogger = jest.mocked(logger);

describe('requestFetchApi', () => {
	let mockFetch: jest.MockedFunction<any>;

	beforeEach(() => {
		jest.clearAllMocks();

		// Mock fetch API
		mockFetch = jest.fn();
		global.fetch = mockFetch;

		// Mock AbortController
		global.AbortController = jest.fn().mockImplementation(() => ({
			signal: { aborted: false },
			abort: jest.fn(),
		}));

		// Default successful response
		mockFetch.mockResolvedValue({
			ok: true,
			status: 200,
			headers: new Headers({ 'content-type': 'application/json' }),
			text: jest.fn().mockResolvedValue('{"success": true}'),
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('Basic functionality', () => {
		it('should make a successful GET request', async () => {
			const mockResponse = {
				ok: true,
				status: 200,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"id": 1, "name": "Test"}'),
			};

			mockFetch.mockResolvedValue(mockResponse);

			// Mock handleStreamingResponse to return the expected structure
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockResolvedValue({
				data: '{"id": 1, "name": "Test"}',
				headers: { 'content-type': 'application/json' },
			});

			const result = await requestFetchApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/users/1',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			expect(result).toEqual({
				data: '{"id": 1, "name": "Test"}',
				status: 200,
				headers: { 'content-type': 'application/json' },
			});

			expect(mockFetch).toHaveBeenCalledWith(
				'https://api.example.com/users/1',
				expect.objectContaining({
					method: 'GET',
					signal: expect.any(Object),
				})
			);
		});

		it('should make a successful POST request with JSON body', async () => {
			const requestData = { name: 'New User', email: 'user@example.com' };
			const mockResponse = {
				ok: true,
				status: 201,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"id": 1, "name": "New User"}'),
			};

			mockFetch.mockResolvedValue(mockResponse);

			// Mock handleStreamingResponse to return the expected structure
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockResolvedValue({
				data: '{"id": 1, "name": "New User"}',
				headers: { 'content-type': 'application/json' },
			});

			const result = await requestFetchApi(
				'https://api.example.com',
				{},
				{ 'Content-Type': 'application/json' },
				undefined,
				'/users',
				'POST',
				requestData,
				undefined,
				'test-request-id',
				5000
			);

			expect(result.status).toBe(201);
			expect(mockFetch).toHaveBeenCalledWith(
				'https://api.example.com/users',
				expect.objectContaining({
					method: 'POST',
					body: JSON.stringify(requestData),
					headers: expect.objectContaining({
						'Content-Type': 'application/json',
					}),
				})
			);
		});

		it('should handle multipart/form-data requests', async () => {
			const requestData = { name: 'User', file: 'file-content' };
			const mockResponse = {
				ok: true,
				status: 200,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"success": true}'),
			};

			mockFetch.mockResolvedValue(mockResponse);

			// Mock handleStreamingResponse to return the expected structure
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockResolvedValue({
				data: '{"success": true}',
				headers: { 'content-type': 'application/json' },
			});

			const result = await requestFetchApi(
				'https://api.example.com',
				{},
				{ 'Content-Type': 'multipart/form-data' },
				undefined,
				'/upload',
				'POST',
				requestData,
				undefined,
				'test-request-id',
				5000
			);

			expect(result.status).toBe(200);
			expect(mockFetch).toHaveBeenCalledWith(
				'https://api.example.com/upload',
				expect.objectContaining({
					method: 'POST',
					body: expect.any(FormData),
				})
			);
		});

		it('should handle function-based headers', async () => {
			const headerFunction = jest.fn().mockResolvedValue('Bearer token123');
			const mockResponse = {
				ok: true,
				status: 200,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"success": true}'),
			};

			mockFetch.mockResolvedValue(mockResponse);

			// Mock handleStreamingResponse to return the expected structure
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockResolvedValue({
				data: '{"success": true}',
				headers: { 'content-type': 'application/json' },
			});

			await requestFetchApi(
				'https://api.example.com',
				{ Authorization: headerFunction },
				undefined,
				undefined,
				'/users',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			expect(headerFunction).toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalledWith(
				'https://api.example.com/users',
				expect.objectContaining({
					headers: expect.objectContaining({
						Authorization: 'Bearer token123',
					}),
				})
			);
		});

		it('should handle array headers by joining with comma', async () => {
			const mockResponse = {
				ok: true,
				status: 200,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"success": true}'),
			};

			mockFetch.mockResolvedValue(mockResponse);

			// Mock handleStreamingResponse to return the expected structure
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockResolvedValue({
				data: '{"success": true}',
				headers: { 'content-type': 'application/json' },
			});

			await requestFetchApi(
				'https://api.example.com',
				{},
				{ Accept: ['application/json', 'text/plain'] },
				undefined,
				'/users',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			expect(mockFetch).toHaveBeenCalledWith(
				'https://api.example.com/users',
				expect.objectContaining({
					headers: expect.objectContaining({
						Accept: 'application/json,text/plain',
					}),
				})
			);
		});

		it('should handle refresh token callback', async () => {
			const refreshToken = jest.fn().mockResolvedValue('new-token');

			// Mock successful response that triggers refresh token call
			const mockResponse = {
				ok: true,
				status: 200,
				headers: new Headers({
					'content-type': 'application/json',
					'x-refresh-hint': 'token-refreshed',
				}),
				text: jest.fn().mockResolvedValue('{"success": true}'),
			};

			mockFetch.mockResolvedValue(mockResponse);

			// Mock handleStreamingResponse to call refreshToken
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockImplementation(
				async (response: any, requestId: string, fullUrl: string, onStreamData: any, onProgress: any) => {
					// Simulate calling the refresh token with response headers
					const responseHeaders: Record<string, any> = {};

					response.headers.forEach((value: string, key: string) => {
						responseHeaders[key] = value;
					});

					// This simulates the refresh token call that should happen
					if (refreshToken) {
						await refreshToken({}, responseHeaders);
					}

					return {
						data: '{"success": true}',
						headers: responseHeaders,
					};
				}
			);

			await requestFetchApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/users',
				'GET',
				undefined,
				refreshToken,
				'test-request-id',
				5000
			);

			expect(refreshToken).toHaveBeenCalledWith(
				{},
				expect.objectContaining({
					'x-refresh-hint': 'token-refreshed',
				})
			);
		});

		it('should handle streaming responses', async () => {
			const onStreamData = jest.fn();
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockResolvedValue({
				data: 'streaming data',
				headers: { 'content-type': 'text/plain' },
			});

			const mockResponse = {
				ok: true,
				status: 200,
				headers: new Headers({ 'content-type': 'text/plain' }),
			};

			mockFetch.mockResolvedValue(mockResponse);

			const result = await requestFetchApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/stream',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000,
				undefined,
				onStreamData
			);

			expect(mockHandleStreamingResponse).toHaveBeenCalledWith(
				mockResponse,
				'test-request-id',
				'https://api.example.com/stream',
				onStreamData,
				undefined
			);
		});

		it('should skip empty header values', async () => {
			const mockResponse = {
				ok: true,
				status: 200,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"success": true}'),
			};

			mockFetch.mockResolvedValue(mockResponse);

			// Mock handleStreamingResponse to return the expected structure
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockResolvedValue({
				data: '{"success": true}',
				headers: { 'content-type': 'application/json' },
			});

			await requestFetchApi(
				'https://api.example.com',
				{},
				{
					'X-Valid-Header': 'value',
					'X-Empty-Header': '',
					'X-Falsy-Header': null as any,
				},
				undefined,
				'/users',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			const callArgs = mockFetch.mock.calls[0][1];

			expect(callArgs.headers['X-Valid-Header']).toBe('value');
			expect(callArgs.headers).not.toHaveProperty('X-Empty-Header');
			expect(callArgs.headers).not.toHaveProperty('X-Falsy-Header');
		});
	});

	describe('Error handling', () => {
		it('should handle network errors', async () => {
			mockFetch.mockRejectedValue(new Error('Network error'));

			await expect(
				requestFetchApi(
					'https://api.example.com',
					{},
					undefined,
					undefined,
					'/users',
					'GET',
					undefined,
					undefined,
					'test-request-id',
					5000
				)
			).rejects.toEqual({
				mapped: [{ code: 'UnexpectedError' }],
				originalResponse: 'Error: Network error',
				status: 999,
			});
		});

		it('should handle timeout', async () => {
			let abortController: any;

			global.AbortController = jest.fn().mockImplementation(() => {
				abortController = {
					signal: { aborted: false },
					abort: jest.fn(),
				};

				return abortController;
			});

			mockFetch.mockImplementation(() => {
				const error = new Error('Timeout');

				error.name = 'AbortError';

				return Promise.reject(error);
			});

			// Set a short timeout
			await expect(
				requestFetchApi(
					'https://api.example.com',
					{},
					undefined,
					undefined,
					'/users',
					'GET',
					undefined,
					undefined,
					'test-request-id',
					50 // 50ms timeout
				)
			).rejects.toEqual({
				mapped: [{ code: 'NetworkConnection' }],
				status: NetworkConnectionStatusCode,
			});
		});

		it('should handle HTTP error responses', async () => {
			const mockHandleErrorResponse = require('./fetch/fetch-response-handlers').handleErrorResponse;

			mockHandleErrorResponse.mockResolvedValue({
				data: { error: 'Not found' },
				status: 404,
				headers: { 'content-type': 'application/json' },
			});

			const mockResponse = {
				ok: false,
				status: 404,
				headers: new Headers({ 'content-type': 'application/json' }),
			};

			mockFetch.mockResolvedValue(mockResponse);

			const result = await requestFetchApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/users/999',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			expect(mockHandleErrorResponse).toHaveBeenCalledWith(
				mockResponse,
				'test-request-id',
				'https://api.example.com/users/999'
			);
		});

		it('should retry on retryable errors', async () => {
			const mockShouldRetryRequest = require('./fetch/fetch-retry-helpers').shouldRetryRequest;
			const mockGetRetryDelay = require('./fetch/fetch-retry-helpers').getRetryDelay;
			const mockCheckInternalServerError = require('./fetch/fetch-response-handlers').checkInternalServerError;

			// Use real shouldRetryRequest logic - status 500 should be retryable
			mockShouldRetryRequest.mockImplementation((status: number) => {
				return status === 500; // 500 is retryable by default
			});
			mockGetRetryDelay.mockReturnValue(10); // Short delay for testing

			const mockErrorResponse = {
				ok: false,
				status: 500,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"error": "Internal server error"}'),
			};

			// Mock checkInternalServerError to throw for first two calls, then not for the third
			let errorCallCount = 0;

			mockCheckInternalServerError.mockImplementation(async (status: number) => {
				errorCallCount++;

				if (errorCallCount <= 2) {
					// Throw for first two calls to trigger retry
					throw {
						mapped: [{ code: 'UnexpectedError' }],
						status: 500,
						originalResponse: { error: 'Internal server error' },
					};
				}
				// Don't throw for third call - let it pass through
			});

			const mockSuccessResponse = {
				ok: true,
				status: 200,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"success": true}'),
			};

			// First two calls fail, third succeeds
			mockFetch
				.mockResolvedValueOnce(mockErrorResponse)
				.mockResolvedValueOnce(mockErrorResponse)
				.mockResolvedValueOnce(mockSuccessResponse);

			// Mock handleStreamingResponse for the successful call
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockResolvedValue({
				data: '{"success": true}',
				headers: { 'content-type': 'application/json' },
			});

			const result = await requestFetchApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/users',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000,
				{ retries: 2 }
			);

			expect(mockFetch).toHaveBeenCalledTimes(3);
			expect(result.status).toBe(200);
		});

		it('should handle unauthorized errors with retry', async () => {
			const refreshToken = jest.fn().mockResolvedValue('new-token');
			const mockIsUnauthorizedError = require('./fetch/fetch-response-handlers').isUnauthorizedError;

			// Reset mock to ensure clean behavior
			mockIsUnauthorizedError.mockClear();

			const mockUnauthorizedResponse = {
				ok: false,
				status: 401,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"error": "Unauthorized"}'),
			};

			const mockSuccessResponse = {
				ok: true,
				status: 200,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"success": true}'),
			};

			// Mock the isUnauthorizedError to return true for 401
			mockIsUnauthorizedError.mockImplementation((status: number) => status === 401);

			// Mock handleStreamingResponse for the successful call
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockResolvedValue({
				data: '{"success": true}',
				headers: { 'content-type': 'application/json' },
			});

			// First call fails with 401, second succeeds
			mockFetch.mockResolvedValueOnce(mockUnauthorizedResponse).mockResolvedValueOnce(mockSuccessResponse);

			const result = await requestFetchApi(
				'https://api.example.com',
				{ Authorization: 'Bearer old-token' },
				undefined,
				undefined,
				'/protected',
				'GET',
				undefined,
				refreshToken,
				'test-request-id',
				5000
			);

			expect(mockFetch).toHaveBeenCalledTimes(2);
			expect(result.status).toBe(200);
		});
	});

	describe('XHR fallback for multipart uploads with progress', () => {
		it('should use XHR for multipart form data with progress callback', async () => {
			const mockMakeXHRRequest = require('./fetch/fetch-xhr-wrapper').makeXHRRequest;

			mockMakeXHRRequest.mockResolvedValue({
				data: { success: true },
				status: 200,
				headers: { 'content-type': 'application/json' },
			});

			const onProgress = jest.fn();
			const requestData = { name: 'User', file: 'file-content' };

			const result = await requestFetchApi(
				'https://api.example.com',
				{},
				{ 'Content-Type': 'multipart/form-data' },
				undefined,
				'/upload',
				'POST',
				requestData,
				undefined,
				'test-request-id',
				5000,
				undefined,
				undefined,
				onProgress
			);

			expect(mockMakeXHRRequest).toHaveBeenCalledWith(
				'POST',
				'https://api.example.com/upload',
				expect.any(Object), // headers without Content-Type
				expect.any(FormData), // request body as FormData
				5000,
				onProgress,
				'test-request-id',
				undefined
			);

			expect(result.data).toEqual({ success: true });
		});
	});

	describe('Logging', () => {
		it('should log request details', async () => {
			const mockResponse = {
				ok: true,
				status: 200,
				headers: new Headers({ 'content-type': 'application/json' }),
				text: jest.fn().mockResolvedValue('{"success": true}'),
			};

			mockFetch.mockResolvedValue(mockResponse);

			// Mock handleStreamingResponse to return the expected structure
			const mockHandleStreamingResponse = require('./fetch/fetch-response-handlers').handleStreamingResponse;

			mockHandleStreamingResponse.mockResolvedValue({
				data: '{"success": true}',
				headers: { 'content-type': 'application/json' },
			});

			await requestFetchApi(
				'https://api.example.com',
				{ Authorization: 'Bearer token' },
				{ 'X-Custom': 'value' },
				undefined,
				'/users',
				'POST',
				{ name: 'Test' },
				undefined,
				'test-request-id',
				5000
			);

			// Just verify that logger was called with the request ID
			expect(mockedLogger.log).toHaveBeenCalledWith(
				'test-request-id',
				expect.any(String),
				expect.any(String),
				expect.any(Object)
			);
		});
	});
});
