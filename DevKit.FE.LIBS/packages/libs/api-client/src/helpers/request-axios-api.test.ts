/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, jest/no-identical-title */
import axios, { AxiosError, isAxiosError } from 'axios';
import axiosRetry from 'axios-retry';
import { logger } from '@devkit/utilities/dist/Debug';
import { APIHttpStatusCode, NetworkConnectionStatusCode, NoStatusCode } from '../types';
import { requestAxiosApi } from './request-axios-api';

// Mock dependencies
jest.mock('axios');
jest.mock('axios-retry');
jest.mock('@devkit/utilities/dist/Debug');
jest.mock('./transform-url', () => ({
	__esModule: true,
	default: jest.fn((url) => url),
}));

const mockedAxios = jest.mocked(axios);
const mockedAxiosRetry = jest.mocked(axiosRetry);
const mockedLogger = jest.mocked(logger);
const mockedIsAxiosError = jest.mocked(isAxiosError);

// Mock transform-url
const mockGetUrlWithPathParams = jest.fn();

jest.doMock('./transform-url', () => ({
	__esModule: true,
	default: mockGetUrlWithPathParams,
}));

describe('requestAxiosApi', () => {
	let mockAxiosInstance: any;

	beforeEach(() => {
		jest.clearAllMocks();
		mockGetUrlWithPathParams.mockImplementation((url) => url);

		// Mock axios.create to return a mock instance
		mockAxiosInstance = {
			interceptors: {
				request: { use: jest.fn() },
				response: { use: jest.fn() },
			},
			request: jest.fn(),
		};
		mockedAxios.create.mockReturnValue(mockAxiosInstance);

		// Mock isAxiosError to return true for AxiosError instances
		mockedIsAxiosError.mockImplementation((error) => error instanceof AxiosError);

		// Default successful response
		mockAxiosInstance.request.mockResolvedValue({
			data: { success: true },
			status: 200,
			headers: { 'content-type': 'application/json' },
		});
	});

	describe('Basic functionality', () => {
		it('should handle convertResponseDataToJson with missing content-type', async () => {
			mockAxiosInstance.request.mockResolvedValue({
				data: { success: true },
				status: 200,
				headers: {}, // Missing content-type header
			});

			await requestAxiosApi(
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
			);

			expect(mockedLogger.warn).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][convertResponseDataToJson]',
				'content type header is missing in response'
			);
		});

		it('should handle blob response with json content-type', async () => {
			const jsonData = { message: 'success' };
			const mockBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

			(mockBlob as any).text = jest.fn().mockResolvedValue(JSON.stringify(jsonData));

			mockAxiosInstance.request.mockResolvedValue({
				data: mockBlob,
				status: 200,
				headers: { 'content-type': 'application/json' },
			});

			const result = await requestAxiosApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/api/data',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			expect(result.data).toEqual(jsonData);
		});

		it('should handle blob response without json content-type', async () => {
			const mockBlob = new Blob(['binary data'], { type: 'application/pdf' });

			mockAxiosInstance.request.mockResolvedValue({
				data: mockBlob,
				status: 200,
				headers: { 'content-type': 'application/pdf' },
			});

			const result = await requestAxiosApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/files/document.pdf',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			expect(result.data).toBe(mockBlob);
		});

		it('should handle regular json data', async () => {
			const jsonData = { id: 1, name: 'Test' };

			mockAxiosInstance.request.mockResolvedValue({
				data: jsonData,
				status: 200,
				headers: { 'content-type': 'application/json' },
			});

			const result = await requestAxiosApi(
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

			expect(result.data).toEqual(jsonData);
		});

		it('should configure axios retry when retryConfig is provided', async () => {
			const retryConfig = {
				retries: 3,
				retryDelay: jest.fn().mockReturnValue(1000),
			};

			await requestAxiosApi(
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
				'json',
				retryConfig
			);

			expect(mockedAxiosRetry).toHaveBeenCalledWith(
				mockAxiosInstance,
				expect.objectContaining({
					retries: 3,
				})
			);
		});

		it('should handle progress events with onUploadProgress', async () => {
			const progressCallback = jest.fn();
			const requestData = new FormData();

			requestData.append('file', new Blob(['test']));

			// Capture the onUploadProgress function
			let onUploadProgressFn: any;

			mockAxiosInstance.request.mockImplementation((config: any) => {
				onUploadProgressFn = config.onUploadProgress;

				return Promise.resolve({
					data: { success: true },
					status: 200,
					headers: { 'content-type': 'application/json' },
				});
			});

			await requestAxiosApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/upload',
				'POST',
				requestData,
				undefined,
				'test-request-id',
				5000,
				'json',
				undefined,
				progressCallback
			);

			// Simulate progress event
			if (onUploadProgressFn) {
				onUploadProgressFn({
					loaded: 50,
					total: 100,
					bytes: 50,
				});
			}

			expect(progressCallback).toHaveBeenCalledWith(
				expect.objectContaining({
					loaded: 50,
					total: 100,
					bytes: 50,
					percentage: 50,
				})
			);
		});

		it('should handle progress events without total', async () => {
			const progressCallback = jest.fn();

			let onUploadProgressFn: any;

			mockAxiosInstance.request.mockImplementation((config: any) => {
				onUploadProgressFn = config.onUploadProgress;

				return Promise.resolve({
					data: { success: true },
					status: 200,
					headers: { 'content-type': 'application/json' },
				});
			});

			await requestAxiosApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/upload',
				'POST',
				{},
				undefined,
				'test-request-id',
				5000,
				'json',
				undefined,
				progressCallback
			);

			// Simulate progress event without total
			if (onUploadProgressFn) {
				onUploadProgressFn({
					loaded: 50,
					total: 0, // No total
					bytes: 50,
				});
			}

			expect(progressCallback).toHaveBeenCalledWith(
				expect.objectContaining({
					loaded: 50,
					total: 0,
					bytes: 50,
					percentage: 100, // Should default to 100 when no total
				})
			);
		});
	});

	describe('Error handling', () => {
		it('should handle network connection errors', async () => {
			const axiosError = new AxiosError('Network Error');

			axiosError.response = undefined; // No response means network error
			axiosError.code = 'ECONNABORTED'; // Network error code
			mockAxiosInstance.request.mockRejectedValue(axiosError);

			await expect(
				requestAxiosApi(
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
				mapped: [{ code: 'NetworkConnection' }],
				status: NetworkConnectionStatusCode,
			});

			expect(mockedLogger.error).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][error]',
				'/users',
				'NetworkConnection'
			);
		});

		it('should handle unauthorized errors with refresh token', async () => {
			const refreshToken = jest.fn().mockResolvedValue('new-access-token');

			// First call fails with 401
			const axiosError = new AxiosError('Unauthorized');

			axiosError.response = {
				status: APIHttpStatusCode.Unauthorized,
				data: { error: 'Token expired' },
				headers: { 'x-refresh-hint': 'token-expired' },
			} as any;

			// Second call succeeds
			mockAxiosInstance.request.mockRejectedValueOnce(axiosError).mockResolvedValueOnce({
				data: { success: true },
				status: 200,
				headers: { 'content-type': 'application/json' },
			});

			const result = await requestAxiosApi(
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

			expect(refreshToken).toHaveBeenCalledWith(
				{ Authorization: 'Bearer old-token' },
				{ 'x-refresh-hint': 'token-expired' }
			);

			expect(result.data).toEqual({ success: true });
			expect(mockAxiosInstance.request).toHaveBeenCalledTimes(2);
		});

		it('should throw unauthorized error when refresh token fails', async () => {
			const refreshToken = jest.fn().mockResolvedValue(null); // Refresh fails

			const axiosError = new AxiosError('Unauthorized');

			axiosError.response = {
				status: APIHttpStatusCode.Unauthorized,
				data: { error: 'Token expired' },
				headers: {},
			} as any;

			mockAxiosInstance.request.mockRejectedValue(axiosError);

			await expect(
				requestAxiosApi(
					'https://api.example.com',
					{},
					undefined,
					undefined,
					'/protected',
					'GET',
					undefined,
					refreshToken,
					'test-request-id',
					5000
				)
			).rejects.toEqual({
				mapped: [{ code: 'Unauthorized' }],
				status: APIHttpStatusCode.Unauthorized,
			});
		});

		it('should handle method not allowed errors', async () => {
			const axiosError = new AxiosError('Method Not Allowed');

			axiosError.response = {
				status: APIHttpStatusCode.MethodNotAllowed,
				data: { error: 'Method not allowed' },
				headers: {},
			} as any;

			mockAxiosInstance.request.mockRejectedValue(axiosError);

			await expect(
				requestAxiosApi(
					'https://api.example.com',
					{},
					undefined,
					undefined,
					'/users',
					'DELETE',
					undefined,
					undefined,
					'test-request-id',
					5000
				)
			).rejects.toEqual({
				mapped: [{ code: 'MethodNotAllowed' }],
				status: APIHttpStatusCode.MethodNotAllowed,
			});

			expect(mockedLogger.error).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][error]',
				'/users',
				'MethodNotAllowed'
			);
		});

		it('should handle internal server errors', async () => {
			const axiosError = new AxiosError('Internal Server Error');

			axiosError.response = {
				status: APIHttpStatusCode.InternalServerError,
				data: { error: 'Database connection failed' },
				headers: { 'content-type': 'application/json' },
			} as any;

			mockAxiosInstance.request.mockRejectedValue(axiosError);

			await expect(
				requestAxiosApi(
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
				status: APIHttpStatusCode.InternalServerError,
				originalResponse: { error: 'Database connection failed' },
			});

			expect(mockedLogger.error).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][error]',
				'/users',
				'UnexpectedError'
			);
		});

		it('should handle non-axios errors', async () => {
			const jsError = new Error('JavaScript error');

			mockAxiosInstance.request.mockRejectedValue(jsError);

			await expect(
				requestAxiosApi(
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
				originalResponse: jsError.toString(),
				status: NoStatusCode,
			});
		});

		it('should return error response data for client errors', async () => {
			const axiosError = new AxiosError('Bad Request');

			axiosError.response = {
				status: 400,
				data: { error: 'Invalid input', validation: ['email required'] },
				headers: { 'content-type': 'application/json' },
			} as any;

			mockAxiosInstance.request.mockRejectedValue(axiosError);

			const result = await requestAxiosApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/users',
				'POST',
				{ name: 'Test' },
				undefined,
				'test-request-id',
				5000
			);

			expect(result).toEqual({
				data: { error: 'Invalid input', validation: ['email required'] },
				status: 400,
				headers: { 'content-type': 'application/json' },
			});
		});
	});

	describe('Header handling', () => {
		it('should merge global and request-specific headers', async () => {
			await requestAxiosApi(
				'https://api.example.com',
				{ Authorization: 'Bearer token123' },
				{ 'X-Request-ID': 'req-123' },
				undefined,
				'/users',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			expect(mockAxiosInstance.request).toHaveBeenCalledWith(
				expect.objectContaining({
					headers: expect.objectContaining({
						Authorization: 'Bearer token123',
						'X-Request-ID': 'req-123',
					}),
				})
			);
		});

		it('should handle function-based headers', async () => {
			const headerFunction = jest.fn().mockResolvedValue('Bearer dynamic-token');

			await requestAxiosApi(
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
		});

		it('should handle array headers by joining with comma', async () => {
			await requestAxiosApi(
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

			expect(mockAxiosInstance.request).toHaveBeenCalledWith(
				expect.objectContaining({
					headers: expect.objectContaining({
						Accept: 'application/json,text/plain',
					}),
				})
			);
		});
	});
});

describe('requestAxiosApi', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		// Mock axios.create to return a mock instance
		const mockAxiosInstance = {
			interceptors: {
				request: { use: jest.fn() },
				response: { use: jest.fn() },
			},
			request: jest.fn(),
		};

		mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

		// Mock the instance request method
		mockAxiosInstance.request.mockResolvedValue({
			data: { success: true },
			status: 200,
			headers: { 'content-type': 'application/json' },
		});
	});

	describe('Helper function coverage', () => {
		it('should handle convertResponseDataToJson with missing content-type', async () => {
			const mockAxiosInstance = {
				interceptors: {
					request: { use: jest.fn() },
					response: { use: jest.fn() },
				},
				request: jest.fn().mockResolvedValue({
					data: { success: true },
					status: 200,
					headers: {}, // Missing content-type header
				}),
			};

			mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

			await requestAxiosApi(
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
			);

			expect(mockedLogger.warn).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][convertResponseDataToJson]',
				'content type header is missing in response'
			);
		});

		it('should handle blob response with json content-type', async () => {
			const jsonData = { message: 'success' };
			const mockBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

			(mockBlob as any).text = jest.fn().mockResolvedValue(JSON.stringify(jsonData));

			const mockAxiosInstance = {
				interceptors: {
					request: { use: jest.fn() },
					response: { use: jest.fn() },
				},
				request: jest.fn().mockResolvedValue({
					data: mockBlob,
					status: 200,
					headers: { 'content-type': 'application/json' },
				}),
			};

			mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

			const result = await requestAxiosApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/api/data',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			expect(result.data).toEqual(jsonData);
		});

		it('should handle blob response without json content-type', async () => {
			const mockBlob = new Blob(['binary data'], { type: 'application/pdf' });

			const mockAxiosInstance = {
				interceptors: {
					request: { use: jest.fn() },
					response: { use: jest.fn() },
				},
				request: jest.fn().mockResolvedValue({
					data: mockBlob,
					status: 200,
					headers: { 'content-type': 'application/pdf' },
				}),
			};

			mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

			const result = await requestAxiosApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/files/document.pdf',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			expect(result.data).toBe(mockBlob);
		});

		it('should handle regular json data', async () => {
			const jsonData = { id: 1, name: 'Test' };

			const mockAxiosInstance = {
				interceptors: {
					request: { use: jest.fn() },
					response: { use: jest.fn() },
				},
				request: jest.fn().mockResolvedValue({
					data: jsonData,
					status: 200,
					headers: { 'content-type': 'application/json' },
				}),
			};

			mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

			const result = await requestAxiosApi(
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

			expect(result.data).toEqual(jsonData);
		});

		it('should configure axios retry when retryConfig is provided', async () => {
			const retryConfig = {
				retries: 3,
				retryDelay: jest.fn().mockReturnValue(1000),
			};

			const mockAxiosInstance = {
				interceptors: {
					request: { use: jest.fn() },
					response: { use: jest.fn() },
				},
				request: jest.fn().mockResolvedValue({
					data: { success: true },
					status: 200,
					headers: { 'content-type': 'application/json' },
				}),
			};

			mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

			await requestAxiosApi(
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
				'json',
				retryConfig
			);

			expect(mockedAxiosRetry).toHaveBeenCalledWith(
				mockAxiosInstance,
				expect.objectContaining({
					retries: 3,
				})
			);
		});
	});
});
