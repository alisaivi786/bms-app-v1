/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { logger } from '@devkit/utilities/dist/Debug';
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
const mockedLogger = jest.mocked(logger);
const mockedIsAxiosError = jest.mocked(isAxiosError);

describe('requestAxiosApi', () => {
	let mockAxiosInstance: {
		request: jest.MockedFunction<typeof axios.request>;
	};

	beforeEach(() => {
		jest.clearAllMocks();

		// Mock axios instance
		mockAxiosInstance = {
			request: jest.fn(),
		};

		mockedAxios.create = jest.fn().mockReturnValue(mockAxiosInstance);

		// Mock axios-retry setup
		const axiosRetryMock = jest.requireMock('axios-retry');

		axiosRetryMock.default = jest.fn();

		// Mock isAxiosError to return true for AxiosError instances
		mockedIsAxiosError.mockImplementation((error) => error instanceof AxiosError);
	});

	describe('Successful requests', () => {
		it('should handle successful GET request with JSON response', async () => {
			const mockResponse: AxiosResponse = {
				data: { id: 1, name: 'Test User' },
				status: 200,
				statusText: 'OK',
				headers: { 'content-type': 'application/json' },
				config: {} as AxiosResponse['config'],
			};

			mockAxiosInstance.request.mockResolvedValue(mockResponse);

			const result = await requestAxiosApi(
				'https://api.example.com',
				{},
				{ Authorization: 'Bearer token' },
				undefined,
				'/users/1',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000
			);

			expect(result).toEqual({
				data: { id: 1, name: 'Test User' },
				status: 200,
				headers: { 'content-type': 'application/json' },
			});
		});

		it('should handle successful POST request with request body', async () => {
			const requestData = { name: 'New User', email: 'user@example.com' };
			const mockResponse: AxiosResponse = {
				data: { id: 1, name: 'New User' },
				status: 201,
				statusText: 'Created',
				headers: { 'content-type': 'application/json' },
				config: {} as any,
			};

			mockAxiosInstance.request.mockResolvedValue(mockResponse);

			const result = await requestAxiosApi(
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
			expect(result.data).toEqual({ id: 1, name: 'New User' });
		});

		it('should handle blob response', async () => {
			const mockBlob = new Blob(['{"data": "content"}'], { type: 'application/json' });
			const mockResponse: AxiosResponse = {
				data: mockBlob,
				status: 200,
				statusText: 'OK',
				headers: { 'content-type': 'application/json' },
				config: {} as any,
			};

			// Mock Blob.text() method
			mockBlob.text = jest.fn().mockResolvedValue('{"data": "content"}');

			mockAxiosInstance.request.mockResolvedValue(mockResponse);

			const result = await requestAxiosApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/download',
				'GET',
				undefined,
				undefined,
				'test-request-id',
				5000,
				'blob'
			);

			expect(result.data).toEqual({ data: 'content' });
		});

		it('should handle progress tracking for uploads', async () => {
			const onProgress = jest.fn();

			mockAxiosInstance.request.mockResolvedValue({
				data: { success: true },
				status: 200,
				headers: { 'content-type': 'application/json' },
			});

			await requestAxiosApi(
				'https://api.example.com',
				{},
				undefined,
				undefined,
				'/upload',
				'POST',
				{ file: 'content' },
				undefined,
				'test-request-id',
				5000,
				'json',
				undefined,
				onProgress
			);

			expect(mockAxiosInstance.request).toHaveBeenCalledWith(
				expect.objectContaining({
					onUploadProgress: expect.any(Function),
				})
			);
		});
	});

	describe('Error handling', () => {
		it('should return error response data for client errors', async () => {
			const axiosError = new AxiosError('Bad Request');

			axiosError.response = {
				status: 400,
				data: { error: 'Invalid input', field: 'email' },
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
				{ email: 'invalid-email' },
				undefined,
				'test-request-id',
				5000
			);

			expect(result).toEqual({
				data: { error: 'Invalid input', field: 'email' },
				status: 400,
				headers: { 'content-type': 'application/json' },
			});
		});
	});

	describe('Logging', () => {
		it('should log successful requests', async () => {
			const mockResponse: AxiosResponse = {
				data: { id: 1, name: 'Test' },
				status: 200,
				statusText: 'OK',
				headers: { 'content-type': 'application/json' },
				config: {} as any,
			};

			mockAxiosInstance.request.mockResolvedValue(mockResponse);

			await requestAxiosApi(
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

			expect(mockedLogger.log).toHaveBeenCalledWith('test-request-id', '[devkit][API-Client][success]', '/users/1', {
				res: { id: 1, name: 'Test' },
				status: 200,
			});
		});
	});
});
