/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@devkit/utilities/dist/Debug';
import { APIHttpStatusCode, NetworkConnectionStatusCode } from '../../types';
import {
	checkInternalServerError,
	checkMethodNotAllowed,
	checkNetworkError,
	extractResponseHeaders,
	handleErrorResponse,
	handleStreamingResponse,
	isUnauthorizedError,
} from './fetch-response-handlers';

// Mock dependencies
jest.mock('@devkit/utilities/dist/Debug');

const mockedLogger = jest.mocked(logger);

describe('fetch-response-handlers', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		// Mock TextDecoder for Node.js environment
		global.TextDecoder = jest.fn().mockImplementation(() => ({
			decode: jest.fn((chunk) => {
				if (chunk) {
					return Buffer.from(chunk).toString();
				}

				return '';
			}),
		}));
	});

	describe('handleStreamingResponse', () => {
		it('should handle streaming response with progress tracking', async () => {
			const onStreamData = jest.fn();
			const onProgress = jest.fn();

			// Mock ReadableStream
			const chunks = ['{"part1":', '"data"}'];
			let chunkIndex = 0;

			const mockReader = {
				read: jest.fn().mockImplementation(() => {
					if (chunkIndex < chunks.length) {
						const chunk = chunks[chunkIndex++];

						return Promise.resolve({
							done: false,
							value: new Uint8Array(Buffer.from(chunk)),
						});
					}

					return Promise.resolve({ done: true });
				}),
				releaseLock: jest.fn(),
			};

			const mockResponse = {
				body: {
					getReader: () => mockReader,
				},
				headers: new Map([
					['content-length', '20'],
					['content-type', 'application/json'],
				]),
				status: 200,
			} as any;

			const result = await handleStreamingResponse(
				mockResponse,
				'test-request-id',
				'https://api.example.com/stream',
				onStreamData,
				onProgress
			);

			expect(onStreamData).toHaveBeenCalledTimes(2);
			expect(onStreamData).toHaveBeenNthCalledWith(1, '{"part1":');
			expect(onStreamData).toHaveBeenNthCalledWith(2, '{"part1":"data"}');

			expect(onProgress).toHaveBeenCalledTimes(2);
			expect(onProgress).toHaveBeenCalledWith(
				expect.objectContaining({
					loaded: expect.any(Number),
					total: 20,
					progress: expect.any(Number),
					bytes: expect.any(Number),
					download: true,
					upload: false,
					percentage: expect.any(Number),
				})
			);

			expect(result.data).toBe('{"part1":"data"}');
			expect(result.headers).toEqual({
				'content-length': '20',
				'content-type': 'application/json',
			});

			expect(mockReader.releaseLock).toHaveBeenCalled();
		});

		it('should parse JSON when no streaming callback provided', async () => {
			const mockReader = {
				read: jest
					.fn()
					.mockResolvedValueOnce({
						done: false,
						value: new Uint8Array(Buffer.from('{"success":')),
					})
					.mockResolvedValueOnce({
						done: false,
						value: new Uint8Array(Buffer.from('true}')),
					})
					.mockResolvedValueOnce({ done: true }),
				releaseLock: jest.fn(),
			};

			const mockResponse = {
				body: {
					getReader: () => mockReader,
				},
				headers: new Map([['content-type', 'application/json']]),
				status: 200,
			} as any;

			const result = await handleStreamingResponse(mockResponse, 'test-request-id', 'https://api.example.com/stream');

			expect(result.data).toEqual({ success: true });
		});

		it('should return raw text when JSON parsing fails', async () => {
			const mockReader = {
				read: jest
					.fn()
					.mockResolvedValueOnce({
						done: false,
						value: new Uint8Array(Buffer.from('plain text response')),
					})
					.mockResolvedValueOnce({ done: true }),
				releaseLock: jest.fn(),
			};

			const mockResponse = {
				body: {
					getReader: () => mockReader,
				},
				headers: new Map([['content-type', 'text/plain']]),
				status: 200,
			} as any;

			const result = await handleStreamingResponse(mockResponse, 'test-request-id', 'https://api.example.com/stream');

			expect(result.data).toBe('plain text response');
		});

		it('should handle response without content-length header', async () => {
			const onProgress = jest.fn();

			const mockReader = {
				read: jest
					.fn()
					.mockResolvedValueOnce({
						done: false,
						value: new Uint8Array(Buffer.from('test')),
					})
					.mockResolvedValueOnce({ done: true }),
				releaseLock: jest.fn(),
			};

			const mockResponse = {
				body: {
					getReader: () => mockReader,
				},
				headers: new Map([['content-type', 'text/plain']]),
				status: 200,
			} as any;

			await handleStreamingResponse(
				mockResponse,
				'test-request-id',
				'https://api.example.com/stream',
				undefined,
				onProgress
			);

			// Should not call progress callback when total is 0 (no content-length)
			expect(onProgress).not.toHaveBeenCalled();
		});

		it('should throw error when response body is null', async () => {
			const mockResponse = {
				body: null,
				headers: new Map(),
				status: 200,
			} as any;

			await expect(
				handleStreamingResponse(mockResponse, 'test-request-id', 'https://api.example.com/stream')
			).rejects.toThrow('Response body is null');
		});

		it('should release reader lock even if error occurs', async () => {
			const mockReader = {
				read: jest.fn().mockRejectedValue(new Error('Read error')),
				releaseLock: jest.fn(),
			};

			const mockResponse = {
				body: {
					getReader: () => mockReader,
				},
				headers: new Map(),
				status: 200,
			} as any;

			await expect(
				handleStreamingResponse(mockResponse, 'test-request-id', 'https://api.example.com/stream')
			).rejects.toThrow('Read error');

			expect(mockReader.releaseLock).toHaveBeenCalled();
		});
	});

	describe('handleErrorResponse', () => {
		it('should handle JSON error response', async () => {
			const mockResponse = {
				text: jest.fn().mockResolvedValue('{"error": "Not found", "code": 404}'),
				status: 404,
				headers: new Map([
					['content-type', 'application/json'],
					['x-error-id', 'err123'],
				]),
			} as any;

			const result = await handleErrorResponse(mockResponse, 'test-request-id', 'https://api.example.com/users/999');

			expect(result).toEqual({
				data: { error: 'Not found', code: 404 },
				status: 404,
				headers: {
					'content-type': 'application/json',
					'x-error-id': 'err123',
				},
			});

			expect(mockedLogger.error).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][fetch-error]',
				'https://api.example.com/users/999',
				{
					status: 404,
					error: { error: 'Not found', code: 404 },
				}
			);
		});

		it('should handle plain text error response', async () => {
			const mockResponse = {
				text: jest.fn().mockResolvedValue('Internal Server Error'),
				status: 500,
				headers: new Map([['content-type', 'text/plain']]),
			} as any;

			const result = await handleErrorResponse(mockResponse, 'test-request-id', 'https://api.example.com/error');

			expect(result).toEqual({
				data: 'Internal Server Error',
				status: 500,
				headers: { 'content-type': 'text/plain' },
			});
		});
	});

	describe('checkNetworkError', () => {
		it('should throw network error for NetworkConnectionStatusCode', () => {
			expect(() => {
				checkNetworkError(NetworkConnectionStatusCode, 'test-request-id', 'https://api.example.com/test');
			}).toThrow();

			expect(mockedLogger.error).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][fetch-error]',
				'https://api.example.com/test',
				'NetworkConnection'
			);
		});

		it('should not throw for other status codes', () => {
			expect(() => {
				checkNetworkError(200, 'test-request-id', 'https://api.example.com/test');
			}).not.toThrow();

			expect(() => {
				checkNetworkError(404, 'test-request-id', 'https://api.example.com/test');
			}).not.toThrow();
		});
	});

	describe('isUnauthorizedError', () => {
		it('should return true for 401 status', () => {
			expect(isUnauthorizedError(APIHttpStatusCode.Unauthorized)).toBe(true);
			expect(isUnauthorizedError(401)).toBe(true);
		});

		it('should return false for other status codes', () => {
			expect(isUnauthorizedError(200)).toBe(false);
			expect(isUnauthorizedError(400)).toBe(false);
			expect(isUnauthorizedError(403)).toBe(false);
			expect(isUnauthorizedError(500)).toBe(false);
		});
	});

	describe('checkMethodNotAllowed', () => {
		it('should throw error for 405 status', () => {
			expect(() => {
				checkMethodNotAllowed(APIHttpStatusCode.MethodNotAllowed, 'test-request-id', 'https://api.example.com/test');
			}).toThrow();

			expect(mockedLogger.error).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][fetch-error]',
				'https://api.example.com/test',
				'MethodNotAllowed'
			);
		});

		it('should not throw for other status codes', () => {
			expect(() => {
				checkMethodNotAllowed(200, 'test-request-id', 'https://api.example.com/test');
			}).not.toThrow();

			expect(() => {
				checkMethodNotAllowed(404, 'test-request-id', 'https://api.example.com/test');
			}).not.toThrow();
		});
	});

	describe('checkInternalServerError', () => {
		it('should throw error for 500 status with JSON response', async () => {
			const mockResponse = {
				text: jest.fn().mockResolvedValue('{"error": "Database connection failed"}'),
			} as any;

			await expect(
				checkInternalServerError(
					APIHttpStatusCode.InternalServerError,
					mockResponse,
					'test-request-id',
					'https://api.example.com/test'
				)
			).rejects.toEqual(
				expect.objectContaining({
					mapped: [{ code: 'UnexpectedError' }],
					status: APIHttpStatusCode.InternalServerError,
					originalResponse: { error: 'Database connection failed' },
				})
			);

			expect(mockedLogger.error).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][fetch-error]',
				'https://api.example.com/test',
				'UnexpectedError'
			);
		});

		it('should throw error for 500 status with plain text response', async () => {
			const mockResponse = {
				text: jest.fn().mockResolvedValue('Internal Server Error'),
			} as any;

			await expect(
				checkInternalServerError(500, mockResponse, 'test-request-id', 'https://api.example.com/test')
			).rejects.toEqual(
				expect.objectContaining({
					mapped: [{ code: 'UnexpectedError' }],
					status: 500,
					originalResponse: 'Internal Server Error',
				})
			);
		});

		it('should not throw for other status codes', async () => {
			const mockResponse = {
				text: jest.fn().mockResolvedValue('{"data": "success"}'),
			} as any;

			await expect(
				checkInternalServerError(200, mockResponse, 'test-request-id', 'https://api.example.com/test')
			).resolves.toBeUndefined();

			expect(mockResponse.text).not.toHaveBeenCalled();
		});
	});

	describe('extractResponseHeaders', () => {
		it('should extract headers from Response object', () => {
			const mockResponse = {
				headers: new Map([
					['content-type', 'application/json'],
					['authorization', 'Bearer token123'],
					['x-custom-header', 'custom-value'],
				]),
			} as any;

			const headers = extractResponseHeaders(mockResponse);

			expect(headers).toEqual({
				'content-type': 'application/json',
				authorization: 'Bearer token123',
				'x-custom-header': 'custom-value',
			});
		});

		it('should handle empty headers', () => {
			const mockResponse = {
				headers: new Map(),
			} as any;

			const headers = extractResponseHeaders(mockResponse);

			expect(headers).toEqual({});
		});
	});
});
